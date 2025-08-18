import * as z from 'zod';

export const usersSearchSchema = z.object({
  sortBy: z.enum(['firstName', 'age']).default('firstName'),
  order: z.enum(['asc', 'desc']).default('asc'),
});

export type UsersSearchParams = z.infer<typeof usersSearchSchema>;