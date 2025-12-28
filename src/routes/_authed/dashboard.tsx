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
  const activeOrgId = session.session.activeOrganizationId
  const activeOrgName = (session as any).activeOrganization?.name

  // Tenant Dashboard (Assumes Authenticated + Active Org)
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Organization Dashboard</h1>
        <p className="text-muted-foreground">
          Active Tenant:{' '}
          <span className="font-semibold text-primary">{activeOrgName}</span>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-semibold">Members</h3>
          <p className="text-sm text-muted-foreground">Manage team members</p>
        </div>
        {/* Add more widgets here */}
      </div>
    </div>
  )
}
