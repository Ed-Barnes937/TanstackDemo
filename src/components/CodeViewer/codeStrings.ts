const codeStrings = [`
  const TableComponent = () => {
    const { data: users, isLoading, isError, error } = useQuery({
      queryKey: ['users'],
      queryFn: fetchUsers
    })

    if (isLoading) return <Spinner />
    if (isError) return <div className="text-red-500">{error.message}</div>
    return (
      <div className="shadow-md shadow-gray-100 rounded-lg">
        <Table>
          ...
        </Table>
      </div>
    )
  }
  `,
  `
  export const useUsers = () => {
    return useQuery({
      queryKey: ['users'],
      queryFn: fetchUsers
    })
  }

  const TableComponent = () => {
    const { data: users, isLoading, isError, error } = useUsers()

    if (isLoading) return <Spinner />
    if (isError) return <div className="text-red-500">{error.message}</div>
    return (
      <div className="shadow-md shadow-gray-100 rounded-lg">
        <Table>
          ...
        </Table>
      </div>
    )
  }
  `
]

export default codeStrings