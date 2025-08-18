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
    component: TablePage,
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
  `,
  `
  // routes/table.tsx
  export const Route = createFileRoute('/table')({
    component: TablePage,
    validateSearch: search => usersSearchSchema.parse(search)
  })

  // queries/queryKeyFactory.ts
  export const queryKeyFactory = {
    users: (feature: StepType, sortBy?: SortableFields, order?: Order) => ['users', feature, sortBy, order],
  }

  // queries/fetchUsers.ts
  export const fetchSortedUsersOptions = ({feature, sortBy, order}: FetchUserOptionsParams) => ({
    queryKey: queryKeyFactory.users(feature, sortBy, order),
    queryFn: () => fetchUsers({sortBy, order})
  })

  // components/TableDemo/Sorting/Sorting.tsx
  export const Sorting = () => {
    const navigate = Route.useNavigate()
    const { sortBy, order } = Route.useSearch();
    const { data: users } = useSuspenseQuery(
      fetchSortedUsersOptions({ feature: StepType.Sorting, sortBy, order })
    );

    return (
      <Table>
        ...
      </Table>
    )
  }
  `
]

export default codeStrings