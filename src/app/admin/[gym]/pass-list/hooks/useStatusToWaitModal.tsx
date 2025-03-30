'use client';

import cn from 'classnames';
import { overlay } from 'overlay-kit';

import { Modal } from '@/shared/components';

import { STATUS_CONFIG } from '../components/PassListClient';
import { PassToggleStatusTarget } from '../types/pass-list.type';

import { useUpdatePass } from './useUpdatePass';

export function useStatusToWaitModal() {
  const open = (item: Omit<PassToggleStatusTarget, 'status'>) =>
    overlay.open(({ isOpen, close, unmount }) => (
      <StatusToWaitModal open={isOpen} close={close} unmount={unmount} item={item} />
    ));

  return { open, close: overlay.close };
}

interface StatusToWaitModal {
  open: boolean;
  close: () => void;
  unmount: () => void;
  item: Omit<PassToggleStatusTarget, 'status'>;
}

function StatusToWaitModal({ open, close, unmount, item }: StatusToWaitModal) {
  const { mutate } = useUpdatePass();

  const onConfirm = () => {
    mutate(
      { id: item.id, status: 'WAIT' },
      {
        onSettled: () => {
          close();
        },
      },
    );
  };

  return (
    <Modal title="Pass 입장을 취소할까요?" type="warn" open={open} confirm={onConfirm} close={close} unmount={unmount}>
      <div className="flex gap-2 rounded-md border bg-[#f4f7f9] px-2 py-4 text-sm">
        <span className="font-bold text-gray-500">이름</span>
        {item.name}
      </div>
      <p className="mt-4 flex gap-2 text-[14px] text-black/60">
        입장 상태가
        <span
          className={cn(
            'flex w-[50px] items-center justify-center gap-1 rounded border px-1 py-0.5 text-xs font-medium',
            STATUS_CONFIG['WAIT'].className,
          )}
        >
          {STATUS_CONFIG['WAIT'].icon}
          <span>{STATUS_CONFIG['WAIT'].label}</span>
        </span>
        상태로 변경됩니다.
      </p>
    </Modal>
  );
}
