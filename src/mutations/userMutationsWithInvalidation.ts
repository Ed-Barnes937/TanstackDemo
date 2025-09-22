import { queryKeyFactory } from "@/queries/queryKeyFactory";
import { StepType } from "@/utils/StepTypes";
import type { QueryClient } from "@tanstack/react-query";
import { createUser, deleteUser } from "./userMutations";

export const createUserWithInvalidationOptions = (
  queryClient: QueryClient,
) => ({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: queryKeyFactory.users(StepType.InvalidateOnMutation),
    });
  },
});

export const deleteUserWithInvalidationOptions = (
  queryClient: QueryClient,
) => ({
  mutationFn: deleteUser,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: queryKeyFactory.users(StepType.InvalidateOnMutation),
    });
  },
});
