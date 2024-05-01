import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { gymKeys } from '@/lib/react-query/factory';

const mutationFn = async (body: any) => {
	return await axios.patch('/api/pass/update', { body });
};

const useUpdatePass = () => {
	const queryClient = useQueryClient();
	const { gym } = useParams();
	const searchParams = useSearchParams();
	const passType = searchParams.get('passType');
	const passDate = searchParams.get('passDate');

	return useMutation({
		mutationFn,
		onSuccess: () => {
			toast('Pass를 수정하였습니다.');
			queryClient.invalidateQueries({ queryKey: gymKeys.list(gym as string, passDate, passType) });
		},
	});
};

export default useUpdatePass;
