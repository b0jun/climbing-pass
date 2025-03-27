'use client';

import cn from 'classnames';
import { overlay } from 'overlay-kit';
import { useState } from 'react';

import { Modal } from '@/shared/components';

import { PassUpdateTarget } from '../types/pass.type';

import { useUpdatePass } from './useUpdatePass';

export function usePassUpdateModal() {
  const open = (item: PassUpdateTarget) =>
    overlay.open(({ isOpen, close, unmount }) => (
      <PassUpdateModal open={isOpen} close={close} unmount={unmount} item={item} />
    ));
  return { open, close: overlay.close };
}

interface PassUpdateModalProps {
  open: boolean;
  close: () => void;
  unmount: () => void;
  item: PassUpdateTarget;
}

const passTypeOptions = [
  { label: '일일이용', value: 'DayPass' },
  { label: '일일체험', value: 'DayExperience' },
] as const;

const shoesRentalOptions = [
  { label: '대여', value: true },
  { label: '대여안함', value: false },
] as const;

function PassUpdateModal({ open, close, unmount, item }: PassUpdateModalProps) {
  const [passType, setPassType] = useState(item.type);
  const [shoesRental, setShoesRental] = useState(item.shoesRental);

  const { mutate } = useUpdatePass();

  const onConfirm = () => {
    mutate(
      { id: item.id, type: passType, shoesRental },
      {
        onSettled: () => {
          close();
        },
      },
    );
  };

  return (
    <Modal title="Pass 정보 수정" open={open} confirm={onConfirm} close={close} unmount={unmount}>
      <div className="inline-flex gap-2 rounded-md border bg-[#f4f7f9] p-2 text-sm">
        <span className="font-bold text-gray-500">이름</span>
        {item.name}
      </div>
      <div className="my-6 flex flex-col gap-4">
        <div>
          <div className="mb-2 text-sm font-semibold text-gray-600">암벽화 대여여부</div>
          <div className="flex gap-2">
            {shoesRentalOptions.map((option) => (
              <button
                key={option.label}
                type="button"
                className={cn(
                  'w-full rounded-lg px-4 py-2 text-sm',
                  shoesRental === option.value
                    ? 'bg-gray-500 text-white'
                    : 'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50',
                )}
                onClick={() => setShoesRental(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div>
            <div className="mb-2 text-sm font-semibold text-gray-600">패스 유형</div>
            <div className="flex gap-2">
              {passTypeOptions.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  className={cn(
                    'w-full rounded-lg px-4 py-2 text-sm',
                    passType === option.value
                      ? 'bg-gray-500 text-white'
                      : 'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50',
                  )}
                  onClick={() => setPassType(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
