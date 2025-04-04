import { z } from 'zod';

export const consentSchema = (t: (key: string) => string, isKo: boolean) =>
  z.object({
    name: z
      .string()
      .min(1, t('nameMin'))
      .regex(/^(?!\s*$)[가-힣a-zA-Z\s]*$/, t('nameRegex'))
      .max(30, t('nameMax'))
      .transform((val) => val.trim()),
    phoneNumber: isKo ? z.string().min(1, t('phoneNumberMin')).min(10, t('phoneNumberRegex')) : z.string().optional(),
    dateOfBirth: z
      .string()
      .min(1, t('dateOfBirthMin'))
      .regex(/^(19\d{2}|20\d{2}|2100)\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/, t('dateOfBirthRegex')),
    shoesRental: z.boolean().refine((val) => val !== undefined),
    consent: z.boolean().refine((val) => val === true),
  });

export type ConsentFormData = z.infer<ReturnType<typeof consentSchema>>;
