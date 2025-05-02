import { PassValidType } from '../types/passType.type';

import { ConsentClient } from './components';

interface ConsentPageProps {
  params: Promise<{ type: PassValidType; gym: string }>;
}

export default async function ConsentPage({ params }: ConsentPageProps) {
  const { gym, type } = await params;

  return (
    <div className="to-contents relative flex w-full flex-1 flex-col bg-linear-to-b from-blue-100 to-30%">
      <div className="xs:px-10 px-4">
        <ConsentClient gym={gym} type={type} />
      </div>
    </div>
  );
}
