import { Pass } from '@prisma/client';

type BasePassFields = 'name' | 'phoneNumber' | 'dateOfBirth' | 'signature' | 'type' | 'createdAt' | 'locale' | 'pdfUrl';
type PassDetailFields = Pick<Pass, BasePassFields>;

type GymData = {
  gymName: string;
  gymNameEn: string;
  gymLocation: string;
  gymLocationEn: string;
  gymLogo: string;
};

export type PassDetailData = PassDetailFields & GymData;

export interface PassDetailParams {
  gym: string;
  id: Pass['id'];
}
