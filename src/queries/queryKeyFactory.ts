import { StepType } from "@/utils/StepTypes";
import type { Order } from "./fetchUsers";

export type SortableFields = "firstName" | "age";

export const queryKeyFactory = {
  users: (
    feature: StepType,
    sortBy?: SortableFields,
    order?: Order,
    page?: number,
  ) => ["users", feature, sortBy, order, page],
};
