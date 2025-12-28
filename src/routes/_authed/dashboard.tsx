import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/_authed/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const { data: session } = authClient.useSession()

  // Loading State
  if (!session) return <div>Loading session...</div>

  const { user } = session

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {user.name}.</p>
      </div>

      <div className="text-sm text-muted-foreground">
        This is your workspace. Use the navigation menu to access features.
      </div>
    </div>
  )
}
