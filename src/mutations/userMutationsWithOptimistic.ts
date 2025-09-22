import type { User } from "@/queries/fetchUsers";
import { queryKeyFactory } from "@/queries/queryKeyFactory";
import { StepType } from "@/utils/StepTypes";
import type { QueryClient } from "@tanstack/react-query";
import type { CreateUserInput } from "./userMutations";
import {
  createUserSimulated,
  deleteUserSimulated,
  deleteUserWithErrorSimulated,
} from "./userMutations";

export const createUserWithOptimisticOptions = (queryClient: QueryClient) => ({
  mutationFn: (userData: CreateUserInput) =>
    createUserSimulated(userData, StepType.OptimisticUpdates),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: queryKeyFactory.users(StepType.OptimisticUpdates),
    });
  },
});

export const deleteUserWithOptimisticOptions = (queryClient: QueryClient) => ({
  mutationFn: (userId: number) =>
    deleteUserSimulated(userId, StepType.OptimisticUpdates),
  onMutate: async (deletedUserId: number) => {
    await queryClient.cancelQueries({
      queryKey: queryKeyFactory.users(StepType.OptimisticUpdates),
    });

    const previousUsers = queryClient.getQueryData<{
      users: User[];
      total: number;
    }>(queryKeyFactory.users(StepType.OptimisticUpdates));

    queryClient.setQueryData<{ users: User[]; total: number }>(
      queryKeyFactory.users(StepType.OptimisticUpdates),
      (old) => {
        if (!old) return old;
        return {
          ...old,
          users: old.users.filter((user) => user.id !== deletedUserId),
        };
      },
    );

    return { previousUsers };
  },
  onError: (_err: any, _deletedUserId: number, context: any) => {
    if (context?.previousUsers) {
      queryClient.setQueryData(
        queryKeyFactory.users(StepType.OptimisticUpdates),
        context.previousUsers,
      );
    }
  },
  onSettled: () => {
    queryClient.invalidateQueries({
      queryKey: queryKeyFactory.users(StepType.OptimisticUpdates),
    });
  },
});

export const deleteUserWithOptimisticErrorOptions = (
  queryClient: QueryClient,
) => ({
  mutationFn: (userId: number) =>
    deleteUserWithErrorSimulated(userId, StepType.OptimisticUpdates),
  onMutate: async (deletedUserId: number) => {
    await queryClient.cancelQueries({
      queryKey: queryKeyFactory.users(StepType.OptimisticUpdates),
    });

    const previousUsers = queryClient.getQueryData<{
      users: User[];
      total: number;
    }>(queryKeyFactory.users(StepType.OptimisticUpdates));

    queryClient.setQueryData<{ users: User[]; total: number }>(
      queryKeyFactory.users(StepType.OptimisticUpdates),
      (old) => {
        if (!old) return old;
        return {
          ...old,
          users: old.users.filter((user) => user.id !== deletedUserId),
        };
      },
    );

    return { previousUsers };
  },
  onError: (_err: any, _deletedUserId: number, context: any) => {
    if (context?.previousUsers) {
      queryClient.setQueryData(
        queryKeyFactory.users(StepType.OptimisticUpdates),
        context.previousUsers,
      );
    }
  },
  onSettled: () => {
    queryClient.invalidateQueries({
      queryKey: queryKeyFactory.users(StepType.OptimisticUpdates),
    });
  },
});
