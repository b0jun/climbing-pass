'use client';

import dayjs from 'dayjs';
import { ArrowLeft, Download } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import { usePassDetail } from '../hooks/usePassDetail';

import 'dayjs/locale/ko';
dayjs.locale('ko');

export function PassDetailClient() {
  const router = useRouter();
  const { data } = usePassDetail();
  const typeLabel = data.type === 'DayPass' ? '일일이용' : '일일체험';
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `${data.name} ${typeLabel} 동의서`,
    onBeforePrint: async () => {
      setIsPrinting(true);
    },
    onAfterPrint: () => {
      setIsPrinting(false);
    },
    onPrintError: () => {
      setIsPrinting(false);
    },
  });
  return (
    <div>
      <div className="sticky top-14 z-10 mb-6 flex items-center gap-4 bg-[#faf9f6] py-2">
        <button
          type="button"
          className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-blue-500"
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} />
          패스 목록
        </button>
        <button
          type="button"
          className="flex items-center gap-1 rounded-sm bg-gray-200 px-2 py-1 text-[11px] text-gray-700 shadow-sm transition-colors hover:bg-blue-50 hover:text-blue-500 disabled:bg-gray-300 disabled:text-gray-400"
          onClick={() => handlePrint()}
          disabled={isPrinting}
        >
          <Download size={16} />
          {isPrinting ? '다운로드 중...' : 'PDF 다운로드'}
        </button>
      </div>
      <div
        ref={contentRef}
        className="mx-auto flex min-h-[842px] w-[750px] flex-col rounded-md border border-gray-200 bg-white px-7 py-5 shadow-lg"
      >
        {/* 헤더 */}
        <header className="mb-6 text-center">
          <h1 className="text-[22px] font-bold text-gray-800">
            {data.gymName} {typeLabel} 동의서
          </h1>
        </header>

        {/* 개인 정보 */}
        <section className="mb-6">
          <h2 className="mb-4 border-b-2 border-gray-300 pb-2 font-semibold text-gray-700">개인 정보</h2>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
            <div>
              <span className="font-medium">이름: </span>
              {data.name}
            </div>
            <div>
              <span className="font-medium">패스 유형: </span>
              {typeLabel}
            </div>
            <div>
              <span className="font-medium">휴대폰 번호: </span>
              {data.phoneNumber}
            </div>
            <div>
              <span className="font-medium">생년월일: </span>
              {data.dateOfBirth}
            </div>
            <div className="col-span-2">
              <span className="font-medium">입장 등록시간: </span>
              {dayjs(data.createdAt).format('YYYY년 MM월 DD일, A hh:mm')}
            </div>
          </div>
        </section>

        {/* 동의 내용 */}
        <section className="mb-6 flex-1">
          <h2 className="mb-4 border-b-2 border-gray-300 pb-2 font-semibold text-gray-700">이용 약관 및 동의 사항</h2>
          <div className="border-gray-20 border bg-gray-50 p-3">
            <h3 className="mb-2 border-b border-gray-200 pb-2 text-sm font-medium text-gray-600">
              실내 클라이밍 위험 고지 및 약관
            </h3>
            <ol className="list-inside list-decimal space-y-2 text-sm leading-relaxed text-gray-600">
              <li>
                <strong>위험 고지 및 책임 면제</strong>
                <p className="ml-3 text-gray-600">
                  {data.gymName}(이하 `시설`)의 등반 활동에는 낙상, 장비 사용 중 부상, 타 이용자와의 충돌 등 다양한
                  위험이 존재합니다. 본인은 이러한 위험을 충분히 인지하고 이해하였으며, 본인의 부주의, 타인의 행위, 또는
                  시설의 불가피한 상황으로 인해 발생한 신체적·물질적 손해에 대해 시설 및 그 운영자, 직원에게 법적 책임을
                  묻지 않을 것에 동의합니다.
                </p>
              </li>
              <li>
                <strong>시설 및 장비 사용 규정</strong>
                <p className="ml-3 text-gray-600">
                  본인은 시설 내 장비(예: 하네스, 로프, 클라이밍 홀드 등)를 사용함에 있어 시설의 안내 및 지침을 준수할
                  것이며, 부주의로 인한 장비 파손 또는 시설 손상 시 이에 대한 보상 책임을 질 것에 동의합니다.
                </p>
              </li>
              <li>
                <strong>미성년자 이용 규정</strong>
                <p className="ml-3 text-gray-600">
                  초등 1학년(8세)부터 중등 3학년(16세)까지의 미성년자는 반드시 보호자와 동행해야 하며, 보호자는
                  미성년자의 안전을 책임질 의무가 있습니다. 보호자 동행 없이 미성년자가 이용하여 발생한 사고에 대해
                  시설은 책임을 지지 않습니다.
                </p>
              </li>
              <li>
                <strong>귀중품 관리 및 분실 책임</strong>
                <p className="ml-3 text-gray-600">
                  본인은 시설 내 데스크에 맡기지 않은 귀중품(지갑, 전자기기 등)의 분실, 도난, 파손에 대해 시설에 책임을
                  묻지 않을 것에 동의합니다. 귀중품 보관은 본인의 책임 하에 이루어져야 합니다.
                </p>
              </li>
              <li>
                <strong>개인정보 수집 및 이용 동의</strong>
                <p className="ml-3 text-gray-600">
                  본인은 시설 이용을 위해 제공한 개인정보(이름, 전화번호, 생년월일 등)가 시설의 이용 관리 및 안전 확인
                  목적으로 수집·이용됨에 동의합니다. 수집된 개인정보는 이용 종료 후 1년간 보관되며, 이후 안전하게
                  파기됩니다.
                </p>
              </li>
              <li>
                <strong>동의 철회 및 분쟁 해결</strong>
                <p className="ml-3 text-gray-600">
                  본인은 본 동의서에 대한 동의를 철회할 권리가 있으며, 철회는 시설의 데스크에 문의함으로써 가능합니다.
                  단, 철회 시 이용이 제한될 수 있습니다. 본 동의서와 관련된 분쟁 발생 시, 시설 소재지의 관할 법원에서
                  해결함을 원칙으로 합니다.
                </p>
              </li>
              <li>
                <strong>면책 조항의 지속적 효력</strong>
                <p className="ml-3 text-gray-600">
                  본인은 본 동의서에 명시된 면책 조항이 시설 이용 기간 동안 및 이후에도 지속적으로 유효함에 동의합니다.
                  본 동의서에 따른 면책은 시설의 고의 또는 중대한 과실로 인한 손해를 제외합니다.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* 서명 */}
        <section className="mt-auto">
          <p className="text-center text-sm font-medium text-gray-700">
            본인은 약관에 대해 충분히 읽고 이해하였으며 이에 동의하여 일일 이용권을 신청합니다.
          </p>
          <p className="mt-4 text-center text-sm text-gray-600">{dayjs(data.createdAt).format('YYYY년 MM월 DD일')}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="relative h-[40px] w-[100px]">
              <Image
                key={`${data.gymName}_logo`}
                priority
                loading="eager"
                src={data.gymLogo}
                alt={`${data.gymName}_logo`}
                fill
                className="object-contain"
                sizes="100px"
              />
            </div>
            <div className="flex items-center justify-end gap-4">
              <span className="text-sm font-medium text-gray-700">신청인</span>
              <div className="relative flex items-center gap-8 bg-stone-200 px-2">
                <span className="text-sm text-gray-800">{data.name}</span>
                <p className="text-stone-400/60">(서명)</p>
                <div className="absolute -right-[25px] top-1/2 h-[60px] w-[100px] -translate-y-1/2">
                  <Image
                    key="sign"
                    priority
                    loading="eager"
                    src={data.signature}
                    alt="signature"
                    fill
                    className="object-contain"
                    sizes="100px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
