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
  `,
  `// mutations/userMutations.ts
  export const createUserOptions = () => ({
    mutationFn: createUser,
  });

  export const deleteUserOptions = () => ({
    mutationFn: deleteUser,
  });

  // components/Mutations.tsx
  export const Mutations = () => {
    const { data, isPending, isError, error } = useQuery(
      fetchUserOptions({ feature: StepType.Mutations })
    );

    const createUserMutation = useMutation(createUserOptions());
    const deleteUserMutation = useMutation(deleteUserOptions());

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createUserMutation.mutate(formData, {
        onSuccess: () => {
          setShowForm(false);
          setFormData({ firstName: "", lastName: "", age: 25, email: "" });
        },
      });
    };

    const handleDelete = (userId: number) => {
      deleteUserMutation.mutate(userId);
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          ...
        </form>
        <Table>
          <Table.Body>
            {data.users?.map((user) => (
              <Table.Row key={user.id}>
                ...
                <Table.Cell>
                  <button onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  };
  `,
  `// mutations/userMutationsWithInvalidation.ts
  export const createUserWithInvalidationOptions = (queryClient: QueryClient) => ({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.users(StepType.InvalidateOnMutation),
      });
    },
  });

  export const deleteUserWithInvalidationOptions = (queryClient: QueryClient) => ({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.users(StepType.InvalidateOnMutation),
      });
    },
  });

  // components/InvalidateOnMutation.tsx
  export const InvalidateOnMutation = () => {
    const queryClient = useQueryClient();
    const { data, isPending, isError, error } = useQuery(
      fetchUserOptions({ feature: StepType.InvalidateOnMutation })
    );

    const createUserMutation = useMutation(createUserWithInvalidationOptions(queryClient));
    const deleteUserMutation = useMutation(deleteUserWithInvalidationOptions(queryClient));

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createUserMutation.mutate(formData, {
        onSuccess: () => {
          // Query invalidation happens automatically in mutation options
          setShowForm(false);
          setFormData({ firstName: "", lastName: "", age: 25, email: "" });
        },
      });
    };

    const handleDelete = (userId: number) => {
      // Query invalidation happens automatically in mutation options
      deleteUserMutation.mutate(userId);
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>...</form>
        <Table>...</Table>
      </div>
    );
  };
  `,
  `// mutations/userMutationsWithOptimistic.ts
  export const deleteUserWithOptimisticOptions = (queryClient: QueryClient) => ({
    mutationFn: deleteUser,
    onMutate: async (deletedUserId: number) => {
      await queryClient.cancelQueries({
        queryKey: queryKeyFactory.users(StepType.OptimisticUpdates),
      });

      const previousUsers = queryClient.getQueryData(
        queryKeyFactory.users(StepType.OptimisticUpdates)
      );

      queryClient.setQueryData(
        queryKeyFactory.users(StepType.OptimisticUpdates),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            users: old.users.filter((user) => user.id !== deletedUserId),
          };
        }
      );

      return { previousUsers };
    },
    onError: (err, deletedUserId, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(
          queryKeyFactory.users(StepType.OptimisticUpdates),
          context.previousUsers
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.users(StepType.OptimisticUpdates),
      });
    },
  });

  // components/OptimisticUpdates.tsx
  export const OptimisticUpdates = () => {
    const queryClient = useQueryClient();
    const deleteUserMutation = useMutation(deleteUserWithOptimisticOptions(queryClient));
    const deleteUserErrorMutation = useMutation(deleteUserWithOptimisticErrorOptions(queryClient));

    const handleDelete = (userId: number) => {
      deleteUserMutation.mutate(userId); // User disappears immediately
    };

    const handleDeleteError = (userId: number) => {
      deleteUserErrorMutation.mutate(userId); // User disappears, then reappears on error
    };

    return (
      <Table>
        <Table.Body>
          {data.users?.map((user) => (
            <Table.Row key={user.id}>
              ...
              <Table.Cell>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
                <button onClick={() => handleDeleteError(user.id)}>Delete (Error)</button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  };
  `,
];

export default codeStrings;
