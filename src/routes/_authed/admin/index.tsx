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
  if (!session) return <div className="p-8">Loading session...</div>

  // Ideally we double-check role here, but Middleware should enforce it.
  const { user } = session

  return (
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
             <div>
                <h1 className="text-2xl font-bold">System Administration</h1>
                <p className="text-muted-foreground">Welcome, {user.name}. You are in Global System Mode.</p>
             </div>
        </div>

        <div className="border rounded-lg p-6 bg-card text-card-foreground shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Organization Provisioning</h2>
            <div className="flex gap-4">
                 <Button asChild>
                    <Link to="/admin/organizations/new">Create New Organization</Link>
                 </Button>
                 <Button variant="secondary" asChild>
                    <Link to="/admin/organizations">Manage Organizations</Link>
                 </Button>
                 <Button variant="secondary" asChild>
                    <Link to="/select-org">Switch To Tenant View</Link>
                 </Button>
            </div>
        </div>
      </div>
    )
}
