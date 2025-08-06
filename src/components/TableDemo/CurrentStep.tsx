import { StepType } from "@/utils/StepTypes"
import { Suspense } from "react"
import { Spinner } from "../Spinner"
import InLineQuery from "./inLineQuery"
import { Prefetch } from "./Prefetch"
import QueryOptions from "./QueryOptions"
import ReusableHook from "./ReusableHook"
import SuspenseTable from "./Suspense"

const CurrentStep = ({step}: {step: StepType}) => {
  switch(step) {
    case StepType.InlineQuery:
      return <InLineQuery />
    case StepType.ReusableHook:
      return <ReusableHook />
    case StepType.QueryOptions:
      return <QueryOptions />
    case StepType.Suspense:
      return (
        <Suspense fallback={<Spinner />}>
          <SuspenseTable />
        </Suspense>
      )
    case StepType.Prefetch:
      return (
        <Suspense fallback={<Spinner />}>
          <Prefetch />
        </Suspense>
      )
  }
}

export default CurrentStep