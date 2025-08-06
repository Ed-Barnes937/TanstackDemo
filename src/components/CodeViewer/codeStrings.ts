const codeStrings = [`
  const TableComponent = () => {
    const { data: users, isLoading, isError, error } = useQuery({
      queryKey: ['users'],
      queryFn: fetchUsers
    })

    if (isLoading) return <Spinner />
    if (isError) return <div className="text-red-500">{error.message}</div>
    return (
      <Table>
        ...
      </Table>
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
      <Table>
        ...
      </Table>
    )
  }
  `,
  `
  export const fetchUserOptions = {
    queryKey: ['users'],
    queryFn: fetchUsers
  }

  const TableComponent = () => {
    const { data: users, isLoading, isError, error } = useQuery(fetchUserOptions)

    if (isLoading) return <Spinner />
    if (isError) return <div className="text-red-500">{error.message}</div>
    return (
      <Table>
        ...
      </Table>
    )
  }
  `,
  `
  export const fetchUserOptions = {
    queryKey: ['users'],
    queryFn: fetchUsers
  }

  const TableComponent = () => {
    const { data: users, isError, error } = useSuspenseQuery(fetchUserOptions)

    if (isError) return <div className="text-red-500">{error.message}</div>
    return (
      <Table>
        ...
      </Table>
    )
  }

  const App = () => {
    return (
      <Suspense fallback={<Spinner />}>
        <TableComponent />
      </Suspense>
    )
  }
  `,
  `
  // routes/table.tsx
  const Route = createFileRoute('/table')({
    component: RouteComponent,
    loader: async ({ context }) => {
      context.queryClient.ensureQueryData(fetchUserOptions)
    }
  })

  // components/table.tsx
  export const fetchUserOptions = {
    queryKey: ['users'],
    queryFn: fetchUsers
  }

  const TableComponent = () => {
    const { data: users, isError, error } = useSuspenseQuery(fetchUserOptions)

    if (isError) return <div className="text-red-500">{error.message}</div>
    return (
      <Table>
        ...
      </Table>
    )
  }

  const App = () => {
    return (
      <Suspense fallback={<Spinner />}>
        <TableComponent />
      </Suspense>
    )
  }
  `
]

export default codeStrings