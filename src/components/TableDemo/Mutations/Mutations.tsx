import NewUserForm from "@/components/NewUserForm";
import { Spinner } from "@/components/Spinner";
import Table from "@/components/Table";
import {
  createUserOptions,
  deleteUserOptions,
} from "@/mutations/userMutations";
import { fetchUserOptions } from "@/queries/fetchUsers";
import { StepType } from "@/utils/StepTypes";
import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from "@tanstack/react-query";

export const Mutations = () => {
  const { data, isPending, isError, error } = useQuery(
    fetchUserOptions({ feature: StepType.Mutations }),
  );

  const createUserMutation = useMutation(createUserOptions());
  const deleteUserMutation = useMutation(deleteUserOptions());

  const handleDelete = (userId: number) => {
    deleteUserMutation.mutate(userId);
  };

  if (isPending) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="w-40">First Name</Table.HeaderCell>
            <Table.HeaderCell className="w-40">Last Name</Table.HeaderCell>
            <Table.HeaderCell className="w-18">Age</Table.HeaderCell>
            <Table.HeaderCell className="w-auto">Account</Table.HeaderCell>
            <Table.HeaderCell className="w-24">Actions</Table.HeaderCell>
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
              <Table.Cell>
                <button
                  onClick={() => handleDelete(user.id)}
                  disabled={deleteUserMutation.isPending}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                >
                  {deleteUserMutation.isPending ? (
                    <ArrowPathIcon className="w-4 h-4 animate-spin" />
                  ) : (
                    <TrashIcon className="w-4 h-4" />
                  )}
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {deleteUserMutation.isError && (
        <div className="p-4 text-red-500">
          Delete Error: {deleteUserMutation.error?.message}
        </div>
      )}

      <NewUserForm createUserMutation={createUserMutation} />
    </>
  );
};
