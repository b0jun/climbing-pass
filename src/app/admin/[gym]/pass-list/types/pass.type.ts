import { Pass } from '@prisma/client';

export type PassToggleStatusTarget = Pick<Pass, 'id' | 'status' | 'name'>;
export type PassUpdateTarget = Pick<Pass, 'id' | 'type' | 'shoesRental' | 'name'>;
export type PassDeleteTarget = Pick<Pass, 'id' | 'name'>;

export type PassUpdateRequest = { id: string } & Partial<Pick<Pass, 'status' | 'type' | 'shoesRental'>>;
