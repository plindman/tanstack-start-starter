import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { Link } from '@tanstack/react-router'
import { User } from 'lucide-react'

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
  const { data: session } = authClient.useSession()

  return (
    <div className="flex flex-1">
      {/* Sidebar */}
      <aside className="w-64 bg-muted/30 border-r p-4 hidden md:flex flex-col">
        {/* Header moved to Global Shell, so we can remove strict branding here if desired, or keep "Context" title */}
        <div className="font-bold text-xl mb-8 px-2">Workspace</div>
        <nav className="space-y-2 flex-1">
          <Link to="/dashboard" className="flex items-center gap-2 p-2 rounded hover:bg-accent" activeProps={{ className: 'bg-accent' }}>
            <User className="w-4 h-4" />
            Dashboard
          </Link>
          <Link to="/users/me" className="flex items-center gap-2 p-2 rounded hover:bg-accent" activeProps={{ className: 'bg-accent' }}>
            <User className="w-4 h-4" />
            Profile
          </Link>
          {session?.user.role === 'admin' && (
              <>
                <div className="pt-4 pb-2">
                    <h4 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Admin</h4>
                </div>
                <Link to="/admin" className="flex items-center gap-2 p-2 rounded hover:bg-accent" activeProps={{ className: 'bg-accent' }}>
                    <User className="w-4 h-4" />
                    System
                </Link>
              </>
          )}
        </nav>
        {/* Sign Out logic is also available in Global Header, but keeping it here for mobile/accessibility isn't bad. 
            However, user wants "Global Shell", so sidebar might be secondary. We'll leave it for now. */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-muted/10">
        <Outlet />
      </main>
    </div>
  )
}
