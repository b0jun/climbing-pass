'use client';

import { FileText, Shield, Smartphone } from 'lucide-react';

export default function HomeClient() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="relative w-full bg-gradient-to-b from-blue-50 to-white py-20 md:py-28">
        <div className="mx-auto max-w-screen-md space-y-4 px-4 text-center md:px-6">
          <h1 className="text-5xl font-bold tracking-tighter">클라이밍 전자 동의서</h1>
          <p className="text-gray-500 lg:text-base/relaxed">
            종이 없이 간편하게, 안전하게 클라이밍 활동 동의서를 관리하세요. 환경도 보호하고 관리는 더 쉽게!
          </p>
        </div>
      </section>
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-screen-md px-4 text-center md:px-6">
          <div className="mb-10 space-y-2">
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">주요 특징</div>
            <h2 className="text-4xl font-bold tracking-tighter">왜 전자 동의서인가요?</h2>
            <p className="text-base/relaxed text-gray-500">
              종이 동의서의 불편함을 해소하고 더 효율적인 관리 시스템을 제공합니다.
            </p>
          </div>

          <div className="mx-auto grid max-w-screen-md gap-6 py-6 md:grid-cols-3">
            <FeatureCard
              icon={<Smartphone className="h-6 w-6 text-blue-700" />}
              title="간편한 접근성"
              desc="스마트폰으로 언제 어디서나 동의서를 작성하고 제출할 수 있습니다."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-blue-700" />}
              title="안전한 데이터 관리"
              desc="모든 정보는 암호화되어 안전하게 저장되며, 권한이 있는 사람만 접근할 수 있습니다."
            />
            <FeatureCard
              icon={<FileText className="h-6 w-6 text-blue-700" />}
              title="효율적인 관리"
              desc="종이 서류 없이 모든 동의서를 디지털로 관리하여 검색과 보관이 용이합니다."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 text-center shadow-sm">
      <div className="rounded-full bg-blue-100 p-3">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-500">{desc}</p>
    </div>
  );
}
