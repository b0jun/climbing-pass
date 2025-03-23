import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

const queryFn = async () => {
  return await axios('/api/user/myGymList').then((res) => res.data);
};

export function useMyGymList() {
  const suspenseQuery = useSuspenseQuery({
    queryKey: [{ scope: 'useMyGymList' }],
    queryFn,
  });

  return suspenseQuery;
}
