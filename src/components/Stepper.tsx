import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

interface StepperProps {
  steps: number;
  currentStep: number
}

const Stepper = ({ steps, currentStep }: StepperProps) => {
  const navigate = useNavigate();

  const handlePrevious = () => {
    if (currentStep > 1) {
      navigate({
        to: `/table/$pageNum`,
        params: { pageNum: (currentStep - 1).toString() },
        viewTransition: {types: ['slide-right']},
      });
    }
  };

  const handleNext = () => {
    if (currentStep < steps) {
      navigate({
        to: `/table/$pageNum`,
        params: { pageNum: (currentStep + 1).toString() },
        viewTransition: {types: ['slide-left']},
      });
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentStep, steps]);

  return (
    <div className="flex flex-row justify-between gap-6 items-center">
      <Link
        className="p-2 bg-blue text-yellow font-semibold rounded-md disabled:cursor-not-allowed"
        to={`/table/$pageNum`}
        params={{ pageNum: (currentStep - 1).toString() }}
        disabled={currentStep === 1}
        viewTransition={{types: ['slide-right']}}
        preload={currentStep - 1 === 5 ? 'intent' : undefined}
      >
        Previous</Link>
      <div className="flex flex-row gap-2">
        {Array.from({ length: steps }, (_, index) => (
          <div
            key={index}
            className={`rounded-full bg-blue w-4 h-4 ${
              (currentStep) === index + 1 ? "outline-3 outline-offset-1 outline-yellow" : ""
            }`}
          />
        ))}
      </div>
      <Link
        className="p-2 bg-blue text-yellow font-semibold rounded-md disabled:cursor-not-allowed"
        to={`/table/$pageNum`}
        params={{ pageNum: (currentStep + 1).toString() }}
        preload={currentStep + 1 === 5 ? 'intent' : undefined}
        disabled={currentStep === steps}
        viewTransition={{types: ['slide-left']}}
      >
        Next
      </Link>
    </div>
  )
}

export default Stepper