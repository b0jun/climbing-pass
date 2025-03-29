import { Pass } from '@prisma/client';

type BasePassFields = 'name' | 'phoneNumber' | 'dateOfBirth' | 'signature' | 'type' | 'createdAt';
type PassDetailFields = Pick<Pass, BasePassFields>;

export type PassDetailData = PassDetailFields & { gymName: string; gymLogo: string };

export interface PassDetailParams {
  gym: string;
  id: Pass['id'];
}
