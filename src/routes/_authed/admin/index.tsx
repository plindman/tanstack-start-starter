import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

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
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">System Administration</h1>
        <p className="text-muted-foreground">Welcome, {user.name}. You are in Global System Mode.</p>
      </div>

      <div className="border rounded-lg p-6 bg-card text-card-foreground shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Organization Provisioning</h2>
        <div className="flex gap-4">
          <Button asChild>
            <Link to="/admin/organizations/new">Create New Organization</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
