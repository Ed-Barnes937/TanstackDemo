import * as z from "zod";

export const usersSearchSchema = z.object({
  sortBy: z.enum(["firstName", "age"]).default("firstName").optional(),
  order: z.enum(["asc", "desc"]).default("asc").optional(),
});

export type UsersSearchParams = z.infer<typeof usersSearchSchema>;
