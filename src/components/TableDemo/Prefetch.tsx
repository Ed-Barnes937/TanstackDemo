import { fetchUserOptions } from "@/queries/fetchUsers";
import { StepType } from "@/utils/StepTypes";
import { useSuspenseQuery } from "@tanstack/react-query";
import Table from "../Table";

export const Prefetch = () => {
  const { data } = useSuspenseQuery(
    fetchUserOptions({ feature: StepType.Prefetch }),
  );

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell className="w-40">First Name</Table.HeaderCell>
          <Table.HeaderCell className="w-40">Last Name</Table.HeaderCell>
          <Table.HeaderCell className="w-18">age</Table.HeaderCell>
          <Table.HeaderCell className="w-auto">Account</Table.HeaderCell>
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
  );
};
