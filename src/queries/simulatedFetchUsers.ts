import { StepType } from "@/utils/StepTypes";
import { dataSimulation } from "@/utils/dataSimulation";

const baseUrl = "https://dummyjson.com";

interface FetchUsersParams {
  feature: StepType;
}

export const fetchUsersSimulated = async ({ feature }: FetchUsersParams) => {
  // If we don't have simulated data for this feature, fetch from API and initialize
  if (!dataSimulation.hasData(feature)) {
    const url = new URL(`${baseUrl}/users`);
    url.searchParams.set("limit", "15");
    const res = await fetch(url.toString());
    const json = await res.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Initialize simulation with fetched data
    dataSimulation.initializeData(feature, json.users);

    return { users: json.users, total: json.total };
  }

  // Add realistic delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return simulated data
  const users = dataSimulation.getUsers(feature);
  return { users, total: users.length };
};
