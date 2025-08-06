import { StepNames, StepType } from "@/utils/StepTypes"

interface PageHeaderProps {
  step: StepType
}

const PageHeader = ({ step }: PageHeaderProps) => {
  const stepName = StepNames[step]
  return (
    <div>
      <h1 className='font-bold text-3xl border-b border-[#859900] pb-4'>TanStack Demo - {stepName}</h1>
    </div>
  )
}

export default PageHeader