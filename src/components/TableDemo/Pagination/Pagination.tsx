import { PaginationToolbar } from "@/components/PaginationToolbar";
import { Spinner } from "@/components/Spinner";
import { fetchSortedUsersOptions } from "@/queries/fetchUsers";
import { Route as TableRoute } from "@/routes/table.$pageNum";
import { StepType } from "@/utils/StepTypes";
import { useQuery } from "@tanstack/react-query";
import Table from "../../Table";

export const Pagination = () => {
  const navigate = TableRoute.useNavigate();
  const { sortBy, order, page } = TableRoute.useSearch();
  const { data, isFetching, isPending, isError, error } = useQuery(
    fetchSortedUsersOptions({ feature: StepType.Sorting, sortBy, order, page }),
  );

  if (isPending) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="border border-blue rounded-lg">
      <Table isLoading={isFetching}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              className="w-40"
              isSorting={sortBy === "firstName"}
              direction={order}
              onClick={() =>
                navigate({
                  search: {
                    sortBy: "firstName",
                    order: order === "asc" ? "desc" : "asc",
                  },
                })
              }
            >
              First Name
            </Table.HeaderCell>
            <Table.HeaderCell className="w-40">Last Name</Table.HeaderCell>
            <Table.HeaderCell
              className="w-18"
              isSorting={sortBy === "age"}
              direction={order}
              onClick={() =>
                navigate({
                  search: {
                    sortBy: "age",
                    order: order === "asc" ? "desc" : "asc",
                  },
                })
              }
            >
              age
            </Table.HeaderCell>
            <Table.HeaderCell className="w-auto">Account</Table.HeaderCell>
            {/* <Table.HeaderCell>{''}</Table.HeaderCell> */}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.users?.map((user) => (
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
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div>
        <PaginationToolbar
          currentPage={page}
          totalPages={data.total}
          onPageChange={(newPage) => {
            navigate({
              search: {
                page: newPage,
              },
            });
          }}
        />
      </div>
    </div>
  );
};
