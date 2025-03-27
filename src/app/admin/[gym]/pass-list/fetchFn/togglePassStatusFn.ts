import { updatePass } from '../actions';
import { PassUpdateRequest } from '../types/pass.type';

export const togglePassStatusFn = async (params: PassUpdateRequest) => {
  const data = await updatePass(params);
  return data;
};
