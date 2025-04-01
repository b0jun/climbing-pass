'use client';

import cn from 'classnames';
import React, { useEffect, useRef } from 'react';

import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

type ModalType = 'default' | 'warn';

interface ModalProps {
  type?: ModalType;
  open: boolean;
  close: () => void;
  confirm?: () => void;
  unmount: () => void;
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
  open,
  close,
  confirm,
  unmount,
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
          unmount();
        }, 200);
      }
    }
  }, [open, unmount]);

  const handleClose = () => {
    close();
  };

  const handleConfirm = () => {
    confirm?.();
    if (!confirm) {
      close();
    }
  };

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-[10000] bg-gray-300 transition-opacity duration-200',
          open ? 'pointer-events-auto opacity-60' : 'pointer-events-none opacity-0',
        )}
      />
      <div
        className={cn(
          'fixed inset-0 z-[10001] flex items-center justify-center p-4',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <div
          ref={modalRef}
          className={cn(
            'min-w-[320px] max-w-[672px] rounded-xl bg-white p-4 shadow-xl transition-all duration-200',
            open ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">{title}</h2>
          </div>

          {children && children}
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
    </>
  );
};

export default Modal;
