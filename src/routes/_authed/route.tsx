import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { LayoutDashboard, User } from 'lucide-react'

export const Route = createFileRoute('/_authed')({
  beforeLoad: async ({ context }) => {
    // This is a simplified check. In a real app, you might want to verify session validity via API or context
    const { data: session } = await authClient.getSession()
    if (!session) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
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
