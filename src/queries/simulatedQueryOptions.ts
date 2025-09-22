import { StepType } from "@/utils/StepTypes";
import type { User } from "./fetchUsers";
import { queryKeyFactory } from "./queryKeyFactory";
import { fetchUsersSimulated } from "./simulatedFetchUsers";

export const fetchUserSimulatedOptions = (feature: StepType) => ({
  queryKey: queryKeyFactory.users(feature),
  queryFn: (): Promise<{ users: User[]; total: number }> =>
    fetchUsersSimulated({ feature }),
});
