'use client';

import cn from 'classnames';
import { CircleX } from 'lucide-react';
import { useRef, useState, useCallback } from 'react';
import SignatureCanvas from 'react-signature-canvas';

import Button from './Button';

interface SignatureProps {
  onConfirm: (value: string) => void;
  signatureText: string;
  signatureButton: string;
}

const Signature = ({ onConfirm, signatureText, signatureButton }: SignatureProps) => {
  const signCanvas = useRef<SignatureCanvas>(null);
  const [isSignEdit, setIsSignEdit] = useState(false);

  const startSign = useCallback(() => {
    setIsSignEdit(true);
  }, []);

  const clearSign = useCallback(() => {
    setIsSignEdit(false);
    signCanvas.current?.clear();
  }, []);

  const submitSign = useCallback(() => {
    const image = signCanvas.current?.getSignaturePad().toDataURL('image/png');
    if (image) {
      onConfirm(image);
    }
  }, [onConfirm]);

  return (
    <>
      <div className="relative h-[200px]">
        <div
          className={cn(
            'absolute z-20 flex h-full w-full items-center justify-center overflow-hidden rounded-md border-2 border-gray-300 bg-slate-100 opacity-90',
          )}
        >
          <SignatureCanvas
            ref={signCanvas}
            canvasProps={{ className: 'sigCanvas' }}
            onEnd={startSign}
            clearOnResize={false}
          />
        </div>
        {isSignEdit && (
          <button
            type="button"
            onClick={clearSign}
            className={cn(
              'absolute right-1 top-1 z-50 flex h-6 w-6 items-center justify-center rounded-sm transition duration-200',
            )}
          >
            <CircleX size={18} className="fill-gray-200/80 text-gray-400/80" />
          </button>
        )}
        <p
          className={cn(
            'absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-black',
          )}
        >
          {signatureText}
        </p>
      </div>
      <Button onClick={submitSign} disabled={!isSignEdit}>
        {signatureButton}
      </Button>
    </>
  );
};

export default Signature;
