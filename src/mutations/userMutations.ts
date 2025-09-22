import type { User } from "@/queries/fetchUsers";

export const baseUrl = "https://dummyjson.com";

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
}

export interface CreateUserResponse extends CreateUserInput {
  id: number;
}

export const createUser = async (
  userData: CreateUserInput,
): Promise<CreateUserResponse> => {
  const response = await fetch(`${baseUrl}/users/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  const result = await response.json();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return result;
};

export const deleteUser = async (userId: number): Promise<User> => {
  const response = await fetch(`${baseUrl}/users/${userId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  const result = await response.json();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return result;
};

export const createUserOptions = () => ({
  mutationFn: createUser,
});

export const deleteUserOptions = () => ({
  mutationFn: deleteUser,
});
