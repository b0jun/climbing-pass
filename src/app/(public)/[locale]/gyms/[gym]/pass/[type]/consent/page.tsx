import { PassValidType } from '../types/passType.type';

import { ConsentClient } from './components';

interface ConsentPageProps {
  params: Promise<{ type: PassValidType; gym: string }>;
}

export default async function ConsentPage({ params }: ConsentPageProps) {
  const { gym, type } = await params;

  return (
    <div className="relative flex w-full flex-1 flex-col bg-gradient-to-b from-blue-100 to-contents to-30%">
      <div className="px-4 xs:px-10">
        <ConsentClient gym={gym} type={type} />
      </div>
    </div>
  );
}
