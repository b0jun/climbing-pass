import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const useQueryString = () => {
  const searchParams = useSearchParams();

  const updateQueryString = useCallback(
    (name: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (!value) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams],
  );

  return { updateQueryString };
};

export default useQueryString;
