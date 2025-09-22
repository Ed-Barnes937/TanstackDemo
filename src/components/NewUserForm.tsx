import type { CreateUserInput } from "@/mutations/userMutations";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface NewUserFormProps {
  createUserMutation: any;
}

const NewUserForm = ({ createUserMutation }: NewUserFormProps) => {
  const [formData, setFormData] = useState<CreateUserInput>({
    firstName: "",
    lastName: "",
    age: 25,
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({ firstName: "", lastName: "", age: 25, email: "" });
      },
    });
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="mt-1 block w-32 px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="mt-1 block w-32 px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) =>
              setFormData({ ...formData, age: parseInt(e.target.value) })
            }
            className="mt-1 block w-20 px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="mt-1 block w-48 px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          disabled={createUserMutation.isPending}
          className="p-4 bg-green text-white rounded-full hover:scale-105 transition-transform duration-200 cursor-pointer disabled:opacity-50"
        >
          {createUserMutation.isPending ? (
            <ArrowPathIcon className="h-4 w-4 animate-spin" />
          ) : (
            <PlusIcon className="h-4 w-4" />
          )}
        </button>
      </form>
      {createUserMutation.isError && (
        <div className="mt-2 text-red-500">
          Error: {createUserMutation.error?.message}
        </div>
      )}
    </div>
  );
};

export default NewUserForm;
