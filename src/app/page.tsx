import { Document } from '@/shared/components';

export default function RootPage() {
  return (
    <Document locale="ko">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-form p-20">
          <p className="text-lg">Welcome</p>
        </div>
      </div>
    </Document>
  );
}
