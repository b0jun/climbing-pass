import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import useIsLogin from '@/hooks/useIsLogin';

const queryFn = async () => {
	return await axios('/api/user/myGymList').then((res) => res.data);
};

const useMyGymList = () => {
	const isLogin = useIsLogin();
	return useQuery({
		queryKey: [{ scope: 'useMyGymList' }],
		queryFn,
		enabled: !!isLogin,
	});
};

export default useMyGymList;
