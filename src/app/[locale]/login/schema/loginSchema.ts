import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z.string().min(1, '아이디를 입력해주세요.'),
  password: z.string().min(1, '패스워드를 입력해주세요.'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
