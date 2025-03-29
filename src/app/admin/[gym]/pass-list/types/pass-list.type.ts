import { Pass, PassType } from '@prisma/client';

type BasePassFields =
  | 'id'
  | 'name'
  | 'phoneNumber'
  | 'dateOfBirth'
  | 'signature'
  | 'type'
  | 'status'
  | 'shoesRental'
  | 'createdAt';

export interface PassWithVisits extends Pick<Pass, BasePassFields> {
  totalVisits: number;
}

export interface PassListParams {
  gym: string;
  passType?: PassType;
  passDate?: string;
}

export type PassToggleStatusTarget = Pick<Pass, 'id' | 'status' | 'name'>;
export type PassUpdateTarget = Pick<Pass, 'id' | 'type' | 'shoesRental' | 'name'>;
export type PassDeleteTarget = Pick<Pass, 'id' | 'name'>;

export type PassUpdateRequest = { id: string } & Partial<Pick<Pass, 'status' | 'type' | 'shoesRental'>>;
