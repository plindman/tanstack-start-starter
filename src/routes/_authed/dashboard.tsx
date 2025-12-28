import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Link, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const { data: session } = authClient.useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.invalidate()
          window.location.href = '/'
        },
      },
    })
  }

  // Loading State
  if (!session) return <div className="p-8">Loading session...</div>

  const { user } = session
  const activeOrgId = session.session.activeOrganizationId
  const activeOrgName = (session as any).activeOrganization?.name

  // Tenant Dashboard (Assumes Authenticated + Active Org)
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Organization Dashboard</h1>
          <p className="text-muted-foreground">
            Active Tenant:{' '}
            <span className="font-semibold text-primary">{activeOrgName}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/select-org">Switch Org</Link>
          </Button>
          <Button variant="ghost" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
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
