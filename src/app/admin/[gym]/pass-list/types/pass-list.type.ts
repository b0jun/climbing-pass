import { Pass, PassType } from '@prisma/client';

export type BasePassFields =
  | 'id'
  | 'name'
  | 'phoneNumber'
  | 'dateOfBirth'
  | 'signature'
  | 'type'
  | 'status'
  | 'shoesRental';

export interface PassWithVisits extends Pick<Pass, BasePassFields> {
  totalVisits: number;
  createdAt: string;
}

export interface PassListParams {
  gym: string;
  passType?: PassType;
  passDate?: string;
}

export interface VisitorStatsParams {
  gym: string;
  passDate?: string;
}

export type PassToggleStatusTarget = Pick<Pass, 'id' | 'status' | 'name'>;
export type PassUpdateTarget = Pick<Pass, 'id' | 'type' | 'shoesRental' | 'name'>;
export type PassDeleteTarget = Pick<Pass, 'id' | 'name'>;

export type PassUpdateRequest = { id: string } & Partial<Pick<Pass, 'status' | 'type' | 'shoesRental'>>;

export type SearchPassRequest = { gymDomain: string } & Partial<Pick<Pass, 'name' | 'phoneNumber'>>;
export type SeachPassResult = Pick<Pass, 'id' | 'name' | 'phoneNumber' | 'createdAt'>;
