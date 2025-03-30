import { getPassDetail } from '../actions/getPassDetail';
import { PassDetailData, PassDetailParams } from '../types/pass-detail.type';

export const passDetailFn = async (params: PassDetailParams): Promise<PassDetailData> => {
  const data = await getPassDetail(params);
  return data;
};
