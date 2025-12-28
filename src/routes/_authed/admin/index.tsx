import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/_authed/admin/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  const { data: session } = authClient.useSession()

  // Loading State
  if (!session) return <div>Loading session...</div>

  // Ideally we double-check role here, but Middleware should enforce it.
  const { user } = session

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">System Administration</h1>
        <p className="text-muted-foreground">Welcome, {user.name}. You are in Global System Mode.</p>
      </div>
    </div>
  )
}
