import { createFileRoute } from '@tanstack/react-router'
import { AppContainer } from '@/components/AppContainer'

export const Route = createFileRoute('/access-denied')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppContainer>
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground mt-2">You do not have permission to view this page.</p>
        </div>
      </div>
    </AppContainer>
  )
}
