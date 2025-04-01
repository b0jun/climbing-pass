'use client';

import { useMutation } from '@tanstack/react-query';

import { searchPassFn } from '../fetchFn/searchPassFn';

export function useSearchPass() {
  const query = useMutation({
    mutationFn: searchPassFn,
  });
  return query;
}
