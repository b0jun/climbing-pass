'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

import Button from '../Button';

type Props = {
  onConfirm: (value: any) => void;
};

const Signature = ({ onConfirm }: Props) => {
  const t = useTranslations('Consent');
  const signCanvas = useRef(undefined) as React.MutableRefObject<any>;
  const [isSignEdit, setIsSignEdit] = useState(false);

  const startSign = () => {
    setIsSignEdit(true);
  };

  const clearSign = () => {
    setIsSignEdit(false);
    signCanvas.current.clear();
  };

  const submitSign = () => {
    const image = signCanvas.current.getSignaturePad().toDataURL('image/png');
    onConfirm(image);
  };

  return (
    <div>
      <div className="relative h-[200px]">
        <div className="absolute z-20 flex h-full w-full items-center justify-center overflow-hidden rounded-md border-2 border-gray-300 bg-slate-100 opacity-90">
          <SignatureCanvas
            ref={signCanvas}
            canvasProps={{
              className: 'sigCanvas',
            }}
            onEnd={startSign}
            clearOnResize={false}
          />
        </div>
        {isSignEdit && (
          <button
            type="button"
            onClick={clearSign}
            className="duration-2000 absolute right-1 top-1 z-50 flex h-6 w-6 items-center justify-center rounded-sm transition"
          >
            <Image src="/icons/ic_delete.svg" width={24} height={24} alt="eraser" />
          </button>
        )}
        <p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-black">
          {t('signature')}
        </p>
      </div>
      <Button label={t('signatureTitle')} onClick={submitSign} disabled={!isSignEdit} />
    </div>
  );
};

export default Signature;
