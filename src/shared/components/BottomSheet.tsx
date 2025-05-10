'use client';

import cn from 'classnames';
import { X } from 'lucide-react';
import React, { useRef, useEffect } from 'react';

import { useLockBodyScroll } from '@/shared/hooks';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onExit?: () => void;
  resolve?: (value: string | boolean) => void; // * for Promise
}

const BottomSheet = ({ isOpen, onClose, title, onExit, resolve, children }: BottomSheetProps) => {
  useLockBodyScroll();
  const prevIsOpenRef = useRef(isOpen);
  const sheetRef = useRef<HTMLDivElement>(null);

  // * isOpen 상태 변경 시 애니메이션 및 unmount 처리
  useEffect(() => {
    if (isOpen !== prevIsOpenRef.current) {
      prevIsOpenRef.current = isOpen;

      if (!isOpen) {
        setTimeout(() => {
          onExit?.();
        }, 200);
      }
    }
  }, [isOpen, onExit]);

  const handleClose = () => {
    onClose?.();
    resolve?.(false);
  };

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-gray-300 transition-opacity duration-200',
          isOpen ? 'pointer-events-auto opacity-60' : 'pointer-events-none opacity-0',
        )}
      />
      <div
        className={cn(
          'fixed inset-0 z-10 mx-auto h-full max-w-xl',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <div className="flex min-h-full items-end justify-center">
          <div
            ref={sheetRef}
            className={cn(
              'relative w-full max-w-3xl rounded-t-3xl bg-white p-4 shadow-xl transition-transform duration-200',
              isOpen ? 'translate-y-0' : 'translate-y-full',
            )}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">{title}</h2>
              <div>
                <button
                  type="button"
                  onClick={handleClose}
                  className={cn(
                    'inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400',
                    'hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden focus:ring-inset',
                  )}
                >
                  <X size={24} color="#0a0a0a" />
                </button>
              </div>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
