export const featurePreviewStrings = {
  select: `export const fetchUserOptions = ({
  select
}: Pick<FetchUserOptionsParams, "feature">) => ({
  queryKey: ["users"],
  queryFn: fetchUsers,
  select
});

// stable function reference (useCallback or statically defined)
const fullNameSelector = (state: RootState) => state.user.fullName + ' ' + state.user.lastName;
const {data: fullName} = useQuery(fetchUserOptions(fullNameSelector));
`,
  conditionalQueries: `// Doesn't fetch until user is authenticated
const { data: users } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
  enabled: !!user.isAuthenticated
});
`,
  dependentQueries: `// First fetch user
const { data: user } = useQuery({
  queryKey: ["user", userId],
  queryFn: () => fetchUser(userId)
});

// Then fetch user's posts (depends on user data)
const { data: posts } = useQuery({
  queryKey: ["posts", user?.id],
  queryFn: () => fetchUserPosts(user.id),
  enabled: !!user?.id
});`,
  parallelQueries: `// Normally just use useQuery but for dynamic queries there is useQueries
const userQueries = useQueries({
  queries: users.map((user) => {
    return {
      queryKey: ['user', user.id],
      queryFn: () => fetchUserById(user.id),
    }
  }),
})
`,
};

export const wordCloud = [
  "background refetch",
  "cache management",
  "placeholder data",
  "query cancelling",
  "performance optimization",
  "infinite queries",
];
