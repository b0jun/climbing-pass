'use client';

import { Document, Page, pdfjs } from 'react-pdf';

import { Spinner } from '@/shared/components';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

interface Props {
  fileUrl: string;
}

export default function PdfViewer({ fileUrl }: Props) {
  return (
    <div className="flex h-full w-full justify-center">
      <Document
        file={fileUrl}
        className="border border-gray-200 shadow-lg"
        loading={
          <div className="flex min-h-[842px] w-[750px] items-center justify-center bg-[#fdfdfd]">
            <Spinner />
          </div>
        }
      >
        <Page pageNumber={1} width={750} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
    </div>
  );
}
