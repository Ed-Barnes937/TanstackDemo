import CodeViewer from "@/components/CodeViewer/CodeViewer";
import PageHeader from "@/components/PageHeader";
import Stepper from "@/components/Stepper";
import CurrentStep from "@/components/TableDemo/CurrentStep";
import { usersSearchSchema } from "@/components/TableDemo/Sorting/UserSortParams";
import { fetchUserOptions } from "@/queries/fetchUsers";
import { StepType } from "@/utils/StepTypes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/$pageNum")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const pageNum = Number(params.pageNum);
    if (pageNum === 5) {
      // we are showing off the router prefetching
      context.queryClient.ensureQueryData(
        fetchUserOptions({ feature: StepType.Prefetch }),
      );
    }
  },
  validateSearch: (search) => usersSearchSchema.parse(search),
});

function RouteComponent() {
  const { pageNum } = Route.useParams();

  return (
    <div className="flex flex-col gap-4 justify-between min-h-0 h-full overflow-auto p-4">
      <PageHeader step={Number(pageNum ?? 1)} />
      <div className="grow flex flex-row gap-4 min-h-0 h-full">
        <div className="grow flex flex-col gap-4 w-1/2">
          <div className="grow">
            <CurrentStep step={Number(pageNum ?? 1)} />
          </div>
          <div className="flex justify-center">
            <Stepper steps={10} currentStep={Number(pageNum ?? 1)} />
          </div>
        </div>
        <div className="overflow-y-auto h-full w-1/2 bg-[#002B36] p-6 rounded-lg shadow-md shadow-gray-100">
          <CodeViewer step={Number(pageNum ?? 1)} />
        </div>
      </div>
    </div>
  );
}
