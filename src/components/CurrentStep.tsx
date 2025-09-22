import { StepType } from "@/utils/StepTypes";
import { Suspense } from "react";
import { Spinner } from "./Spinner";
import InLineQuery from "./TableDemo/inLineQuery";
import { InvalidateOnMutation } from "./TableDemo/InvalidateOnMutation/InvalidateOnMutation";
import { Mutations } from "./TableDemo/Mutations/Mutations";
import { OptimisticUpdates } from "./TableDemo/OptimisticUpdates/OptimisticUpdates";
import { Pagination } from "./TableDemo/Pagination/Pagination";
import { Prefetch } from "./TableDemo/Prefetch";
import QueryOptions from "./TableDemo/QueryOptions";
import ReusableHook from "./TableDemo/ReusableHook";
import { Sorting } from "./TableDemo/Sorting/Sorting";
import SuspenseTable from "./TableDemo/Suspense";

const CurrentStep = ({ step }: { step: StepType }) => {
  switch (step) {
    case StepType.InlineQuery:
      return <InLineQuery />;
    case StepType.ReusableHook:
      return <ReusableHook />;
    case StepType.QueryOptions:
      return <QueryOptions />;
    case StepType.Suspense:
      return (
        <Suspense fallback={<Spinner />}>
          <SuspenseTable />
        </Suspense>
      );
    case StepType.Prefetch:
      return (
        <Suspense fallback={<Spinner />}>
          <Prefetch />
        </Suspense>
      );
    case StepType.Sorting:
      return <Sorting />;
    case StepType.Pagination:
      return <Pagination />;
    case StepType.Mutations:
      return <Mutations />;
    case StepType.InvalidateOnMutation:
      return <InvalidateOnMutation />;
    case StepType.OptimisticUpdates:
      return <OptimisticUpdates />;
  }
};

export default CurrentStep;
