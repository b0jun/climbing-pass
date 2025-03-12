'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const BackButton = ({ hasBack }: { hasBack: boolean }) => {
  const { back } = useRouter();

  return (
    <div>
      {hasBack ? (
        <div className="flex items-center">
          <button type="button" onClick={back} className="flex items-center justify-center">
            <Image src="/icons/ic_arrow_back.svg" alt="back" width={24} height={24} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default BackButton;
