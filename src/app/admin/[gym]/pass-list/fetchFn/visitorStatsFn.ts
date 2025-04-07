import { getVisitorStats } from '../actions';
import { VisitorStatsParams } from '../types/pass-list.type';

export const visitorStatsFn = async (params: VisitorStatsParams) => {
  const data = await getVisitorStats(params);
  return data;
};
