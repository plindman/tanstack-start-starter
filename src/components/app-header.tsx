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
import { LogOut, User, Settings, LayoutDashboard } from "lucide-react"

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-2 font-bold">
                <span>MyApp</span>
            </Link>
            
            {/* Global Navigation - Persistent */}
            <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                <Link to="/about" activeProps={{ className: "text-primary" }}>About</Link>
            </nav>
        </div>

        <div className="flex items-center gap-4">
            {session ? (
                <>
                   {/* Authenticated Controls */}
                   <Button variant="ghost" asChild size="sm">
                        <Link to="/dashboard">Dashboard</Link>
                   </Button>
                   
                   <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <User className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link to="/dashboard" className="cursor-pointer">
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    <span>Dashboard</span>
                                </Link>
                            </DropdownMenuItem>
                             <DropdownMenuItem asChild>
                                <Link to="/users/me" className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </Link>
                            </DropdownMenuItem>
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
                            <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Sign out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                   </DropdownMenu>
                </>
            ) : (
                <>
                    {/* Guest Controls */}
                    <div className="flex items-center gap-2">
                         <Button variant="ghost" asChild size="sm">
                            <Link to="/login">Sign In</Link>
                        </Button>
                        <Button asChild size="sm">
                            <Link to="/signup">Get Started</Link>
                        </Button>
                    </div>
                </>
            )}
        </div>
      </div>
    </header>
  )
}
