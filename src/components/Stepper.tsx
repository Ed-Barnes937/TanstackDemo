import { Link } from "@tanstack/react-router";

interface StepperProps {
  steps: number;
  currentStep: number
}

const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="flex flex-row justify-between gap-6 items-center">
      <Link
        className="p-2 bg-[#002B36] text-[#B58900] font-semibold rounded-md disabled:cursor-not-allowed"
        to={`/table/$pageNum`}
        params={{ pageNum: (currentStep - 1).toString() }}
        disabled={currentStep === 1}
      >
        Previous</Link>
      <div className="flex flex-row gap-2">
        {Array.from({ length: steps }, (_, index) => (
          <div
            key={index}
            className={`rounded-full bg-[#002B36] w-4 h-4 ${
              (currentStep) === index + 1 ? "outline-3 outline-offset-1 outline-[#B58900]" : ""
            }`}
          />
        ))}
      </div>
      <Link
        className="p-2 bg-[#002B36] text-[#B58900] font-semibold rounded-md disabled:cursor-not-allowed"
        to={`/table/$pageNum`}
        params={{ pageNum: (currentStep + 1).toString() }}
        preload={currentStep + 1 === 5 ? 'intent' : undefined}
        disabled={currentStep === steps}
      >
        Next
      </Link>
    </div>
  )
}

export default Stepper