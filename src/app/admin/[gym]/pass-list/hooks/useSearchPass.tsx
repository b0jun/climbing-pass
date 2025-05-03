'use client';

import { useMutation } from '@tanstack/react-query';

import { searchPass } from '../actions/searchPass';

export function useSearchPass() {
  const query = useMutation({
    mutationFn: searchPass,
  });
  return query;
}
