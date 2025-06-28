import { QueryClient } from "@tanstack/react-query"

export interface RootContext {
  queryClient: QueryClient
}

export const queryClient = new QueryClient()
export const rootContext = {
  queryClient
}