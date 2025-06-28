import { Suspense } from "react"
import InLineQuery from "./inLineQuery"
import ReusableHook from "./ReusableHook"

const CurrentStep = ({step}: {step: number}) => {
  switch(step) {
    case 0:
      return <InLineQuery />
    case 1:
      return <ReusableHook />
    case 2:
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <InLineQuery />
        </Suspense>
      )
  }
}

export default CurrentStep