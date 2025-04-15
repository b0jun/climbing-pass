import { del } from '@vercel/blob';

import { dayjsKST } from '@/shared/lib/dayjs-config';
import { db } from '@/shared/lib/prisma';

const VERCEL_BLOB_DOMAIN = '.public.blob.vercel-storage.com';

async function deleteBlobFile(blobUrl: string, passId?: string, failures?: { passId: string; url: string }[]) {
  if (!blobUrl.includes(VERCEL_BLOB_DOMAIN)) return;
  try {
    await del(blobUrl, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
  } catch (err) {
    console.error(`Blob 삭제 실패: ${blobUrl}`, err);
    if (passId && failures) {
      failures.push({ passId, url: blobUrl });
    }
  }
}

async function deleteDeletedPasses() {
  const oneDayAgo = dayjsKST().subtract(1, 'day');
  const start = oneDayAgo.subtract(1, 'day').startOf('day').toDate();
  const end = oneDayAgo.endOf('day').toDate();

  const deletedPasses = await db.pass.findMany({
    where: {
      status: 'DELETED',
      updatedAt: {
        gte: start,
        lte: end,
      },
    },
    select: {
      id: true,
      signature: true,
      pdfUrl: true,
    },
  });

  const failedBlobDeletions: { passId: string; url: string }[] = [];
  const failedDeletions: string[] = [];

  await Promise.all(
    deletedPasses.map(async (pass) => {
      if (pass.signature?.includes(VERCEL_BLOB_DOMAIN)) {
        await deleteBlobFile(pass.signature, pass.id, failedBlobDeletions);
      }
      if (pass.pdfUrl?.includes(VERCEL_BLOB_DOMAIN)) {
        await deleteBlobFile(pass.pdfUrl, pass.id, failedBlobDeletions);
      }
    }),
  );

  await Promise.all(
    deletedPasses.map(async (pass) => {
      try {
        await db.pass.delete({ where: { id: pass.id } });
      } catch (err) {
        failedDeletions.push(pass.id);
      }
    }),
  );
  if (failedBlobDeletions.length > 0) {
    console.warn('[CRON][FAILURE] Blob 삭제 실패 목록:', failedBlobDeletions);
  }

  if (failedDeletions.length > 0) {
    console.warn('[CRON][FAILURE] Pass 삭제 실패 목록:', failedDeletions);
  }
}

async function anonymizeOldPasses() {
  const oneYearAgo = dayjsKST().subtract(1, 'year');
  const start = oneYearAgo.subtract(2, 'day').startOf('day').toDate();
  const end = oneYearAgo.subtract(1, 'day').endOf('day').toDate();

  const oldPasses = await db.pass.findMany({
    where: {
      status: { in: ['WAIT', 'APPROVED'] },
      createdAt: {
        gte: start,
        lte: end,
      },
      NOT: { status: 'EXPIRED' },
    },
    select: {
      id: true,
      signature: true,
      pdfUrl: true,
    },
  });

  const failedBlobDeletions: { passId: string; url: string }[] = [];
  const failedUpdates: string[] = [];

  await Promise.all(
    oldPasses.map(async (pass) => {
      if (pass.signature?.includes(VERCEL_BLOB_DOMAIN)) {
        await deleteBlobFile(pass.signature, pass.id, failedBlobDeletions);
      }
      if (pass.pdfUrl?.includes(VERCEL_BLOB_DOMAIN)) {
        await deleteBlobFile(pass.pdfUrl, pass.id, failedBlobDeletions);
      }
    }),
  );

  await Promise.all(
    oldPasses.map(async (pass) => {
      try {
        await db.pass.update({
          where: { id: pass.id },
          data: {
            name: '',
            phoneNumber: null,
            dateOfBirth: '',
            signature: null,
            pdfUrl: '',
            status: 'EXPIRED',
          },
        });
      } catch (err) {
        failedUpdates.push(pass.id);
      }
    }),
  );
  if (failedBlobDeletions.length > 0) {
    console.log('[CRON][FAILURE] 익명화 Blob 삭제 실패 목록:', failedBlobDeletions);
  }

  if (failedUpdates.length > 0) {
    console.log('[CRON][FAILURE] 익명화 실패한 패스 목록:', failedUpdates);
  }
}

export async function GET() {
  await deleteDeletedPasses(); // * 하루 이상 지난 DELETED 상태의 Pass와 해당 Blob 파일을 완전히 삭제
  await anonymizeOldPasses(); // * 1년 이상 지난 WAIT 또는 APPROVED 상태의 Pass를 익명화하고 EXPIRED 상태로 변경
  return new Response('Remove Pass Success');
}
