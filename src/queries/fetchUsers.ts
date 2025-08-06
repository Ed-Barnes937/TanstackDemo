import { StepType } from "@/utils/StepTypes"
import { useQuery } from "@tanstack/react-query"

const baseUrl = 'https://dummyjson.com'

export interface BaseResponse {
  total: number
  skip: number
  limit: number
}


export interface User {
  id: number
  firstName: string
  lastName: string
  age: number
  username: string
  email: string
}

export interface UserResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(`${baseUrl}/users?limit=15`)
  const json = await res.json() as unknown as UserResponse
  const users = json.users
  await new Promise(resolve => setTimeout(resolve, 1000))
  return users
}

export const fetchUserOptions = ({feature}: {feature: StepType}) => ({
  queryKey: ['users', feature],
  queryFn: fetchUsers
})

export const useUsers = () => {
  return useQuery({
    queryKey: ['users', StepType.ReusableHook],
    queryFn: fetchUsers
  })
}