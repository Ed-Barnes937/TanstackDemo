import { fetchUsers } from "@/queries/fetchUsers"
import { useQuery } from "@tanstack/react-query"
import Table from "../Table"
import { Spinner } from "../Spinner"

const InLineQuery = () => {
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  })

  if (isLoading) return <Spinner />
  if (isError) return <div className="text-red-500">{error.message}</div>
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Phone</Table.HeaderCell>
          <Table.HeaderCell>Website</Table.HeaderCell>
          <Table.HeaderCell>Company</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users?.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.phone}</Table.Cell>
            <Table.Cell>{user.website}</Table.Cell>
            <Table.Cell>{user.company.name}</Table.Cell>
            <Table.Cell>
              <button>Edit</button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default InLineQuery