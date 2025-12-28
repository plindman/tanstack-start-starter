import { Link, useRouter } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Menu, LayoutDashboard, Settings, User as UserIcon } from "lucide-react"
import { appConfig } from '@/lib/config'

export function AppHeader() {
  const { data: session } = authClient.useSession()
  const router = useRouter()

  const handleSignOut = async () => {
      await authClient.signOut({
          fetchOptions: {
              onSuccess: () => {
                  router.invalidate()
                  window.location.href = "/"
              }
          }
      })
  }

  return (
    <div className="flex h-14 items-center justify-between">
      {/* Brand Identity - Logo and App Name from config */}
      <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-2 font-bold">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">
                    {appConfig.name.slice(0, 2).toUpperCase()}
                </div>
                <span>{appConfig.name}</span>
            </Link>

            {/* Primary Navigation - Visible on large screens when authenticated */}
            {session && (
                <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-muted-foreground">
                    <Link to="/dashboard" activeProps={{ className: "text-primary" }}>Dashboard</Link>
                </nav>
            )}
        </div>

        <div className="flex items-center gap-4">
            {session ? (
                <>
                   {/* Authenticated: Hamburger Menu (unified interface) */}
                   <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {/* User Identity */}
                            <DropdownMenuLabel>
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            {/* Navigation - Visible on small screens */}
                            <DropdownMenuItem asChild className="md:hidden">
                                <Link to="/dashboard" className="cursor-pointer">
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    <span>Dashboard</span>
                                </Link>
                            </DropdownMenuItem>

                            {/* User Actions */}
                            <DropdownMenuItem asChild>
                                <Link to="/users/me" className="cursor-pointer">
                                    <UserIcon className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </Link>
                            </DropdownMenuItem>

                            {/* Admin Link */}
                            {session.user.role === 'admin' && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link to="/admin" className="cursor-pointer">
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>System Admin</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </>
                            )}

                            <DropdownMenuSeparator />
                            {/* Theme Toggle Placeholder */}
                            <DropdownMenuItem disabled>
                                <span className="mr-2 h-4 w-4">🎨</span>
                                <span>Theme: System</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Sign out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                   </DropdownMenu>
                </>
            ) : (
                <>
                    {/* Public: Single Login Link */}
                    <Button variant="ghost" asChild size="sm">
                        <Link to="/login">Login</Link>
                    </Button>
                </>
            )}
        </div>
    </div>
  )
}
