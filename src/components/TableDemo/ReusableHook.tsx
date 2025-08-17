import { useUsers } from "@/queries/fetchUsers"
import { Spinner } from "../Spinner"
import Table from "../Table"

const ReusableHook = () => {
  const { data: users, isLoading, isError, error } = useUsers({})

  if (isLoading) return <Spinner />
  if (isError) return <div className="text-red-500">{error.message}</div>
  return (
    <div className="border border-[#002B36] rounded-lg">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>age</Table.HeaderCell>
            <Table.HeaderCell>Account</Table.HeaderCell>
            {/* <Table.HeaderCell>{''}</Table.HeaderCell> */}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users?.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.firstName}</Table.Cell>
              <Table.Cell>{user.lastName}</Table.Cell>
              <Table.Cell>{user.age}</Table.Cell>
              <Table.Cell>
                <div className="flex flex-col gap-2">
                  {user.username}
                  {user.email}
                </div>
              </Table.Cell>

              {/* <Table.Cell>
                <button className="p-2 bg-gray-100 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-4 h-4 text-gray-500 hover:text-purple-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 5.487a2.25 2.25 0 1 1 3.182 3.182l-9.375 9.375a2 2 0 0 1-.707.464l-4.125 1.375a.5.5 0 0 1-.632-.632l1.375-4.125a2 2 0 0 1 .464-.707l9.375-9.375z"
                    />
                  </svg>
                </button>
              </Table.Cell> */}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ReusableHook