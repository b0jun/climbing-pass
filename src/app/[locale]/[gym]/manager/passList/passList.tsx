'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useOverlay } from '@toss/use-overlay';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';

import Modal from '@/components/Modal';
import { ClimbingShoesIcon, EditIcon, PassDeleteIcon, PassViewIcon, RefreshIcon } from '@/components/SVG';
import useQueryString from '@/hooks/useQueryString';
import { gymKeys } from '@/lib/react-query/factory';
import useChangePassStatus from '@/services/useChangePassStatus';
import useDeletePass from '@/services/useDeletePass';
import usePassList from '@/services/usePassList';

import PassUpdateFormModal from './PassUpdateFormModal';
import 'react-datepicker/dist/react-datepicker.css';

const tableHeaderList = [
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

const PassList = () => {
  const datepickerRef = useRef<DatePicker>(null);
  const router = useRouter();
  const { gym } = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const overlay = useOverlay();
  const { updateQueryString } = useQueryString();
  const { data, isPending, error } = usePassList();
  const { status } = useSession();

  const { mutate: deletePass } = useDeletePass();
  const { mutate: changePassStatus } = useChangePassStatus();

  if (status === 'unauthenticated') {
    router.replace('/home');
    return null;
  }

  const today = dayjs().format('YYYY/MM/DD');
  const passType = searchParams.get('passType') ?? '';
  const passDate = searchParams.get('passDate') ?? today;

  const handleChangePassType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.replace(`${pathname}?${updateQueryString('passType', event.target.value || undefined)}`);
  };

  const handleChangeDate = (date: Date) => {
    const queryString = updateQueryString('passDate', dayjs(date).format('YYYY/MM/DD'));
    router.replace(`${pathname}?${queryString}`);
  };

  const setDateToToday = () => {
    router.replace(`${pathname}?${updateQueryString('passDate', undefined)}`);
    datepickerRef.current?.setOpen(false);
  };

  const refreshPassList = () => {
    queryClient.invalidateQueries({ queryKey: gymKeys.lists() });
  };

  const handleCancelPass = async (id: string) => {
    const isConfirm = await new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, close, exit }) => (
        <Modal
          title="해당 Pass를 입장 취소하시겠습니까?"
          cancelLabel="아니오"
          open={isOpen}
          onClose={() => {
            close();
            setTimeout(() => {
              resolve(false);
              exit();
            }, 200);
          }}
          onConfirm={() => {
            close();
            setTimeout(() => {
              resolve(true);
              exit();
            }, 200);
          }}
          confirmLabel="입장 취소"
        >
          <p className="text-[14px] text-black/60">
            입장 상태가
            <span className="mx-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">대기</span>
            상태로 변경됩니다.
          </p>
        </Modal>
      ));
    });
    if (isConfirm) {
      changePassStatus({ id, status: 'WAIT' });
    }
  };

  const handleDeletePass = async ({ id, name, phoneNumber }: { id: string; name: string; phoneNumber: string }) => {
    const isConfirm = await new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, close, exit }) => (
        <Modal
          title="해당 Pass를 삭제하시겠습니까?"
          type="warn"
          open={isOpen}
          onClose={() => {
            close();
            setTimeout(() => {
              resolve(false);
              exit();
            }, 200);
          }}
          onConfirm={() => {
            close();
            setTimeout(() => {
              resolve(true);
              exit();
            }, 200);
          }}
          confirmLabel="삭제"
        >
          <div className="flex flex-col gap-2 rounded-md border bg-[#F4F7F9] p-2">
            <p className="flex text-[14px] text-black/60">
              <span className="w-[60px] font-bold text-gray-500">이름</span>
              {name}
            </p>
            <p className="flex text-[14px] text-black/60">
              <span className="w-[60px] font-bold text-gray-500">전화번호</span>
              {phoneNumber}
            </p>
          </div>
        </Modal>
      ));
    });
    if (isConfirm) {
      deletePass({ id });
    }
  };

  const handleUpdate = async ({
    id,
    name,
    shoesRental,
    type,
  }: {
    id: string;
    name: string;
    shoesRental: boolean;
    type: 'DayPass' | 'DayExperience';
  }) => {
    overlay.open(({ isOpen, close, exit }) => (
      <PassUpdateFormModal
        open={isOpen}
        close={close}
        exit={exit}
        id={id}
        name={name}
        shoesRental={shoesRental}
        type={type}
      />
    ));
  };

  // TODO: 로그인 상태 아닐때만 로그인하러 가기 보내기
  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-black/10">
        {(error as any).response.data.errorMessage}
        <button
          type="button"
          onClick={() => router.replace('/home')}
          className="w-[150px] rounded-md bg-blue-300 px-3 py-1"
        >
          로그인 하러가기
        </button>
      </div>
    );
  }

  return (
    <div className="inline-block w-full overflow-hidden rounded-[10px] bg-[#fff] align-middle">
      <div className="flex min-h-[80px] items-center justify-between px-4">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-gray-500 bg-gray-50 p-2 text-[14px] transition-all hover:bg-[#eeeeee] focus:outline-none focus:ring-4 focus:ring-[#e0e0e0]"
          onClick={refreshPassList}
        >
          <RefreshIcon />
        </button>
        <div className="flex items-center gap-3">
          {/* 패스유형 */}
          <select
            id="passType"
            className="w-[100px] rounded-lg border border-gray-500 bg-gray-50 px-2 py-1 text-[14px] text-gray-900"
            onChange={handleChangePassType}
            defaultValue={passType}
          >
            <option value="">패스 유형</option>
            <option value="DayPass">일일이용</option>
            <option value="DayExperience">일일체험</option>
          </select>
          {/* 날짜 */}
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
                      총 이용자 수: <span className="text-main">{data?.passList?.length ?? 0}</span>명
                    </span>
                  ) : (
                    item
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isPending ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="group border-b bg-white last:border-b-0 hover:bg-gray-50">
                  <td className="h-[65px] min-w-[56px] whitespace-nowrap px-4">
                    <div className="h-5 animate-pulse rounded bg-gray-200"></div>
                  </td>
                  <td className="h-[65px] min-w-[72px] px-4">
                    <div className="h-5 animate-pulse rounded bg-gray-200"></div>
                  </td>
                  <td className="h-[65px] min-w-[128px] px-4">
                    <div className="h-5 animate-pulse rounded bg-gray-200"></div>
                  </td>
                  <td className="h-[65px] min-w-[78px] px-4">
                    <div className="h-5 animate-pulse rounded bg-gray-200"></div>
                  </td>
                  <td className="h-[65px] min-w-[113px] px-4">
                    <div className="h-5 animate-pulse rounded bg-gray-200"></div>
                  </td>
                  <td className="h-[65px] min-w-[103px] px-4">
                    <div className="h-5 animate-pulse rounded bg-gray-200"></div>
                  </td>
                  <td className="h-[65px] min-w-[82px] px-4">
                    <div className="h-5 animate-pulse rounded bg-gray-200"></div>
                  </td>
                  <td className="h-[65px] min-w-[93px] px-4">
                    <div className="h-5 animate-pulse rounded bg-gray-200"></div>
                  </td>
                  <td className="h-[65px] min-w-[82px] px-4">
                    <div className="h-5 animate-pulse rounded bg-gray-200"></div>
                  </td>
                </tr>
              ))
            ) : data.passList.length > 0 ? (
              data.passList.map(
                (
                  { id, name, phoneNumber, totalVisits, dateOfBirth, type, shoesRental, status, createdAt }: any,
                  index: number,
                ) => (
                  <tr key={id} className="group border-b bg-white last:border-b-0 hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-4">{data.passList.length - index}</td>
                    <td className="truncate px-4 py-4 font-medium text-gray-900">{name}</td>
                    <td className="whitespace-nowrap px-4 py-4">{phoneNumber}</td>
                    <td
                      className={`whitespace-nowrap px-4 py-4 ${
                        totalVisits === 1 ? 'font-semibold text-amber-600' : ''
                      }`}
                    >
                      {totalVisits === 1 ? '첫 방문' : `${totalVisits}회`}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">{dateOfBirth}</td>
                    <td className="whitespace-nowrap px-4 py-4">{dayjs(createdAt).format('h:mm A')}</td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span
                        className={`rounded px-2.5 py-0.5 text-xs font-medium ${
                          type === 'DayPass' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {type === 'DayPass' ? '이용' : '체험'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <ClimbingShoesIcon shoesRental={shoesRental} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span
                        className={`rounded px-2.5 py-0.5 text-xs font-medium ${
                          status === 'WAIT' ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {status === 'WAIT' ? '대기' : '승인'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex justify-between">
                        {status === 'WAIT' ? (
                          <button
                            type="button"
                            className="group rounded border border-gray-500 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 transition-all hover:bg-green-200"
                            onClick={() => changePassStatus({ id, status: 'APPROVED' })}
                          >
                            입장
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="rounded border border-gray-500 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 transition-all hover:bg-gray-200"
                            onClick={() => handleCancelPass(id)}
                          >
                            취소
                          </button>
                        )}
                        <div className="invisible ml-4 flex gap-1 group-hover:visible">
                          <button
                            type="button"
                            className="flex items-center rounded-md p-1 hover:bg-gray-200"
                            onClick={() => handleUpdate({ id, name, shoesRental, type })}
                          >
                            <EditIcon />
                          </button>
                          <Link
                            href={`/${gym}/info/passDetail?id=${id}`}
                            className="flex items-center rounded-md p-1 hover:bg-gray-200"
                          >
                            <PassViewIcon />
                          </Link>
                          <button
                            type="button"
                            className="flex items-center rounded-md p-1 text-xs font-bold text-red-800 hover:bg-gray-200"
                            onClick={() => handleDeletePass({ id, name, phoneNumber })}
                          >
                            <PassDeleteIcon />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ),
              )
            ) : (
              <tr>
                <td colSpan={10} className="py-[100px] text-center text-stone-700">
                  등록된 패스가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PassList;
