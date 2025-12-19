import { Link, useNavigate } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export default function Header() {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      navigate({ to: '/login' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="p-4 flex items-center justify-between bg-background border-b shadow-sm">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
            TS
          </div>
          <span>TanStack Starter</span>
        </Link>
      </div>
      <div>
        {isPending ? (
          <div className="text-sm text-muted-foreground">Loading...</div>
        ) : session ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium hidden md:block">
              {session.user.email}
            </span>
            <Button
              variant="outline"
              onClick={handleLogout}
              size="sm"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/login">
            <Button size="sm">Login</Button>
          </Link>
        )}
      </div>
    </header>
  )
}
