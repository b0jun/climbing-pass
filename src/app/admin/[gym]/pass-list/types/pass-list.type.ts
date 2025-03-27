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
