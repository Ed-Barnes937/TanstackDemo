export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  await new Promise(resolve => setTimeout(resolve, 1000))
  return res.json()
}

export const fetchUserOptions = {
  queryKey: ['users'],
  queryFn: fetchUsers
}