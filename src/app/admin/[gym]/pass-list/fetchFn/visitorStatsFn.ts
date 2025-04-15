import { getVisitorStats } from '../actions';
import { VisitorStatsParams } from '../types/pass-list.type';

export const visitorStatsFn = async (params: VisitorStatsParams) => {
  const response = await getVisitorStats(params);
  if (!response.success) {
    throw new Error(response.message);
  }
  return response.data;
};
