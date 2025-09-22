import type { User } from "@/queries/fetchUsers";
import { dataSimulation } from "@/utils/dataSimulation";
import { StepType } from "@/utils/StepTypes";

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

export const createUserSimulated = async (
  userData: CreateUserInput,
  feature: StepType,
): Promise<User> => {
  // Make the API call to dummyJSON for realism
  const response = await fetch(`${baseUrl}/users/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  // Add delay for realism
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Use simulation for actual data persistence
  const newUser = dataSimulation.addUser(feature, userData);
  return newUser;
};

export const deleteUserSimulated = async (
  userId: number,
  feature: StepType,
): Promise<User> => {
  // Make the API call to dummyJSON for realism
  const response = await fetch(`${baseUrl}/users/${userId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  // Add delay for realism
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Use simulation for actual data persistence
  const deletedUser = dataSimulation.deleteUser(feature, userId);
  if (!deletedUser) {
    throw new Error("User not found");
  }

  return deletedUser;
};

// Simulated error for testing optimistic updates
export const deleteUserWithErrorSimulated = async (
  userId: number,
  _feature: StepType,
): Promise<User> => {
  // Make the API call to dummyJSON for realism
  await fetch(`${baseUrl}/users/${userId}`, {
    method: "DELETE",
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate an error for demo purposes
  throw new Error("Simulated server error - user deletion failed");
};

export const createUserOptions = () => ({
  mutationFn: (userData: CreateUserInput) =>
    createUserSimulated(userData, StepType.Mutations),
});

export const deleteUserOptions = () => ({
  mutationFn: (userId: number) =>
    deleteUserSimulated(userId, StepType.Mutations),
});
