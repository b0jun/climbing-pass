import { searchPass } from '../actions/searchPass';
import { SearchPassRequest } from '../types/pass-list.type';

export const searchPassFn = async (data: SearchPassRequest) => {
  const response = await searchPass(data);
  return response;
};
