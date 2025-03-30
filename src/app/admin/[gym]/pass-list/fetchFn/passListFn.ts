import { getPassList } from '../actions';
import { PassListParams, PassWithVisits } from '../types/pass-list.type';

export const passListFn = async (params: PassListParams): Promise<PassWithVisits[]> => {
  const data = await getPassList(params);
  return data;
};
