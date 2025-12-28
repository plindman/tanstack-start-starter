import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { Link } from '@tanstack/react-router'
import { Building2 } from 'lucide-react'

export const Route = createFileRoute('/_authed/admin')({
  beforeLoad: async ({ location }) => {
    // RBAC Protection: Only admins can access /admin routes
    const { data: session } = await authClient.getSession()
    if (!session) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
    if (session.user.role !== 'admin') {
      throw redirect({
        to: '/access-denied',
      })
    }
    // If admin, render <Outlet />
  },
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <div className="flex flex-1">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-muted/30 border-r p-4 hidden md:flex flex-col">
        {/* Header */}
        <div className="font-bold text-xl mb-8 px-2">System Admin</div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          <Link
            to="/admin"
            className="flex items-center gap-2 p-2 rounded hover:bg-accent"
            activeProps={{ className: 'bg-accent' }}
          >
            <Building2 className="w-4 h-4" />
            Admin
          </Link>
          <Link
            to="/admin/organizations"
            className="flex items-center gap-2 p-2 rounded hover:bg-accent"
            activeProps={{ className: 'bg-accent' }}
          >
            <Building2 className="w-4 h-4" />
            Organizations
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
