import * as z from "zod";

export const usersSearchSchema = z.object({
  sortBy: z.enum(["firstName", "age"]).default("firstName").optional(),
  order: z.enum(["asc", "desc"]).default("asc").optional(),
  page: z.number().min(1).default(1).optional(),
});

export type UsersSearchParams = z.infer<typeof usersSearchSchema>;
