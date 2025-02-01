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
  const queryClient = useQueryClient();
  const overlay = useOverlay();
  const { createQueryString, deleteQueryString } = useQueryString();
  const { data, isPending, error } = usePassList();
  const { status } = useSession();

  const { mutate: deletePass } = useDeletePass();
  const { mutate: changePassStatus } = useChangePassStatus();
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/home');
    }
  }, [status, router]);

  const today = dayjs().format('YYYY/MM/DD');
  const searchParams = useSearchParams();
  const passType = searchParams.get('passType');
  const passDate = searchParams.get('passDate') ?? today;

  const handleChangePassType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const passType = event.target.value;
    let queryString;
    if (!passType) {
      queryString = deleteQueryString('passType');
    } else {
      queryString = createQueryString('passType', passType);
    }
    router.replace(`${pathname}?${queryString}`);
  };

  const handleChangeDate = (date: Date) => {
    const queryString = createQueryString('passDate', dayjs(date).format('YYYY/MM/DD'));
    router.replace(`${pathname}?${queryString}`);
  };

  const setDateToToday = () => {
    const queryString = deleteQueryString('passDate');
    router.replace(`${pathname}?${queryString}`);
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
            <span className="bg-gray-100 mx-2 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">대기</span>
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
          <div className="p-2 bg-[#F4F7F9] rounded-md border flex flex-col gap-2">
            <p className="text-[14px] text-black/60 flex">
              <span className="text-gray-500 font-bold w-[60px]">이름</span>
              {name}
            </p>
            <p className="text-[14px] text-black/60 flex">
              <span className="text-gray-500 font-bold w-[60px]">전화번호</span>
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

  // if (isPending) {
  //   return (
  //     <div className="bg-[#fff] rounded-[10px] min-h-[300px] flex flex-1 justify-center items-center">
  //       <Spinner />
  //     </div>
  //   );
  // }

  // TODO: 로그인 상태 아닐때만 로그인하러 가기 보내기
  if (error) {
    return (
      <div className="bg-black/10 flex flex-1 items-center justify-center flex-col gap-4">
        {(error as any).response.data.errorMessage}
        <button
          type="button"
          onClick={() => router.replace('/home')}
          className="bg-blue-300 px-3 py-1 rounded-md w-[150px]"
        >
          로그인 하러가기
        </button>
      </div>
    );
  }

  return (
    <div className="w-full inline-block overflow-hidden align-middle bg-[#fff] rounded-[10px]">
      <div className="min-h-[80px] flex items-center px-4 justify-between">
        <button
          type="button"
          className="bg-gray-50 border text-[14px] border-gray-500 p-2 rounded-lg flex items-center gap-2 transition-all hover:bg-[#eeeeee] focus:outline-none focus:ring-4 focus:ring-[#e0e0e0]"
          onClick={refreshPassList}
        >
          <RefreshIcon />
        </button>
        <div className="flex items-center gap-3">
          {/* 패스유형 */}
          <select
            id="passType"
            className="bg-gray-50 border border-gray-500 text-gray-900 text-[14px] w-[100px] rounded-lg px-2 py-1"
            onChange={handleChangePassType}
            defaultValue={passType ?? ''}
          >
            <option value="">패스 유형</option>
            <option value="DayPass">일일이용</option>
            <option value="DayExperience">일일체험</option>
          </select>
          {/* 날짜 */}
          <div className="h-[50px] flex items-center">
            <DatePicker
              ref={datepickerRef}
              popperPlacement="bottom-start"
              selected={new Date(passDate)}
              onChange={handleChangeDate}
              dateFormat="yyyy/MM/dd"
              customInput={
                <input id="passDate" className="text-[14px] w-[100px] rounded-lg px-2 py-1 border-gray-500" />
              }
            >
              <button type="button" onClick={setDateToToday} className="bg-emerald-500 text-white py-1 px-2 rounded-sm">
                Today
              </button>
            </DatePicker>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full overflow-x-auto text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {tableHeaderList.map((item, index) => (
                <th key={item} scope="col" className="px-4 py-3 whitespace-nowrap last:text-right">
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
                <tr key={index} className="bg-white border-b hover:bg-gray-50 group last:border-b-0">
                  <td className="px-4 h-[65px] w-[56px] whitespace-nowrap">
                    <div className="h-5 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td className="px-4 h-[65px] w-[72px]">
                    <div className="h-5 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td className="px-4 h-[65px] w-[128px]">
                    <div className="h-5 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td className="px-4 h-[65px] w-[78px]">
                    <div className="h-5 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td className="px-4 h-[65px] w-[113px]">
                    <div className="h-5 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td className="px-4 h-[65px] w-[103px]">
                    <div className="h-5 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td className="px-4 h-[65px] w-[82px]">
                    <div className="h-5 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td className="px-4 h-[65px] w-[93px]">
                    <div className="h-5 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td className="px-4 h-[65px] w-[82px]">
                    <div className="h-5 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                </tr>
              ))
            ) : data.passList.length > 0 ? (
              data.passList.map(
                (
                  { id, name, phoneNumber, totalVisits, dateOfBirth, type, shoesRental, status, createdAt }: any,
                  index: number
                ) => (
                  <tr key={id} className="bg-white border-b hover:bg-gray-50 group last:border-b-0">
                    <td className="px-4 py-4 whitespace-nowrap">{data.passList.length - index}</td>
                    <td className="px-4 py-4 font-medium text-gray-900 truncate">{name}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{phoneNumber}</td>
                    <td
                      className={`px-4 py-4 whitespace-nowrap ${
                        totalVisits === 1 ? 'font-semibold text-amber-600' : ''
                      }`}
                    >
                      {totalVisits === 1 ? '첫 방문' : `${totalVisits}회`}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">{dateOfBirth}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{dayjs(createdAt).format('h:mm A')}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded text-xs font-medium ${
                          type === 'DayPass' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {type === 'DayPass' ? '이용' : '체험'}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <ClimbingShoesIcon shoesRental={shoesRental} />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded text-xs font-medium ${
                          status === 'WAIT' ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {status === 'WAIT' ? '대기' : '승인'}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex justify-between">
                        {status === 'WAIT' ? (
                          <button
                            type="button"
                            className="bg-gray-100 text-gray-800 group text-xs font-medium px-2 py-1 rounded border border-gray-500 hover:bg-green-200 transition-all"
                            onClick={() => changePassStatus({ id, status: 'APPROVED' })}
                          >
                            입장
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded border border-gray-500 hover:bg-gray-200 transition-all"
                            onClick={() => handleCancelPass(id)}
                          >
                            취소
                          </button>
                        )}
                        <div className="ml-4 flex gap-1 invisible group-hover:visible">
                          <button
                            type="button"
                            className="flex items-center p-1 rounded-md hover:bg-gray-200"
                            onClick={() => handleUpdate({ id, name, shoesRental, type })}
                          >
                            <EditIcon />
                          </button>
                          <Link
                            href={`/${gym}/info/passDetail?id=${id}`}
                            className="flex items-center p-1 rounded-md hover:bg-gray-200"
                          >
                            <PassViewIcon />
                          </Link>
                          <button
                            type="button"
                            className="text-red-800 text-xs font-bold flex items-center p-1 rounded-md hover:bg-gray-200"
                            onClick={() => handleDeletePass({ id, name, phoneNumber })}
                          >
                            <PassDeleteIcon />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
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
