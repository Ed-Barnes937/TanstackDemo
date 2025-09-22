import { Spinner } from "@/components/Spinner";
import { fetchSortedUsersOptions } from "@/queries/fetchUsers";
import { Route as TableRoute } from "@/routes/table.$pageNum";
import { StepType } from "@/utils/StepTypes";
import { useQuery } from "@tanstack/react-query";
import Table from "../../Table";

export const Sorting = () => {
  const navigate = TableRoute.useNavigate();
  const { sortBy, order } = TableRoute.useSearch();
  const { data, isFetching, isPending, isError, error } = useQuery(
    fetchSortedUsersOptions({ feature: StepType.Sorting, sortBy, order }),
  );

  if (isPending) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
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
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.users?.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.firstName}</Table.Cell>
            <Table.Cell>{user.lastName}</Table.Cell>
            <Table.Cell>{user.age}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
