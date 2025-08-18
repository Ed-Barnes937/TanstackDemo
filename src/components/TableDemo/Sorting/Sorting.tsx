import { fetchSortedUsersOptions } from "@/queries/fetchUsers";
import { Route as TableRoute } from "@/routes/table.$pageNum";
import { StepType } from "@/utils/StepTypes";
import { useSuspenseQuery } from "@tanstack/react-query";
import Table from "../../Table";

export type SortableFields = "firstName" | "lastName" | "age";

export const Sorting = () => {
  const navigate = TableRoute.useNavigate()
  const { sortBy, order } = TableRoute.useSearch();
  const { data: users } = useSuspenseQuery(
    fetchSortedUsersOptions({ feature: StepType.Sorting, sortBy, order })
  );

  return (
    <div className="border border-[#002B36] rounded-lg">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
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
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
