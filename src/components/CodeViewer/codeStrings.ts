const codeStrings = [
  `// components/Table.tsx
  const TableComponent = () => {
    const { data: users, isPending, isError, error } = useQuery({
      queryKey: ['users'],
      queryFn: fetchUsers
    })

    if (isPending) return <Spinner />
    if (isError) return <div className="text-red-500">{error.message}</div>
    return (
      <Table>
        ...
      </Table>
    )
  }
  `,
  `// queries/fetchUsers.ts
  export const useUsers = () => {
    return useQuery({
      queryKey: ['users'],
      queryFn: fetchUsers
    })
  }

  // components/Table.tsx
  const TableComponent = () => {
    const { data: users, isPending, isError, error } = useUsers()

    if (isPending) return <Spinner />
    if (isError) return <div className="text-red-500">{error.message}</div>
    return (
      <Table>
        ...
      </Table>
    )
  }
  `,
  `// queries/fetchUsers.ts
  export const fetchUserOptions = {
    queryKey: ['users'],
    queryFn: fetchUsers
  }

  // components/Table.tsx
  const TableComponent = () => {
    const {
      data: users,
      isPending,
      isError,
      error
    } = useQuery(fetchUserOptions)

    if (isPending) return <Spinner />
    if (isError) return <div className="text-red-500">{error.message}</div>
    return (
      <Table>
        ...
      </Table>
    )
  }
  `,
  `// queries/fetchUsers.ts
  export const fetchUserOptions = {
    queryKey: ['users'],
    queryFn: fetchUsers
  }

  // components/Table.tsx
  const TableComponent = () => {
    const {
      data: users,
      isError,
      error
    } = useSuspenseQuery(fetchUserOptions)

    if (isError) return <div className="text-red-500">{error.message}</div>
    return (
      <Table>
        ...
      </Table>
    )
  }

  // App.tsx
  const App = () => {
    return (
      <Suspense fallback={<Spinner />}>
        <TableComponent />
      </Suspense>
    )
  }
  `,
  `// routes/table.tsx
  const Route = createFileRoute('/table')({
    component: TablePage,
    loader: async ({ context }) => {
      context.queryClient.ensureQueryData(fetchUserOptions)
    }
  })
  // OR
  <Link to="/table" preload="intent">

  // queries/fetchUsers.ts
  export const fetchUserOptions = {
    queryKey: ['users'],
    queryFn: fetchUsers
  }

  // components/Table.tsx
  const TableComponent = () => {
    const { data: users, isError, error } = useSuspenseQuery(fetchUserOptions)

    if (isError) return <div className="text-red-500">{error.message}</div>
    return (
      <Table>
        ...
      </Table>
    )
  }

  // App.tsx
  const App = () => {
    return (
      <Suspense fallback={<Spinner />}>
        <TableComponent />
      </Suspense>
    )
  }
  `,
  `// UserSortParams.tsx
  export const usersSearchSchema = z.object({
    sortBy: z.enum(["firstName", "age"]).default("firstName").optional(),
    order: z.enum(["asc", "desc"]).default("asc").optional(),
  });

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
    queryFn: () => fetchUsers({sortBy, order}),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  })

  // components/Table.tsx
  export const Sorting = () => {
    const navigate = Route.useNavigate()
    const { sortBy, order } = Route.useSearch()
    const { data: users, isFetching, isPending, isError, error } = useQuery(
      fetchSortedUsersOptions({ feature: StepType.Sorting, sortBy, order }),
    );

    if (isPending) return <Spinner />
    if (isError) return <div className="text-red-500">{error.message}</div>

    return (
      <Table>
        ...
      </Table>
    )
  }
  `,
  `// UserSortParams.tsx
  export const usersSearchSchema = z.object({
    ...,
    page: z.number().min(1).default(1).optional(),
  });

  // queries/queryKeyFactory.ts
  export const queryKeyFactory = {
    users: (
      ...
      page?: number,
    ) => ["users", ..., page],
  };

  // queries/fetchUsers.ts
  export const fetchSortedUsersOptions = (
    {..., page}:FetchUserOptionsParams
  ) => ({
    queryKey: queryKeyFactory.users(..., page),
    queryFn: () => fetchUsers({..., page}),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  })

  // components/Table.tsx
  export const Sorting = () => {
    const navigate = Route.useNavigate()
    const { ..., page } = TableRoute.useSearch();
    const { data, isFetching, isPending, isError, error } = useQuery(
      fetchSortedUsersOptions({ ..., page }),
    );

    return (
      <>
        <Table>
          ...
        </Table>
        <PaginationToolbar
          currentPage={page ?? 1}
          totalPages={data.total}
          onPageChange={(newPage) => {
            navigate({
              search: {page: newPage},
            });
          }}
        />
      </>
    )
  }
  `
];

export default codeStrings;
