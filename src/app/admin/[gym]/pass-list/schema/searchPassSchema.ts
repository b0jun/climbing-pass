import { z } from 'zod';

export const searchPassSchema = z
  .object({
    name: z
      .string()
      .optional()
      .transform((val) => (val ? val.trim() : val)),
    phoneNumber: z
      .string()
      .optional()
      .transform((val) => (val ? val.trim() : val))
      .refine((val) => !val || /^\d+$/.test(val), {
        message: '휴대폰번호는 숫자만 입력 가능합니다.',
      }),
  })
  .refine((data) => data.name || data.phoneNumber, {
    message: '이름 또는 휴대폰번호 중 하나는 입력해야 합니다.',
    path: ['name'],
  });

export type SearchPassFormData = z.infer<typeof searchPassSchema>;
