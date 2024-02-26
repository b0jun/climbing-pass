import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useSearchParams } from 'next/navigation';

import useIsLogin from '@/hooks/useIsLogin';

const queryFn = async ({ queryKey }: any) => {
	const { gym, passId } = queryKey[0];
	return await axios(`/api/gym/${gym}/passDetail`, { params: { passId } }).then(
		(res) => res.data
	);
};

const usePassDetail = () => {
	const isLogin = useIsLogin();
	const { gym } = useParams();
	const searchParams = useSearchParams();
	const passId = searchParams.get('id');

	return useQuery({
		queryKey: [{ scope: 'usePassDetail', gym, passId }],
		queryFn,
		enabled: !!isLogin && !!gym && !!passId,
	});
};

export default usePassDetail;
