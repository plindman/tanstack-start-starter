import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { User } from 'lucide-react'

export const Route = createFileRoute('/_authed')({
  beforeLoad: async ({ location }) => {
    // 1. Authenticated Check
    const { data: session } = await authClient.getSession()
    if (!session) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }

    // 2. Exception Paths (Don't check orgs if we are already dealing with orgs)
    const isExceptionPath = location.pathname.startsWith('/onboarding') || 
                            location.pathname.startsWith('/select-org');

    if (isExceptionPath) {
        return;
    }

    // 3. Strict Multi-Tenancy Check
    // Type assertion for session extended by organization plugin
    if (!(session.session as any).activeOrganizationId) {
        // Fetch user's organizations
        const { data: orgs } = await authClient.organization.list();
        
        // A. No Organizations -> Onboarding
        if (!orgs || orgs.length === 0) {
            throw redirect({ to: '/onboarding' as any });
        }

        // B. Exact One -> Auto-Select & Proceed
        if (orgs.length === 1) {
             await authClient.organization.setActive({
                organizationId: orgs[0].id,
            });
            return; 
        }

        // C. Multiple -> Switcher
        throw redirect({ to: '/select-org' as any });
    }
  },
  component: AppLayout,
})

function AppLayout() {
  const { data: session } = authClient.useSession()

  const handleSignOut = async () => {
      await authClient.signOut();
      window.location.href = '/';
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-muted border-r p-4 hidden md:flex flex-col">
        <div className="font-bold text-xl mb-8">MyApp</div>
        <nav className="space-y-2 flex-1">
          <Link to="/users/me" className="flex items-center gap-2 p-2 rounded hover:bg-accent" activeProps={{ className: 'bg-accent' }}>
            <User className="w-4 h-4" />
            Profile
          </Link>
          {/* Add more domain links here */}
        </nav>
        <div className="border-t pt-4">
            <div className="text-sm font-medium mb-2">{session?.user?.name}</div>
            <Button variant="outline" size="sm" className="w-full" onClick={handleSignOut}>
                Sign Out
            </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}
