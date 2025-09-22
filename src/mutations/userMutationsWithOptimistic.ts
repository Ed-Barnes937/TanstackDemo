import type { User } from "@/queries/fetchUsers";
import { queryKeyFactory } from "@/queries/queryKeyFactory";
import { StepType } from "@/utils/StepTypes";
import type { QueryClient } from "@tanstack/react-query";
import { baseUrl, createUser, deleteUser } from "./userMutations";

export const deleteUserWithErrorSimulation = async (userId: number) => {
  await fetch(`${baseUrl}/users/${userId}`, {
    method: "DELETE",
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate an error for demo purposes
  throw new Error("Simulated server error - user deletion failed");
};

export const createUserWithOptimisticOptions = (queryClient: QueryClient) => ({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: queryKeyFactory.users(StepType.OptimisticUpdates),
    });
  },
});

export const deleteUserWithOptimisticOptions = (queryClient: QueryClient) => ({
  mutationFn: deleteUser,
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
  onError: (err, deletedUserId, context) => {
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
  mutationFn: deleteUserWithErrorSimulation,
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
  onError: (err, deletedUserId, context) => {
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
