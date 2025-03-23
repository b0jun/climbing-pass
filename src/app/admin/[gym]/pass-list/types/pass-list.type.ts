import { Pass } from '@prisma/client';

export interface PassWithVisits extends Pass {
  totalVisits: number;
}
