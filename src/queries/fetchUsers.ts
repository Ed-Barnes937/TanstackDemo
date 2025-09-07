import type { SortableFields } from "@/components/TableDemo/Sorting/Sorting";
import { StepType } from "@/utils/StepTypes";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeyFactory } from "./queryKeyFactory";

const baseUrl = "https://dummyjson.com";

export interface BaseResponse {
  total: number;
  skip: number;
  limit: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  username: string;
  email: string;
}

export interface UserResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export type Order = "asc" | "desc";
interface FetchUsersParams {
  sortBy?: SortableFields;
  order?: Order;
}

export const fetchUsers = async ({
  sortBy,
  order,
}: FetchUsersParams): Promise<User[]> => {
  const url = new URL(`${baseUrl}/users`);
  url.searchParams.set("limit", "15");
  if (sortBy) url.searchParams.set("sortBy", sortBy);
  if (order) url.searchParams.set("order", order);
  const res = await fetch(url.toString());
  const json = (await res.json()) as unknown as UserResponse;
  const users = json.users;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return users;
};

export const fetchUserOptions = ({
  feature,
}: Pick<FetchUserOptionsParams, "feature">) => ({
  queryKey: ["users", feature],
  queryFn: () => fetchUsers({}),
});

interface FetchUserOptionsParams extends FetchUsersParams {
  feature: StepType;
}
export const fetchSortedUsersOptions = ({
  feature,
  sortBy,
  order,
}: FetchUserOptionsParams) => ({
  queryKey: queryKeyFactory.users(feature, sortBy, order),
  queryFn: () => fetchUsers({ sortBy, order }),
  placeholderData: keepPreviousData,
  staleTime: 1000 * 60 * 5,
});

export const useUsers = ({
  feature = StepType.ReusableHook,
}: {
  feature?: StepType;
}) => {
  return useQuery({
    queryKey: ["users", feature],
    queryFn: () => fetchUsers({}),
  });
};
