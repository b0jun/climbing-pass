import { updatePass } from '../actions';
import { PassUpdateRequest } from '../types/pass-list.type';

export const togglePassStatusFn = async (params: PassUpdateRequest) => {
  const data = await updatePass(params);
  return data;
};
