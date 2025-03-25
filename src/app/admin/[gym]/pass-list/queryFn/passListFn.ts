import { getPassList } from '../actions';
import { PassListParams, PassWithVisits } from '../types/pass-list.type';

export const fetchPassList = async ({ gym, passType, passDate }: PassListParams): Promise<PassWithVisits[]> => {
  const data = await getPassList({ gym, passType, passDate });
  return data;
};
