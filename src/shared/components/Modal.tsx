'use client';

import cn from 'classnames';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

type ModalType = 'default' | 'warn';

interface ModalProps {
  type?: ModalType;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  onExit?: () => void;
  resolve?: (value: boolean) => void;
  cancelLabel?: string;
  confirmLabel?: string;
  title: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const confirmConfig: Record<ModalType, any> = {
  default: {
    bgColor: 'bg-main/90',
    hoverBgColor: 'hover:bg-main',
    textColor: 'text-white',
    focusRingColor: 'focus:ring-main/30',
  },
  warn: {
    bgColor: 'bg-error/90',
    hoverBgColor: 'hover:bg-error',
    textColor: 'text-white',
    focusRingColor: 'focus:ring-red-300',
  },
};

const Modal = ({
  type = 'default',
  isOpen,
  onClose,
  onConfirm,
  onExit,
  resolve,
  cancelLabel,
  confirmLabel,
  title,
  children,
  disabled = false,
}: ModalProps) => {
  useLockBodyScroll();

  const prevOpenRef = useRef(open);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open !== prevOpenRef.current) {
      prevOpenRef.current = open;

      if (!open) {
        setTimeout(() => {
          onExit?.();
        }, 200);
      }
    }
  }, [open, onExit]);

  const handleClose = () => {
    onClose?.();
    resolve?.(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
    resolve?.(true);
    if (!onConfirm && onClose) {
      onClose();
    }
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
          'fixed inset-0 z-10 mx-auto h-full max-w-md',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <div className="flex min-h-full items-center justify-center">
          <div
            ref={modalRef}
            className={cn(
              'relative w-full max-w-3xl rounded-xl bg-white p-4 shadow-xl transition-all duration-200',
              isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
            )}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">{title}</h2>
              <button
                type="button"
                onClick={handleClose}
                className={cn(
                  'inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400',
                  'hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500',
                )}
              >
                <Image src="/icons/ic_close.svg" alt="close" width={24} height={24} />
              </button>
            </div>

            {children && <div>{children}</div>}

            <div className="mt-4 flex gap-2">
              <button
                onClick={handleClose}
                type="button"
                className="w-full rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100"
              >
                {cancelLabel ?? '취소'}
              </button>
              <button
                onClick={handleConfirm}
                type="button"
                disabled={disabled}
                className={cn(
                  'w-full rounded-lg px-5 py-2.5 text-sm font-medium focus:outline-none focus:ring-4 disabled:bg-gray-300',
                  confirmConfig[type].bgColor,
                  confirmConfig[type].textColor,
                  confirmConfig[type].hoverBgColor,
                  confirmConfig[type].focusRingColor,
                )}
              >
                {confirmLabel ?? '확인'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
