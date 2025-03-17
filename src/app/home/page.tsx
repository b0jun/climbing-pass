import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { Suspense, use } from 'react';

import { auth } from '@/auth';
import { db } from '@/shared/lib/prisma';
import { GymList } from './components';

// 서버 액션: Gym 등록
// async function createGym(formData: FormData) {
//   'use server'; // 서버에서만 실행되도록 지정

//   const session = await auth();
//   if (!session || !session.user?.id) {
//     throw new Error('Unauthorized');
//   }
//   console.log('session@@@@', session);
//   const name = formData.get('name') as string;
//   const domain = formData.get('domain') as string;
//   const name_ko = formData.get('name_ko') as string | undefined;
//   const name_en = formData.get('name_en') as string | undefined;

//   // 필수 필드 검증
//   if (!name || !domain) {
//     throw new Error('Name and domain are required');
//   }

//   // Prisma로 Gym 생성
//   try {
//     await db.gym.create({
//       data: {
//         name,
//         domain,
//         name_ko: name_ko || '', // 기본값 제공
//         name_en: name_en || '', // 기본값 제공
//         userId: session.user.id, // 현재 사용자와 연결
//       },
//     });
//     revalidateTag(`gyms-${session.user.id}`);
//   } catch (error) {
//     console.error('Error creating gym:', error);
//     throw new Error('Failed to create gym');
//   }

//   // 성공 시 리다이렉트 (또는 페이지 리프레시)
//   // redirect('/'); // 등록 후 홈페이지로 리다이렉트
// }

export default function HomePage() {
  const session = use(auth());

  if (!session || !session.user?.id) {
    return redirect('/login');
  }

  return (
    <div>
      {/* <form action={createGym} className="mb-8">
        <div>
          <label htmlFor="name">Gym Name</label>
          <input type="text" id="name" name="name" required className="border p-2" />
        </div>
        <div>
          <label htmlFor="domain">Domain</label>
          <input type="text" id="domain" name="domain" required className="border p-2" />
        </div>
        <div>
          <label htmlFor="name_ko">Name (Korean)</label>
          <input type="text" id="name_ko" name="name_ko" className="border p-2" />
        </div>
        <div>
          <label htmlFor="name_en">Name (English)</label>
          <input type="text" id="name_en" name="name_en" className="border p-2" />
        </div>
        <button type="submit" className="mt-2 bg-blue-500 p-2 text-white">
          Register Gym
        </button>
      </form> */}

      <GymList />
    </div>
  );
}
