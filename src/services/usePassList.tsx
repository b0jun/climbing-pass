import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';

import useIsLogin from '@/hooks/useIsLogin';

const queryFn = async ({ queryKey }: any) => {
	const { gym, passDate, passType } = queryKey[0];
	return await axios(`/api/gym/${gym}/passList`, { params: { passDate, passType } }).then(
		(res) => res.data
	);
};

const usePassList = (passDate: string, passType: 'all' | 'DayPass' | 'DayExperience') => {
	const isLogin = useIsLogin();
	const { gym } = useParams();

	return useQuery({
		queryKey: [{ scope: 'usePassList', gym, passDate, passType }],
		queryFn,
		enabled: !!isLogin && !!passDate && !!gym,
		placeholderData: keepPreviousData,
	});
};

export default usePassList;
