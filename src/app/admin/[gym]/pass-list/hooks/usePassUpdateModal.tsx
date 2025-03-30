'use client';

import cn from 'classnames';
import { overlay } from 'overlay-kit';
import { useState } from 'react';

import { Modal } from '@/shared/components';

import { PassUpdateTarget } from '../types/pass-list.type';

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
  const [shoesRental, setShoesRental] = useState(item.shoesRental);
  const [passType, setPassType] = useState(item.type);

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
      <div className="flex gap-2 rounded-md border bg-[#f4f7f9] px-2 py-4 text-sm">
        <span className="font-bold text-gray-500">이름</span>
        {item.name}
      </div>
      <div className="my-6 flex flex-col gap-4">
        <PassUpdateModal.RadioGroup
          name="shoesRental"
          title="암벽화 대여여부"
          options={shoesRentalOptions}
          value={shoesRental}
          onChange={setShoesRental}
        />
        <PassUpdateModal.RadioGroup
          name="passType"
          title="패스 유형"
          options={passTypeOptions}
          value={passType}
          onChange={setPassType}
        />
      </div>
    </Modal>
  );
}

interface RadioOption<T> {
  label: string;
  value: T;
}

interface RadioGroupProps<T> {
  name: string;
  title: string;
  options: readonly RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

PassUpdateModal.RadioGroup = function RadioGroup<T>({ name, title, options, value, onChange }: RadioGroupProps<T>) {
  const titleId = `${name}-title`;

  return (
    <div>
      <div id={titleId} className="mb-2 text-sm font-semibold text-gray-600">
        {title}
      </div>
      <div className="flex gap-2" role="radiogroup" aria-labelledby={title ? titleId : undefined}>
        {options.map((option) => (
          <label
            key={option.label}
            className={cn(
              'flex h-10 cursor-pointer items-center justify-center rounded-md border-2 p-2 px-4 font-medium',
              value === option.value
                ? 'border-blue-500 bg-blue-50 text-main'
                : 'border-gray-200 bg-white hover:bg-gray-50',
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value as string}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};
