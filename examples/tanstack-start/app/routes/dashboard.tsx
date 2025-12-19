import { createFileRoute, redirect } from '@tanstack/react-router'
import { auth } from '../lib/auth'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const isAuth = await auth.isAuthenticated()
    if (!isAuth) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: Dashboard,
})

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is a protected route.</p>
    </div>
  )
}
