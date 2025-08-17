export enum StepType {
  InlineQuery = 1,
  ReusableHook = 2,
  QueryOptions = 3,
  Suspense = 4,
  Prefetch = 5,
}

export const StepNames: Record<StepType, string> = {
  [StepType.InlineQuery]: 'Inline Query',
  [StepType.ReusableHook]: 'Reusable Hook',
  [StepType.QueryOptions]: 'Query Options',
  [StepType.Suspense]: 'Suspense',
  [StepType.Prefetch]: 'Prefetch',
}