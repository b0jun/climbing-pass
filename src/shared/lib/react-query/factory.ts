import { PassType } from '@prisma/client';

const passKeys = {
  base: [{ scope: 'pass' }] as const,
  lists: () => [{ ...passKeys.base[0], entity: 'passList' }] as const,
  list: (params: { gym: string; passType?: PassType; passDate?: string }) =>
    [{ ...passKeys.lists()[0], params }] as const,
};

export { passKeys };
