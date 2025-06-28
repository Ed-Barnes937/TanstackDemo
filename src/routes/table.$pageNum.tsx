import Stepper from '@/components/Stepper'
import CurrentStep from '@/components/TableDemo/CurrentStep'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/table/$pageNum')({
  component: RouteComponent,
})

function RouteComponent() {
  const { pageNum } = Route.useParams()

  return (
    <div className='flex flex-col justify-between h-full overflow-auto p-4'>
      <h1 className='font-bold text-3xl'>TanStack Table Demo</h1>
      <div className='grow'><CurrentStep step={Number(pageNum ?? 1) - 1} /></div>
      <div className='flex justify-center'><Stepper steps={3} currentStep={Number(pageNum ?? 1)} /></div>
    </div>
    )
}
