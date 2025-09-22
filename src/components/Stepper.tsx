import { StepNames, StepType } from "@/utils/StepTypes";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface StepperProps {
  steps: number;
  currentStep: number;
}

const Stepper = ({ steps, currentStep }: StepperProps) => {
  const navigate = useNavigate();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const handlePrevious = () => {
    if (currentStep > 1) {
      navigate({
        to: `/table/$pageNum`,
        params: { pageNum: (currentStep - 1).toString() },
        viewTransition: { types: ["slide-right"] },
      });
    }
  };

  const handleNext = () => {
    if (currentStep < steps) {
      navigate({
        to: `/table/$pageNum`,
        params: { pageNum: (currentStep + 1).toString() },
        viewTransition: { types: ["slide-left"] },
      });
    }
  };

  const handleStepClick = (index: number) => {
    navigate({
      to: `/table/$pageNum`,
      params: { pageNum: (index + 1).toString() },
      viewTransition: {
        types: [index < currentStep ? "slide-right" : "slide-left"],
      },
    });
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentStep, steps]);

  return (
    <div className="flex flex-row justify-between gap-6 items-center">
      <Link
        className="p-2 bg-blue text-yellow font-semibold rounded-md data-disabled:cursor-not-allowed data-disabled:text-gray-400"
        to={`/table/$pageNum`}
        params={{ pageNum: (currentStep - 1).toString() }}
        disabled={currentStep === 1}
        data-disabled={currentStep === 1 ? true : null}
        viewTransition={{ types: ["slide-right"] }}
        preload={currentStep - 1 === 5 ? "intent" : undefined}
      >
        {currentStep > 1 ? StepNames[(currentStep - 1) as StepType] : "N/A"}
      </Link>
      <div className="flex flex-row gap-2 relative">
        {Array.from({ length: steps }, (_, index) => (
          <div key={index} className="relative">
            <button
              type="button"
              className={`rounded-full bg-blue w-4 h-4 cursor-pointer ${
                currentStep === index + 1
                  ? "outline-3 outline-offset-1 outline-yellow"
                  : ""
              }`}
              onClick={() => handleStepClick(index)}
              onMouseEnter={() => setHoveredStep(index + 1)}
              onMouseLeave={() => setHoveredStep(null)}
            />
            {hoveredStep === index + 1 && (
              <div
                className="-z-1 absolute bottom-8 left-1/2 px-3 py-2 bg-gray-800 text-white text-xs rounded whitespace-nowrap"
                style={{
                  animation: "slideUp 200ms ease-out forwards",
                }}
              >
                {StepNames[(index + 1) as StepType]}
                <div className="-z-1 absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-gray-800" />
              </div>
            )}
          </div>
        ))}
      </div>
      <Link
        className="p-2 bg-blue text-yellow font-semibold rounded-md"
        to={currentStep < steps ? `/table/$pageNum` : "/furtherReading"}
        params={
          currentStep < steps
            ? { pageNum: (currentStep + 1).toString() }
            : undefined
        }
        preload={currentStep + 1 === 5 ? "intent" : undefined}
      >
        {currentStep < steps
          ? StepNames[(currentStep + 1) as StepType]
          : "More Reading"}
      </Link>
    </div>
  );
};

export default Stepper;
