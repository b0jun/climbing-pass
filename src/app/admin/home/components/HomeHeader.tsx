'use client';

import { useQueryClient } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

interface HomeHeaderProps {
  isLogin: boolean;
}

const HomeHeader = ({ isLogin }: HomeHeaderProps) => {
  const queryClient = useQueryClient();

  const onSignOut = () => {
    queryClient.removeQueries();
    signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <div className="flex h-[40px] justify-end bg-contents px-4">
      {isLogin && (
        <button type="button" onClick={onSignOut}>
          로그아웃
        </button>
      )}
    </div>
  );
};

export default HomeHeader;
