import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';

import { useRouter } from '@/i18n/navigation';

const mutationFn = async (body: any) => {
  return await axios.post('/api/pass/create', { body });
};

const useCreatePass = () => {
  const { replace } = useRouter();
  const { gym, type } = useParams();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      replace(`/${gym}/pass/${type}/complete`);
    },
  });
};

export default useCreatePass;
