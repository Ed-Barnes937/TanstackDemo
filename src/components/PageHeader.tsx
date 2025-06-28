interface PageHeaderProps {
  step: number
}

const PageHeader = ({ step }: PageHeaderProps) => {
  const stepName = () => {switch(step) {
    case 0:
      return 'Inline Query'
    case 1:
      return 'Reusable Hook'
    case 2:
      return 'Suspense'
  }}
  return (
    <div>
      <h1 className='font-bold text-3xl border-b border-[#859900] pb-4'>TanStack Demo - {stepName()}</h1>
    </div>
  )
}

export default PageHeader