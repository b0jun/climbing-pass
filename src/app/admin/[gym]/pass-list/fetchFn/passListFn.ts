import { getPassList } from '../actions';
import { PassListParams } from '../types/pass-list.type';

export const passListFn = async (params: PassListParams) => {
  const response = await getPassList(params);
  if (!response.success) {
    throw new Error(response.message);
  }
  return response.data;
};
