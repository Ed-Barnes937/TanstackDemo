import NewUserForm from "@/components/NewUserForm";
import { Spinner } from "@/components/Spinner";
import Table from "@/components/Table";
import {
  createUserWithOptimisticOptions,
  deleteUserWithOptimisticErrorOptions,
  deleteUserWithOptimisticOptions,
} from "@/mutations/userMutationsWithOptimistic";
import { fetchUserOptions } from "@/queries/fetchUsers";
import { StepType } from "@/utils/StepTypes";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const OptimisticUpdates = () => {
  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery(
    fetchUserOptions({ feature: StepType.OptimisticUpdates }),
  );

  const createUserMutation = useMutation(
    createUserWithOptimisticOptions(queryClient),
  );
  const deleteUserMutation = useMutation(
    deleteUserWithOptimisticOptions(queryClient),
  );
  const deleteUserErrorMutation = useMutation(
    deleteUserWithOptimisticErrorOptions(queryClient),
  );

  const handleDelete = (userId: number) => {
    deleteUserMutation.mutate(userId);
  };

  const handleDeleteError = (userId: number) => {
    deleteUserErrorMutation.mutate(userId);
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
            <Table.HeaderCell className="w-32">Actions</Table.HeaderCell>
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
                <div className="flex gap-1">
                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={deleteUserMutation.isPending}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 text-xs"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteError(user.id)}
                    disabled={deleteUserErrorMutation.isPending}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 text-xs"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {(deleteUserMutation.isError || deleteUserErrorMutation.isError) && (
        <div className="p-4 text-red-500">
          Delete Error:{" "}
          {deleteUserMutation.error?.message ||
            deleteUserErrorMutation.error?.message}
        </div>
      )}

      <NewUserForm createUserMutation={createUserMutation} />
    </>
  );
};
