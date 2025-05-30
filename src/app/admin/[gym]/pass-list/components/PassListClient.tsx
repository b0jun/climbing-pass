'use client';

import cn from 'classnames';
import { CircleCheckBig, Clock4, FileUser, Info, SquarePen, Trash2 } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

import ShoesIcon from '@/shared/components/SVG/ShoesIcon';
import { dayjsKST } from '@/shared/lib/dayjs-config';

import { usePassUpdateModal, useStatusToDeleteModal, useStatusToWaitModal } from '../hooks';
import { usePassList } from '../hooks/usePassList';
import { useUpdatePass } from '../hooks/useUpdatePass';
import { PassDeleteTarget, PassListParams, PassToggleStatusTarget, PassUpdateTarget } from '../types/pass-list.type';

import { PassIconButton } from './PassIconButton';
import { PassListSkeleton } from './PassListSkeleton';

const TYPE_CONFIG = {
  DayPass: { label: '이용', className: 'bg-gray-100 text-gray-800' },
  DayExperience: { label: '체험', className: 'bg-blue-100 text-blue-800' },
} as const;

export const STATUS_CONFIG = {
  WAIT: {
    label: '대기',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    icon: <Clock4 size={14} />,
    buttonText: '입장',
    buttonHover: 'hover:bg-green-200',
  },
  APPROVED: {
    label: '승인',
    className: 'bg-green-100 text-green-800 border-green-300',
    icon: <CircleCheckBig size={14} />,
    buttonText: '취소',
    buttonHover: 'hover:bg-yellow-100',
  },
} as const;

interface PassListClientProps {
  queryParams: PassListParams;
}

export function PassListClient({ queryParams }: PassListClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { data, error, isPending } = usePassList(queryParams);

  const { mutate: updatePassMutate } = useUpdatePass();
  const { open: openStatusToWaitModal } = useStatusToWaitModal();
  const { open: openStatusToDeleteModal } = useStatusToDeleteModal();
  const { open: openPassUpdateModal } = usePassUpdateModal();

  const handleToggleStatus = ({ id, name, status }: PassToggleStatusTarget) => {
    if (status === 'APPROVED') {
      openStatusToWaitModal({ id, name });
      return;
    }
    updatePassMutate({ id, status: 'APPROVED' });
  };

  const handlePassUpdate = ({ id, name, type, shoesRental }: PassUpdateTarget) => {
    openPassUpdateModal({ id, name, type, shoesRental });
  };

  const handleDeletePass = async ({ id, name }: PassDeleteTarget) => {
    openStatusToDeleteModal({ id, name });
  };

  if (error) {
    return (
      <div className="flex h-[300px] flex-col items-center justify-center text-red-500">
        <p>데이터를 불러오는 중 문제가 발생했습니다.</p>
      </div>
    );
  }

  if (isPending) return <PassListSkeleton />;

  return (
    <div className="inline-block w-full overflow-hidden rounded-[10px] bg-[#fff] align-middle shadow-lg">
      <div className="relative overflow-x-auto">
        <table className="w-full table-fixed text-left text-sm text-gray-500">
          <thead className="border-b bg-gray-50 text-xs text-gray-700">
            <tr>
              <th scope="col" className="w-[50px] px-3 py-3 whitespace-nowrap">
                순번
              </th>
              <th scope="col" className="w-[130px] px-3 py-3 whitespace-nowrap">
                이름
              </th>
              <th scope="col" className="w-[120px] px-3 py-3 whitespace-nowrap">
                전화번호
              </th>
              <th scope="col" className="w-[80px] px-3 py-3 whitespace-nowrap">
                <div className="group relative flex h-[16.5px] items-center gap-[2px]">
                  방문횟수
                  <Info size={12} className="cursor-pointer text-gray-500" />
                  <div className="pointer-events-none absolute top-1/2 left-[50px] z-10 ml-2 w-max -translate-y-1/2 rounded-sm bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    최근 1년 기준의 방문 횟수입니다
                  </div>
                </div>
              </th>
              <th scope="col" className="w-[100px] px-3 py-3 whitespace-nowrap">
                생년월일
              </th>
              <th scope="col" className="w-[90px] px-3 py-3 whitespace-nowrap">
                입장 등록시간
              </th>
              <th scope="col" className="w-[70px] px-3 py-3 whitespace-nowrap">
                패스 유형
              </th>
              <th scope="col" className="w-[70px] px-3 py-3 whitespace-nowrap">
                암벽화 대여
              </th>
              <th scope="col" className="w-[70px] px-3 py-3 whitespace-nowrap">
                입장 상태
              </th>
              <th scope="col" className="w-[200px] px-3 py-3 whitespace-nowrap" />
            </tr>
          </thead>
          <tbody className="[&>tr>td]:h-[50px] [&>tr>td]:px-3 [&>tr>td]:py-2">
            {data?.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center text-stone-700">
                  등록된 패스가 없습니다.
                </td>
              </tr>
            ) : (
              data?.map(
                ({ id, name, phoneNumber, totalVisits, dateOfBirth, type, shoesRental, status, createdAt }, index) => {
                  const isFirstVisit = totalVisits === 1;
                  const visitText = isFirstVisit ? '첫 방문' : `${totalVisits}회`;
                  const typeConfig = TYPE_CONFIG[type];
                  const statusConfig = STATUS_CONFIG[status === 'WAIT' ? 'WAIT' : 'APPROVED'];
                  return (
                    <tr key={id} className="group border-b bg-white last:border-b-0 hover:bg-gray-50">
                      <td className="truncate">{data.length - index}</td>
                      <td className="truncate font-medium tracking-tighter text-gray-900" title={name}>
                        {name}
                      </td>
                      <td className="truncate tracking-tight">{phoneNumber}</td>
                      <td
                        className={cn('truncate', {
                          'font-semibold text-amber-600': isFirstVisit,
                        })}
                      >
                        {visitText}
                      </td>
                      <td className="truncate">{dateOfBirth}</td>
                      <td className="truncate">{dayjsKST(createdAt).format('A h:mm')}</td>
                      <td>
                        <div
                          className={cn(
                            'flex w-[50px] items-center justify-center gap-1 rounded-sm px-1 py-0.5 text-xs font-medium',
                            typeConfig.className,
                          )}
                        >
                          <span>{typeConfig.label}</span>
                        </div>
                      </td>
                      <td>
                        <ShoesIcon className={cn('h-8 w-8', shoesRental ? 'text-blue-500' : 'text-gray-300')} />
                      </td>
                      <td>
                        <div
                          className={cn(
                            'flex w-[55px] items-center justify-center gap-1 rounded-sm border px-1 py-0.5 text-xs font-medium',
                            statusConfig.className,
                          )}
                        >
                          {statusConfig.icon}
                          <span>{statusConfig.label}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-between">
                          <button
                            type="button"
                            className={cn(
                              'group rounded-sm border border-gray-500 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 transition-all',
                              statusConfig.buttonHover,
                            )}
                            onClick={() => handleToggleStatus({ id, status, name })}
                          >
                            {statusConfig.buttonText}
                          </button>
                          <div className="invisible ml-4 flex items-center gap-1 group-hover:visible">
                            <PassIconButton
                              icon={<SquarePen size={17} />}
                              onClick={() => {
                                handlePassUpdate({ id, type, shoesRental, name });
                              }}
                            />
                            <PassIconButton
                              icon={<FileUser size={18} />}
                              onClick={() => {
                                router.push(`${pathname}/${id}`);
                              }}
                            />
                            <PassIconButton
                              icon={<Trash2 size={18} color="#f43f5e" />}
                              onClick={() => {
                                handleDeletePass({ id, name });
                              }}
                            />
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
}
