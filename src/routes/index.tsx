import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <ol className="flex flex-col gap-2">
      <Link from="/" to="/table/$pageNum" params={{ pageNum: '1' }}>Simplest Query</Link>
    </ol>
  )
}
