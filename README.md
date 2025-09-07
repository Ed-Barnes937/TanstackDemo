Demo Tanstack Query

| Done | Feature                            | Demo Idea in Data Table                                                               |
| ---- | ---------------------------------- | ------------------------------------------------------------------------------------- |
| ✅   | 1. Inline useQuery                 | Hardcoded fetch of all users, simple render, show loading/error states                |
| ✅   | 2. Extract query function          | Move fetchUsers to /api/users.ts, minimal visual change – talk through code structure |
| ✅   | 3. Custom useUsersQuery hook       | Move logic to useUsersQuery(filter), cleaner component, same UI                       |
| ✅   | 4. Switch to useSuspenseQuery      | Use useSuspenseQuery, wrap table in `<Suspense fallback={<Spinner />}>`               |
| ✅   | 5. Prefetch QueryOptions in Router | Show preloading in Tanstack Router                                                    |
| ✅   | 6. Sorting & pagination            | Add sort header or dropdown + pagination buttons, include in query key                |
|      | 7. Filtering with query key        | Add a text input to filter users by name, updates query key                           |
|      | 8. Mutations                       | Add "Add User" or "Delete" button per row – use useMutation                           |
|      | 9. Invalidate/refetch on mutation  | On successful mutation, refetch the users query                                       |
|      | 10. Optimistic updates             | Delete user row instantly on click, then roll back on error                           |
|      | 11. Debounced/deferred filters     | Add debounce to filter input to reduce rapid refetches                                |
|      | 12. Conditional queries (enabled)  | Only fetch users if a certain filter or toggle is active                              |
|      | 13. Query object factory pattern   | Move queryKey/queryFn to reusable object usersQuery(filter), pass to useQuery         |
|      | 14. select to transform data       | Use select to add computed fields (e.g., fullName from first + last) before display   |
|      | 15. Initial vs placeholder data    | Show loading skeleton with placeholderData, or preload last query with initialData    |
|      | 16. Dependent queries              | Add detail panel per user row that only fetches when a user is selected               |
