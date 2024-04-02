'use client';
import { useQueryClient } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

import useIsLogin from '@/hooks/useIsLogin';

const Header = () => {
	const queryClient = useQueryClient();
	const isLogin = useIsLogin();

	const onSignOut = () => {
		queryClient.removeQueries();
		signOut();
	};
	return (
		<div className="flex justify-end h-[40px] px-4 bg-contents">
			{isLogin && (
				<button type="button" onClick={onSignOut}>
					로그아웃
				</button>
			)}
		</div>
	);
};

export default Header;
