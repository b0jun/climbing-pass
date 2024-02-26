import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';

import useIsLogin from '@/hooks/useIsLogin';

const queryFn = async ({ queryKey }: any) => {
	const { gym, passDate } = queryKey[0];
	return await axios(`/api/gym/${gym}/passList`, { params: { passDate } }).then(
		(res) => res.data
	);
};

const usePassList = (passDate: string) => {
	const isLogin = useIsLogin();
	const { gym } = useParams();

	return useQuery({
		queryKey: [{ scope: 'usePassList', gym, passDate }],
		queryFn,
		enabled: !!isLogin && !!passDate && !!gym,
	});
};

export default usePassList;
