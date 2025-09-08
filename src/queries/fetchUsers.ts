import { StepType } from "@/utils/StepTypes";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeyFactory, type SortableFields } from "./queryKeyFactory";

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
  page?: number;
}

export const fetchUsers = async ({ sortBy, order, page }: FetchUsersParams) => {
  const url = new URL(`${baseUrl}/users`);
  const defaultLimit = 15;
  url.searchParams.set("limit", String(defaultLimit));
  if (sortBy) url.searchParams.set("sortBy", sortBy);
  if (order) url.searchParams.set("order", order);
  if (page) url.searchParams.set("skip", String((page - 1) * defaultLimit));
  const res = await fetch(url.toString());
  const json = (await res.json()) as unknown as UserResponse;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { users: json.users, total: json.total };
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
  page,
}: FetchUserOptionsParams) => ({
  queryKey: queryKeyFactory.users(feature, sortBy, order, page),
  queryFn: () => fetchUsers({ sortBy, order, page }),
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
