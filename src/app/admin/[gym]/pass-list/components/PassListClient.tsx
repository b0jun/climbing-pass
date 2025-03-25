'use client';
import { useQueryClient } from '@tanstack/react-query';
import cn from 'classnames';
import dayjs from 'dayjs';
import { CircleCheckBig, Clock4, RotateCw } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useMemo, useRef } from 'react';
import DatePicker from 'react-datepicker';

import { ClimbingShoesIcon, EditIcon, PassDeleteIcon, PassViewIcon } from '@/shared/components/SVG';
import { passKeys } from '@/shared/lib/react-query/factory';
import { updateQueryString } from '@/shared/utils';

import { usePassList } from '../hooks/usePassList';

import 'react-datepicker/dist/react-datepicker.css';
interface PassListClientProps {
  gym: string;
}

export const tableHeaderList = [
  '순번',
  '이름',
  '전화번호',
  '방문횟수',
  '생년월일',
  '입장 등록시간',
  '패스 유형',
  '암벽화 대여',
  '입장 상태',
  '액션',
];

const TYPE_CONFIG = {
  DayPass: { label: '이용', className: 'bg-gray-100 text-gray-800' },
  DayExperience: { label: '체험', className: 'bg-blue-100 text-blue-800' },
} as const;

const STATUS_CONFIG = {
  WAIT: {
    label: '대기',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    icon: <Clock4 size={12} />,
    buttonText: '입장',
    buttonHover: 'hover:bg-green-200',
  },
  APPROVED: {
    label: '승인',
    className: 'bg-green-100 text-green-800 border-green-300',
    icon: <CircleCheckBig size={12} />,
    buttonText: '취소',
    buttonHover: 'hover:bg-gray-200',
  },
} as const;

const PassListClient = ({ gym }: PassListClientProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // * 날짜 선택
  const today = dayjs().format('YYYY/MM/DD');
  const datepickerRef = useRef<DatePicker>(null);

  const passDate = searchParams.get('passDate') || today;

  const setDateToToday = () => {
    const queryString = updateQueryString('passDate', undefined, searchParams);
    router.replace(`${pathname}?${queryString}`);
    datepickerRef.current?.setOpen(false);
  };

  // * 패스유형 선택
  const passType = (searchParams.get('passType') as 'DayPass' | 'DayExperience') || '';

  const handleChangePassType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const queryString = updateQueryString('passType', event.target.value || undefined, searchParams);
    router.replace(`${pathname}?${queryString}`);
  };

  const handleChangeDate = (date: Date | null) => {
    const newDate = date ? dayjs(date).format('YYYY/MM/DD') : undefined;
    const queryString = updateQueryString('passDate', newDate, searchParams);
    router.replace(`${pathname}?${queryString}`);
  };

  const { data } = usePassList(gym);

  const refreshPassList = () => {
    const queryKey = passKeys.lists();
    queryClient.invalidateQueries({ queryKey });
  };

  return (
    <div className="inline-block w-full overflow-hidden rounded-[10px] bg-[#fff] align-middle">
      <div className="flex min-h-[80px] items-center justify-between px-4">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-gray-500 bg-gray-50 p-2 text-[14px] transition-all hover:bg-[#eeeeee] focus:outline-none focus:ring-4 focus:ring-[#e0e0e0]"
          onClick={refreshPassList}
        >
          <RotateCw size={16} />
        </button>
        <div className="flex items-center gap-3">
          <select
            id="passType"
            className="w-[100px] rounded-lg border border-gray-500 bg-gray-50 px-2 py-1 text-[14px] text-gray-900"
            onChange={handleChangePassType}
            value={passType}
          >
            <option value="">패스 유형</option>
            <option value="DayPass">일일이용</option>
            <option value="DayExperience">일일체험</option>
          </select>
          <div className="flex h-[50px] items-center">
            <DatePicker
              ref={datepickerRef}
              popperPlacement="bottom-start"
              selected={new Date(passDate)}
              onChange={handleChangeDate}
              dateFormat="yyyy/MM/dd"
              customInput={
                <input id="passDate" className="w-[100px] rounded-lg border-gray-500 px-2 py-1 text-[14px]" />
              }
            >
              <button type="button" onClick={setDateToToday} className="rounded-sm bg-emerald-500 px-2 py-1 text-white">
                Today
              </button>
            </DatePicker>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full overflow-x-auto text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              {tableHeaderList.map((item, index) => (
                <th key={item} scope="col" className="whitespace-nowrap px-4 py-3 last:text-right">
                  {index === tableHeaderList.length - 1 ? (
                    <span>
                      총 이용자 수: <span className="text-main">{data.length ?? 0}</span>명
                    </span>
                  ) : (
                    item
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-[100px] text-center text-stone-700">
                  등록된 패스가 없습니다.
                </td>
              </tr>
            ) : (
              data.map(
                ({ id, name, phoneNumber, totalVisits, dateOfBirth, type, shoesRental, status, createdAt }, index) => {
                  const isFirstVisit = totalVisits === 1;
                  const visitText = isFirstVisit ? '첫 방문' : `${totalVisits}회`;
                  const typeConfig = TYPE_CONFIG[type];
                  const statusConfig = STATUS_CONFIG[status === 'WAIT' ? 'WAIT' : 'APPROVED'];
                  return (
                    <tr key={id} className="group border-b bg-white last:border-b-0 hover:bg-gray-50">
                      <td className="whitespace-nowrap px-4 py-4">{data.length - index}</td>
                      <td className="truncate px-4 py-4 font-medium text-gray-900">{name}</td>
                      <td className="whitespace-nowrap px-4 py-4">{phoneNumber}</td>
                      <td
                        className={cn('whitespace-nowrap px-4 py-4', {
                          'font-semibold text-amber-600': isFirstVisit,
                        })}
                      >
                        {visitText}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">{dateOfBirth}</td>
                      <td className="whitespace-nowrap px-4 py-4">{dayjs(createdAt).format('h:mm A')}</td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <div
                          className={cn(
                            'flex items-center justify-center gap-1 rounded px-1 py-0.5 text-xs font-medium',
                            typeConfig.className,
                          )}
                        >
                          <span>{typeConfig.label}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <ClimbingShoesIcon shoesRental={shoesRental} />
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <div
                          className={cn(
                            'flex items-center justify-center gap-1 rounded border px-1 py-0.5 text-xs font-medium',
                            statusConfig.className,
                          )}
                        >
                          {statusConfig.icon}
                          <span>{statusConfig.label}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex justify-between">
                          <button
                            type="button"
                            className={cn(
                              'group rounded border border-gray-500 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 transition-all',
                              statusConfig.buttonHover,
                            )}
                            // onClick={() => handleCancelPass(id)}
                          >
                            {statusConfig.buttonText}
                          </button>
                          <div className="invisible ml-4 flex gap-1 group-hover:visible">
                            <button
                              type="button"
                              className="flex items-center rounded-md p-1 hover:bg-gray-200"
                              // onClick={() => handleUpdate({ id, name, shoesRental, type })}
                            >
                              <EditIcon />
                            </button>
                            <Link href="/" className="flex items-center rounded-md p-1 hover:bg-gray-200">
                              <PassViewIcon />
                            </Link>
                            <button
                              type="button"
                              className="flex items-center rounded-md p-1 text-xs font-bold text-red-800 hover:bg-gray-200"
                              // onClick={() => handleDeletePass({ id, name, phoneNumber })}
                            >
                              <PassDeleteIcon />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                },
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PassListClient;
