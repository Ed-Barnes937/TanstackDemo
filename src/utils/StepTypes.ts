export enum StepType {
  InlineQuery = 1,
  ReusableHook = 2,
  QueryOptions = 3,
  Suspense = 4,
  Prefetch = 5,
  Sorting = 6,
  Pagination = 7,
  Mutations = 8,
  InvalidateOnMutation = 9,
  OptimisticUpdates = 10,
}

export const StepNames: Record<StepType, string> = {
  [StepType.InlineQuery]: "Inline Query",
  [StepType.ReusableHook]: "Reusable Hook",
  [StepType.QueryOptions]: "Query Options",
  [StepType.Suspense]: "Suspense",
  [StepType.Prefetch]: "Prefetch",
  [StepType.Sorting]: "Sorting",
  [StepType.Pagination]: "Pagination",
  [StepType.Mutations]: "Mutations",
  [StepType.InvalidateOnMutation]: "Invalidate on Mutation",
  [StepType.OptimisticUpdates]: "Optimistic Updates",
};
