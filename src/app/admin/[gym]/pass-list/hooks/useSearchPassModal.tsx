'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Info, LoaderCircle } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { overlay } from 'overlay-kit';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Modal } from '@/shared/components';
import { dayjsKST } from '@/shared/lib/dayjs-config';

import { SearchPassFormData, searchPassSchema } from '../schema/searchPassSchema';
import { SeachPassResult } from '../types/pass-list.type';

import { useSearchPass } from './useSearchPass';

export function useSearchPassModal() {
  const open = () =>
    overlay.open(({ isOpen, close, unmount }) => <SearchPassModal open={isOpen} close={close} unmount={unmount} />);

  return { open, close: overlay.close };
}

interface SearchPassModalProps {
  open: boolean;
  close: () => void;
  unmount: () => void;
}

function SearchPassModal({ open, close, unmount }: SearchPassModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchPassFormData>({
    resolver: zodResolver(searchPassSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
    },
  });

  const router = useRouter();
  const pathname = usePathname();
  const { gym } = useParams();

  const [results, setResults] = useState<SeachPassResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const { mutate, isPending } = useSearchPass();

  const onSubmit = (data: SearchPassFormData) => {
    if (!gym || Array.isArray(gym)) {
      console.error('유효한 Gym 도메인이 필요합니다.');
      return;
    }
    mutate(
      { ...data, gymDomain: gym },
      {
        onSuccess: (response) => {
          if (!response.success) {
            toast.error(response.message || '검색에 실패했습니다.');
            setResults([]);
            setHasSearched(true);
            return;
          }
          setResults(response.passList);
          setHasSearched(true);
        },
        onError: () => {
          toast.error('검색에 실패했습니다.');
          setResults([]);
          setHasSearched(true);
        },
      },
    );
  };

  const handleViewDetails = (id: string) => {
    close();
    router.push(`${pathname}/${id}`);
  };

  return (
    <Modal
      title="패스 검색"
      type="default"
      open={open}
      close={close}
      unmount={unmount}
      confirm={handleSubmit(onSubmit)}
      confirmLabel="검색"
    >
      <form className="grid gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-bold text-gray-500">
              이름
            </label>
            <input
              id="name"
              {...register('name')}
              placeholder="이름을 입력하세요"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-bold text-gray-500">
              휴대폰번호
            </label>
            <input
              id="phoneNumber"
              {...register('phoneNumber')}
              placeholder="휴대폰번호를 입력하세요 ('-' 제외)"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={isPending}
            />
            {errors.phoneNumber && <p className="text-sm text-error">{errors.phoneNumber.message}</p>}
          </div>
        </div>
        {errors.name && <p className="text-sm text-error">{errors.name.message}</p>}
        {isPending ? (
          <div className="flex justify-center rounded-md border bg-[#f4f7f9] p-6">
            <LoaderCircle size={24} className="animate-spin text-gray-500" />
          </div>
        ) : hasSearched ? (
          <div className="block max-h-[50vh] overflow-y-auto rounded-md border bg-[#f4f7f9] scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-300">
            <p className="flex items-center gap-2 border-b bg-white px-4 py-2 text-sm text-gray-500">
              <Info size={18} /> 최근 6개월 이내 데이터만 조회됩니다.
            </p>
            {results.length > 0 ? (
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700">입장등록날짜</th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700">이름</th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700">휴대폰번호</th>
                    <th className="px-4 py-2" />
                  </tr>
                </thead>
                <tbody className="overflow-y-auto bg-white">
                  {results.map((result) => (
                    <tr key={result.id} className="border-t">
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {dayjsKST(result.createdAt).format('YYYY-MM-DD')}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">{result.name}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{result.phoneNumber}</td>
                      <td className="px-4 py-2">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleViewDetails(result.id)}
                            className="rounded-md border border-blue-600 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 disabled:opacity-50"
                            disabled={isPending}
                          >
                            상세로 이동
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-6 text-center text-black/60">검색 결과가 없습니다.</div>
            )}
          </div>
        ) : null}
      </form>
    </Modal>
  );
}
