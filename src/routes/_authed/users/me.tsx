import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/_authed/users/me')({
  component: UserProfilePage,
})

function UserProfilePage() {
  const { data: session } = authClient.useSession()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <Card>
        <CardHeader>
            <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <div>
                <span className="font-semibold">Name:</span> {session?.user?.name}
            </div>
            <div>
                <span className="font-semibold">Email:</span> {session?.user?.email}
            </div>
             <div>
                <span className="font-semibold">ID:</span> {session?.user?.id}
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
