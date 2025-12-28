import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/_authed')({
  beforeLoad: async ({ location }) => {
    // Security Guard: Authenticated Access Only
    const { data: session } = await authClient.getSession()
    if (!session) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
    // If logged in, render <Outlet />
  },
  component: AppLayout,
})

function AppLayout() {
  return <Outlet />
}
