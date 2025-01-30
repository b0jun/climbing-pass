'use client';

import { PassType } from '@prisma/client';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePDF } from 'react-to-pdf';

import Spinner from '@/components/Spinner';
import usePassDetail from '@/services/usePassDetail';

const PassTypes = {
  DayPass: '일일이용',
  DayExperience: '일일체험',
} as const;

const PassDetailPage = () => {
  const router = useRouter();
  const { data, isPending } = usePassDetail();
  const { toPDF, targetRef } = usePDF({
    filename: `${data?.passDetail?.name}_${PassTypes[data?.passDetail?.type as PassType]} 동의서.pdf`,
  });

  const pdfDownlaod = () => {
    toPDF();
  };

  const goBack = () => {
    router.back();
  };

  if (isPending) {
    return (
      <div className="w-full p-[32px] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isPending && !data) {
    return <div className="w-full p-[32px] text-white">유저 데이터가 없습니다.</div>;
  }

  return (
    <div className="w-full relative py-[32px] px-[32px] h-full">
      <div className="mx-auto rounded-md w-[896px] flex justify-between items-center mb-2 py-2 px-4 bg-form/40">
        <button type="button" onClick={pdfDownlaod}>
          <Image src="/icons/ic_pdf.svg" alt="pdf download" width={40} height={40} />
        </button>
        <button type="button" onClick={goBack}>
          <Image src="/icons/ic_close.svg" alt="close" width={24} height={24} />
        </button>
      </div>
      <div
        ref={targetRef}
        className="mx-auto relative bg-form p-[32px] w-[896px] flex-shrink-0 flex flex-col h-[1267px] justify-between"
      >
        <div>
          <header className="font-bold h-[60px] flex items-center justify-center text-center text-[22px] mb-4">
            <h1>
              {data.gymName} {PassTypes[data.passDetail.type as PassType]} 동의서
            </h1>
          </header>
          <table className="min-w-full divide-y-2 divide-black border-collapse border-2 border-black">
            <thead className="bg-main/20 w-full text-left">
              <tr>
                <th colSpan={4} className="px-4 h-[40px] text-black/70">
                  회원 이용정보
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              <tr>
                <td className="px-6 py-3 whitespace-nowrap bg-main/10">
                  <div className="text-sm font-medium text-gray-900">성명</div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap w-1/2">
                  <div className="text-sm text-gray-900">{data.passDetail.name}</div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap bg-main/10">
                  <div className="text-sm text-gray-900">패스 유형</div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap w-1/2">
                  <div className="text-sm text-gray-900">{PassTypes[data.passDetail.type as PassType]}</div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 whitespace-nowrap bg-main/10">
                  <div className="text-sm font-medium text-gray-900">휴대폰 번호</div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap w-1/2">
                  <div className="text-sm text-gray-900">{data.passDetail.phoneNumber}</div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap bg-main/10">
                  <div className="text-sm text-gray-900">생년월일</div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap w-1/2">
                  <div className="text-sm text-gray-900">{data.passDetail.dateOfBirth}</div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 whitespace-nowrap bg-main/10">
                  <div className="text-sm font-medium text-gray-900">입장 등록시간</div>
                </td>

                <td className="px-6 py-3 whitespace-nowrap" colSpan={3}>
                  <div className="text-sm text-gray-900">{dayjs(data.passDetail.createdAt).format('h:mm A')}</div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-[60px]">
            <div className="border-2 border-black">
              <div className="h-[40px] bg-main/20 flex items-center px-4 border-black border-b-2">
                <h4 className="font-bold text-black/70">실내 클라이밍 위험 고지 및 약관</h4>
              </div>
              <div className="p-4 text-gray-500 whitespace-pre-wrap bg-main/5">
                {`1) 돌멩이 클라이밍 시설과 등반활동 중 사고발생 가능성이 있으며, 이에 따른 상해의 위험이 따릅니다.\n- 위험 정보에 대해 인지하고 이해하고 있으며, 본인의 부주의 및 타인에 의한 상해와 손실에 물질적 손해에 책임을 묻지않을 것에 동의합니다.\n\n2) 돌멩이 클라이밍의 시설과 물품 파손시, 보상을 이행합니다.\n\n3) 초등 1학년(8세)부터 중등 3학년(16세)의 경우 부모님과 동행해야 이용이 가능하며, 부모님이 안전을 책임져야합니다.\n\n4) 데스크에 맡기지 않은 귀중품, 지갑, 전자기기 등의 분실 및 책임은 본인에게 있습니다.\n\n5) 위와 같은 행동으로 발생한 사고에 대해 돌멩이 클라이밍의 대표나 직원에게 법적 책임과 손해배상 책임을 묻지 않을것이며, 이후 돌멩이 클라이밍을 이용하는 동안에도 위의 약속은 유효합니다.`}
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="mt-6 text-center text-[18px] font-medium">
            본인은 약관에 대해 충분히 읽고 이해하였으며 이에 동의하여 일일 이용권을 신청합니다.
          </p>
          <p className="text-center mt-4">{dayjs(data.passDetail.createdAt).format('YYYY년 MM월 DD일')}</p>
          <div className="flex justify-end gap-4 mt-6 mr-[40px]">
            <p>신청인</p>
            <div className="flex justify-between px-2 relative bg-stone-300 min-w-[130px]">
              <p>{data.passDetail.name}</p>
              <p className="text-stone-400/60">(서명)</p>
              <div className="absolute top-1/2 -right-[25px] -translate-y-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.passDetail.signature} alt="sign" style={{ width: 100, height: 60 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassDetailPage;
