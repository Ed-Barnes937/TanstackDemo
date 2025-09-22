import { fetchUserOptions } from "@/queries/fetchUsers";
import { StepType } from "@/utils/StepTypes";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../Spinner";
import Table from "../Table";

const QueryOptions = () => {
  const { data, isPending, isError, error } = useQuery(
    fetchUserOptions({ feature: StepType.QueryOptions }),
  );

  if (isPending) return <Spinner />;
  if (isError) return <div className="text-red-500">{error.message}</div>;
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
            <Table.Cell>{user.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default QueryOptions;
