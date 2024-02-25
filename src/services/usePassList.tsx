import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';

import useIsLogin from '@/hooks/useIsLogin';

const queryFn = async ({ queryKey }: any) => {
	const { gym } = queryKey[0];
	return await axios(`/api/gym/${gym}/passList`).then((res) => res.data);
};

const usePassList = () => {
	const isLogin = useIsLogin();
	const { gym } = useParams();
	return useQuery({
		queryKey: [{ scope: 'usePassList', gym }],
		queryFn,
		enabled: !!isLogin,
	});
};

export default usePassList;
