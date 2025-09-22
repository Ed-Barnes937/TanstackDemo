import type { CreateUserInput } from "@/mutations/userMutations";
import type { User } from "@/queries/fetchUsers";
import { StepType } from "@/utils/StepTypes";

class DataSimulation {
  private static instance: DataSimulation;
  private userData: Map<string, User[]> = new Map();
  private nextId = 1000;

  private constructor() {}

  static getInstance(): DataSimulation {
    if (!DataSimulation.instance) {
      DataSimulation.instance = new DataSimulation();
    }
    return DataSimulation.instance;
  }

  initializeData(feature: StepType, users: User[]): void {
    const featureKey = feature.toString();
    if (!this.userData.has(featureKey)) {
      this.userData.set(featureKey, [...users]);
      const maxId = Math.max(...users.map((u) => u.id));
      this.nextId = Math.max(this.nextId, maxId + 1);
    }
  }

  getUsers(feature: StepType): User[] {
    const featureKey = feature.toString();
    return this.userData.get(featureKey) || [];
  }

  addUser(feature: StepType, userData: CreateUserInput): User {
    const featureKey = feature.toString();
    const users = this.getUsers(feature);
    const newUser: User = {
      ...userData,
      id: this.nextId++,
      username: `${userData.firstName.toLowerCase()}${userData.lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`,
    };

    const updatedUsers = [...users, newUser];
    this.userData.set(featureKey, updatedUsers);
    return newUser;
  }

  deleteUser(feature: StepType, userId: number): User | null {
    const featureKey = feature.toString();
    const users = this.getUsers(feature);
    const userToDelete = users.find((u) => u.id === userId);

    if (userToDelete) {
      const updatedUsers = users.filter((u) => u.id !== userId);
      this.userData.set(featureKey, updatedUsers);
      return userToDelete;
    }

    return null;
  }

  hasData(feature: StepType): boolean {
    const featureKey = feature.toString();
    return this.userData.has(featureKey);
  }
}

export const dataSimulation = DataSimulation.getInstance();
