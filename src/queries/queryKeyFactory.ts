import type { SortableFields } from "@/components/TableDemo/Sorting/Sorting"
import { StepType } from "@/utils/StepTypes"
import type { Order } from "./fetchUsers"

export const queryKeyFactory = {
  users: (feature: StepType, sortBy?: SortableFields, order?: Order) => ['users', feature, sortBy, order],
}