import { queryKeyFactory } from "@/queries/queryKeyFactory";
import { StepType } from "@/utils/StepTypes";
import type { QueryClient } from "@tanstack/react-query";
import type { CreateUserInput } from "./userMutations";
import { createUserSimulated, deleteUserSimulated } from "./userMutations";

export const createUserWithInvalidationOptions = (
  queryClient: QueryClient,
) => ({
  mutationFn: (userData: CreateUserInput) =>
    createUserSimulated(userData, StepType.InvalidateOnMutation),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: queryKeyFactory.users(StepType.InvalidateOnMutation),
    });
  },
});

export const deleteUserWithInvalidationOptions = (
  queryClient: QueryClient,
) => ({
  mutationFn: (userId: number) =>
    deleteUserSimulated(userId, StepType.InvalidateOnMutation),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: queryKeyFactory.users(StepType.InvalidateOnMutation),
    });
  },
});
