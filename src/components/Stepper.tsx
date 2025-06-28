import { Link } from "@tanstack/react-router";

interface StepperProps {
  steps: number;
  currentStep: number
}

const Stepper = ({ steps, currentStep }: StepperProps) => {
  console.log(currentStep)
  return (
    <div className="flex flex-row justify-between gap-6 items-center">
      <Link
        className="p-2 border border-purple-300 rounded-md disabled:bg-purple-100"
        to={`/table/$pageNum`}
        params={{ pageNum: (currentStep-1).toString() }}
        disabled={currentStep === 0}
      >
        Previous</Link>
      <div className="flex flex-row gap-2">
        {Array.from({ length: steps }, (_, index) => (
          <div
            key={index}
            className={`rounded-full border border-purple-300 w-4 h-4 ${
              (currentStep-1) === index ? "bg-purple-300" : ""
            }`}
          />
        ))}
      </div>
      <Link
        className="p-2 border border-purple-300 rounded-md disabled:bg-purple-100"
        to={`/table/$pageNum`}
        params={{ pageNum: (currentStep + 1).toString() }}
        disabled={(currentStep-1) === steps - 1}
      >
        Next
      </Link>
    </div>
  )
}

export default Stepper