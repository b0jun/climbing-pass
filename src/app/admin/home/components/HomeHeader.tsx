'use client';

import { useQueryClient } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

const HomeHeader = () => {
  const queryClient = useQueryClient();

  const onSignOut = () => {
    queryClient.removeQueries();
    signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <div className="bg-contents flex h-[40px] justify-end px-4">
      <button type="button" onClick={onSignOut}>
        로그아웃
      </button>
    </div>
  );
};

export default HomeHeader;
