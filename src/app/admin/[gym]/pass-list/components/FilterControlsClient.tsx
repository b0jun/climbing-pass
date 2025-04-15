'use client';

import { useQueryClient } from '@tanstack/react-query';
import { RotateCw, Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import DatePicker from 'react-datepicker';

import { SelectBox } from '@/shared/components';
import { dayjsKST } from '@/shared/lib/dayjs-config';
import { passKeys } from '@/shared/lib/react-query/factory';
import { updateQueryString } from '@/shared/utils';

import { useSearchPassModal } from '../hooks/useSearchPassModal';

import 'react-datepicker/dist/react-datepicker.css';

export function FilterControlsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // * 새로고침
  const refreshPassList = () => {
    const queryKey = passKeys.lists();
    queryClient.invalidateQueries({ queryKey });
  };

  // * 패스 검색
  const { open: openSearchPassModal } = useSearchPassModal();

  // * 날짜 선택
  const today = dayjsKST().format('YYYY/MM/DD');
  const datepickerRef = useRef<DatePicker>(null);

  const passDate = searchParams.get('passDate') || today;

  const setDateToToday = () => {
    const queryString = updateQueryString('passDate', undefined, searchParams);
    router.replace(`${pathname}?${queryString}`);
    datepickerRef.current?.setOpen(false);
  };

  const handleChangeDate = (date: Date | null) => {
    const newDate = date ? dayjsKST(date).format('YYYY/MM/DD') : undefined;
    const queryString = updateQueryString('passDate', newDate, searchParams);
    router.replace(`${pathname}?${queryString}`);
  };

  return (
    <div className="flex h-[50px] items-center justify-between gap-2 text-gray-800">
      <div className="flex h-full items-center gap-3">
        <button
          type="button"
          className="flex h-full w-[50px] items-center justify-center rounded-lg bg-white shadow-lg transition-all hover:bg-[#eeeeee] focus:outline-none focus:ring-2 focus:ring-[#e0e0e0]"
          onClick={refreshPassList}
        >
          <RotateCw size={18} />
        </button>
        <button
          onClick={openSearchPassModal}
          type="button"
          className="flex h-full w-[120px] items-center justify-center gap-2 rounded-lg bg-white shadow-lg transition-all hover:bg-[#eeeeee] focus:outline-none focus:ring-2 focus:ring-[#e0e0e0]"
        >
          <Search size={18} />
          <span>패스 검색</span>
        </button>
      </div>
      <div className="flex h-full items-center gap-3">
        <SelectBox
          defaultValue={{ label: '패스유형 선택', value: '' }}
          onChange={({ value }) => {
            const queryString = updateQueryString('passType', value || undefined, searchParams);
            router.replace(`${pathname}?${queryString}`);
          }}
          className="h-full w-[150px]"
        >
          <SelectBox.Trigger />
          <SelectBox.Options>
            <SelectBox.Option label="전체" value="" />
            <SelectBox.Option label="일일이용" value="DayPass" />
            <SelectBox.Option label="일일체험" value="DayExperience" />
          </SelectBox.Options>
        </SelectBox>
        <div className="flex items-center">
          <DatePicker
            ref={datepickerRef}
            popperPlacement="bottom-start"
            selected={new Date(passDate)}
            onChange={handleChangeDate}
            dateFormat="yyyy/MM/dd"
            minDate={dayjsKST().subtract(1, 'year').toDate()}
            maxDate={dayjsKST().toDate()}
            customInput={
              <input
                id="passDate"
                className="h-[50px] w-[110px] rounded-lg border-none bg-white text-gray-800 shadow-lg transition-all hover:bg-[#eeeeee] focus:outline-none focus:ring-2 focus:ring-[#e0e0e0]"
              />
            }
          >
            <div className="flex w-full justify-end border-t pb-1 pt-2">
              <button
                type="button"
                onClick={setDateToToday}
                className="rounded-lg border bg-white px-2 py-1 text-sm text-gray-800 shadow-lg transition-all hover:bg-[#eeeeee]"
              >
                오늘
              </button>
            </div>
          </DatePicker>
        </div>
      </div>
    </div>
  );
}
