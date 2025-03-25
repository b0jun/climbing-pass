import { Pass, PassType } from '@prisma/client';

export interface PassWithVisits extends Pass {
  totalVisits: number;
}

export interface PassListParams {
  gym: string;
  passType?: PassType;
  passDate?: string;
}
