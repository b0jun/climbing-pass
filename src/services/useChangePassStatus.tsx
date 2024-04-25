import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useSearchParams } from 'next/navigation';

import { gymKeys } from '@/lib/react-query/factory';

const mutationFn = async (body: any) => {
	return await axios.patch('/api/pass/status', { body });
};

const useChangePassStatus = () => {
	const queryClient = useQueryClient();
	const { gym } = useParams();
	const searchParams = useSearchParams();
	const passType = searchParams.get('passType');
	const passDate = searchParams.get('passDate');

	return useMutation({
		mutationFn,
		onMutate: async ({ id, status }) => {
			await queryClient.cancelQueries({ queryKey: gymKeys.list(gym as string, passDate, passType) });
			const previousPass = queryClient.getQueryData<any>(gymKeys.list(gym as string, passDate, passType));
			if (previousPass) {
				queryClient.setQueryData(gymKeys.list(gym as string, passDate, passType), {
					gymName: previousPass.gymName,
					passList: previousPass.passList.map((pass: any) => (pass.id === id ? { ...pass, status } : pass)),
				});
			}

			return { previousPass };
		},
		onError: (_, $, context) => {
			if (context?.previousPass) {
				queryClient.setQueryData(gymKeys.list(gym as string, passDate, passType), context.previousPass);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: gymKeys.list(gym as string, passDate, passType) });
		},
	});
};

export default useChangePassStatus;
