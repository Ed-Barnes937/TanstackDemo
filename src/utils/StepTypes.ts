export enum StepType {
  InlineQuery = 0,
  ReusableHook = 1,
  QueryOptions = 2,
  Suspense = 3,
  Prefetch = 4,
}

export const StepNames: Record<StepType, string> = {
  [StepType.InlineQuery]: 'Inline Query',
  [StepType.ReusableHook]: 'Reusable Hook',
  [StepType.QueryOptions]: 'Query Options',
  [StepType.Suspense]: 'Suspense',
  [StepType.Prefetch]: 'Prefetch',
}