import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { type RootContext } from '@/routerContext'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Header from '../components/Header'

export const Route = createRootRouteWithContext<RootContext>()({
  component: App
})

function App() {
  return (<div className='w-screen h-screen flex flex-col'>
      <Header />

      <Outlet />
      <TanStackRouterDevtools position='bottom-right' />
      <ReactQueryDevtools buttonPosition='bottom-left' position='bottom' />
    </div>
  )
}