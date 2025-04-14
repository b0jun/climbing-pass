'use client';

import { PassType } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { passKeys } from '@/shared/lib/react-query/factory';

import { togglePassStatusFn } from '../fetchFn/togglePassStatusFn';
import { PassWithVisits } from '../types/pass-list.type';

export function useUpdatePass() {
  const queryClient = useQueryClient();
  const { gym } = useParams();
  const searchParams = useSearchParams();
  const passType = (searchParams.get('passType') as PassType) || undefined;
  const passDate = searchParams.get('passDate') || undefined;

  const queryKey = passKeys.list({ gym: gym as string, passDate, passType }).queryKey;
  return useMutation({
    mutationFn: togglePassStatusFn,
    onMutate: async ({ id, status, type, shoesRental }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousPass = queryClient.getQueryData<PassWithVisits[]>(queryKey);
      if (previousPass) {
        const updatedPassList = previousPass.map((pass: PassWithVisits) =>
          pass.id === id
            ? {
                ...pass,
                ...(status && { status }),
                ...(type && { type }),
                ...(shoesRental !== undefined && { shoesRental }),
              }
            : pass,
        );
        queryClient.setQueryData(queryKey, updatedPassList);
      }

      return { previousPass };
    },
    onSuccess: (response, _, context) => {
      if (!response.success) {
        toast.error(response.message || '패스 수정에 실패했습니다.');

        if (context?.previousPass) {
          queryClient.setQueryData(queryKey, context.previousPass);
        }
        return;
      }
      queryClient.invalidateQueries({ queryKey: passKeys.visitorStats() });
      toast.success('패스 정보가 수정되었습니다.');
    },
    onError: (_, __, context) => {
      toast.error('패스 수정에 실패했습니다.');
      if (context?.previousPass) {
        queryClient.setQueryData(queryKey, context.previousPass);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
