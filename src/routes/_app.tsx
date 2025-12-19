import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'
import Header from '@/components/Header'
import { authClient } from '@/lib/auth-client'
import { useEffect } from 'react'

export const Route = createFileRoute('/_app')({
  component: AppLayout,
})

function AppLayout() {
  const { data: session, isPending } = authClient.useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isPending && !session) {
      navigate({ to: '/login' })
    }
  }, [session, isPending, navigate])

  if (isPending) {
    return <div>Loading...</div>
  }

  // Prevent flash of content before redirect
  if (!session) {
    return null 
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}