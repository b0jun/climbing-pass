'use client';

import { ArrowLeft, Download } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import { dayjsKST } from '@/shared/lib/dayjs-config';
import en from '@locales/en.json';
import ko from '@locales/ko.json';

import { usePassDetail } from '../hooks/usePassDetail';
import { PassDetailParams } from '../types/pass-detail.type';
import { interpolate } from '../utils/interpolate';

import PdfViewer from './PdfViewer';

interface PassDetailClientProps {
  queryParams: PassDetailParams;
}

function parseConsentText(text: string) {
  return text.split('\n\n').map((item) => {
    const [title, ...content] = item.split('\n');
    return { title, content: content.join('\n') };
  });
}

export function PassDetailClient({ queryParams }: PassDetailClientProps) {
  const router = useRouter();
  const { data } = usePassDetail(queryParams);

  // * pdfUrl 로직
  const hasPdfUrl = !!data.pdfUrl;
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(data.pdfUrl);
      if (!response.ok) throw new Error('PDF 다운로드 실패');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${data.name} 일일 패스 동의서.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF 다운로드 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // * 이전 버전 유지용 추후 signature 삭제 시 해당코드 삭제
  const typeLabel = data.type === 'DayPass' ? '일일이용' : '일일체험';
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const isKo = data.locale === 'ko';
  const i18n = isKo ? ko : en;
  const consent = i18n.Consent;

  const consentDesc = interpolate(consent.consentDesc, {
    gymName: isKo ? data.gymName : data.gymNameEn,
    gymLocation: isKo ? data.gymLocation : data.gymLocationEn,
  });

  const consentItems = parseConsentText(consentDesc);

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
    <>
      <div className="sticky top-14 z-10 mb-6 flex items-center gap-4 bg-[#faf9f6] py-2 tracking-normal">
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
          onClick={hasPdfUrl ? handleDownload : () => handlePrint()}
          disabled={hasPdfUrl ? isLoading : isPrinting}
        >
          <Download size={16} />
          {isPrinting ? '다운로드 중...' : 'PDF 다운로드'}
        </button>
      </div>
      {hasPdfUrl ? (
        <PdfViewer fileUrl={data.pdfUrl} />
      ) : (
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
                {dayjsKST(data.createdAt).format('YYYY년 MM월 DD일, A h:mm')}
              </div>
            </div>
          </section>

          {/* 동의 내용 */}
          <section className="mb-6 flex-1">
            <h2 className="mb-4 border-b-2 border-gray-300 pb-2 font-semibold text-gray-700">이용 약관 및 동의 사항</h2>
            <div className="border-gray-20 border bg-gray-50 p-3">
              <h3 className="mb-2 border-b border-gray-200 pb-2 text-sm font-medium text-gray-600">
                {consent.consent}
              </h3>
              <ul className="space-y-2 text-[13px] leading-relaxed text-gray-600">
                {consentItems.map((item, index) => (
                  <li key={index}>
                    <strong>{item.title}</strong>
                    <p className="ml-3 text-gray-600">{item.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 서명 */}
          <section className="mt-auto">
            <p className="text-center text-sm font-medium text-gray-700">
              본인은 약관에 대해 충분히 읽고 이해하였으며 이에 동의하여 일일 이용권을 신청합니다.
            </p>
            <p className="mt-4 text-center text-sm text-gray-600">
              {dayjsKST(data.createdAt).format('YYYY년 MM월 DD일')}
            </p>
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
                  {data.signature && (
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
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
