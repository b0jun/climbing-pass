import { getPassDetail } from '../actions/getPassDetail';
import { PassDetailData, PassDetailParams } from '../types/pass-detail.type';

export const passDetailFn = async (params: PassDetailParams): Promise<PassDetailData> => {
  const data = await getPassDetail(params);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return data;
};
