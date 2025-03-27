'use client';

import { CircleAlert } from 'lucide-react';
import { overlay } from 'overlay-kit';

import { Modal } from '@/shared/components';

import { PassToggleStatusTarget } from '../types/pass.type';

import { useUpdatePass } from './useUpdatePass';

export function useStatusToDeleteModal() {
  const open = (item: Omit<PassToggleStatusTarget, 'status'>) =>
    overlay.open(({ isOpen, close, unmount }) => (
      <StatusToDeleteModal open={isOpen} close={close} unmount={unmount} item={item} />
    ));

  return { open, close: overlay.close };
}

interface StatusToWaitModal {
  open: boolean;
  close: () => void;
  unmount: () => void;
  item: Omit<PassToggleStatusTarget, 'status'>;
}

function StatusToDeleteModal({ open, close, unmount, item }: StatusToWaitModal) {
  const { mutate } = useUpdatePass();

  const onConfirm = () => {
    mutate(
      { id: item.id, status: 'DELETED' },
      {
        onSettled: () => {
          close();
        },
      },
    );
  };

  return (
    <Modal title="Pass를 정말 삭제할까요?" type="warn" open={open} confirm={onConfirm} close={close} unmount={unmount}>
      <div className="inline-flex gap-2 rounded-md border bg-[#f4f7f9] p-2 text-sm">
        <span className="font-bold text-gray-500">이름</span>
        {item.name}
      </div>
      <p className="mt-4 flex h-5 items-center gap-1 text-[14px] text-black/60">
        <CircleAlert size={18} color="#BE3144" />
        한번 삭제하면 되돌릴 수 없어요.
      </p>
    </Modal>
  );
}
