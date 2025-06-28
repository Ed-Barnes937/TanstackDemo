import { Suspense } from "react"
import InLineQuery from "./inLineQuery"

const CurrentStep = ({step}: {step: number}) => {
  switch(step) {
    case 0:
      return <InLineQuery />
    case 1:
      return <InLineQuery />
    case 2:
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <InLineQuery />
        </Suspense>
      )
  }
}

export default CurrentStep