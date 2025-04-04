export const PASS_VALID_TYPES = ['day-pass', 'day-experience'] as const;
export type PassValidType = (typeof PASS_VALID_TYPES)[number];
