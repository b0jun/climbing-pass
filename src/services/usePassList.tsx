import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useSearchParams } from 'next/navigation';

import useIsLogin from '@/hooks/useIsLogin';

const queryFn = async ({ queryKey }: any) => {
	const { gym, passDate, passType } = queryKey[0];
	return await axios(`/api/gym/${gym}/passList`, { params: { passDate, passType } }).then(
		(res) => res.data
	);
};

const usePassList = () => {
	const isLogin = useIsLogin();
	const { gym } = useParams();
	const searchParams = useSearchParams();
	const passType = searchParams.get('passType');
	const passDate = searchParams.get('passDate');

	return useQuery({
		queryKey: [{ scope: 'usePassList', gym, passDate, passType }],
		queryFn,
		enabled: !!isLogin && !!gym,
		placeholderData: keepPreviousData,
	});
};

export default usePassList;
