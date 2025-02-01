import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';

import { gymKeys } from '@/lib/react-query/factory';

const queryFn = async ({ queryKey }: any) => {
  const { gym } = queryKey[0];
  return await axios(`/api/gym/${gym}/name`).then((res) => res.data);
};

const useGymName = () => {
  const { gym } = useParams();

  return useQuery({
    queryKey: gymKeys.name(gym as string),
    queryFn,
    enabled: !!gym,
  });
};

export default useGymName;
