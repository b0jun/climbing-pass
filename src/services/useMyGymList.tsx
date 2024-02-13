import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const queryFn = async () => {
	return await axios('/api/user/myGymList').then((res) => res.data);
};

const useMyGymList = () => {
	return useQuery({
		queryKey: ['useMyGymList'],
		queryFn,
	});
};

export default useMyGymList;
