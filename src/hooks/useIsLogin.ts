import { useSession } from 'next-auth/react';

const useIsLogin = () => {
	const { status } = useSession();
	const isLogin = status === 'authenticated';
	return isLogin;
};

export default useIsLogin;
