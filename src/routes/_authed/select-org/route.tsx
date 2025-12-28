import { createFileRoute, useRouter } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Building2, Plus } from 'lucide-react'

export const Route = createFileRoute('/_authed/select-org')({
  component: SelectOrganization,
})

function SelectOrganization() {
  const router = useRouter()
  const { data: orgs } = authClient.useListOrganizations()
  const { data: session } = authClient.useSession()

  const handleSelect = async (orgId: string) => {
    await authClient.organization.setActive({
        organizationId: orgId
    }, {
        onSuccess: async () => {
            await router.invalidate()
            window.location.href = "/dashboard"
        }
    })
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold">Select Organization</CardTitle>
            <CardDescription>Choose a workspace to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2">
                {orgs?.map((org) => (
                    <Button 
                        key={org.id} 
                        variant="outline" 
                        className="h-16 justify-between px-4 hover:border-primary/50 hover:bg-accent/50 transition-all"
                        onClick={() => handleSelect(org.id)}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Building2 className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="font-semibold text-base">{org.name}</span>
                                <span className="text-xs text-muted-foreground">{org.slug}</span>
                            </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Button>
                ))}
            </div>
            
            {(!orgs || orgs.length === 0) && (
                <div className="text-center p-8 border-2 border-dashed rounded-lg text-muted-foreground">
                    No organizations found.
                </div>
            )}

            {session?.user.role === 'admin' && (
                <div className="pt-4 border-t">
                    <Button variant="ghost" className="w-full gap-2 text-muted-foreground hover:text-foreground" onClick={() => window.location.href = '/admin/organizations/new'}>
                        <Plus className="h-4 w-4" />
                        Create New Organization
                    </Button>
                </div>
            )}
        </CardContent>
      </Card>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <span className="opacity-60">Signed in as</span> <span className="font-medium text-foreground">{session?.user.email}</span>
      </div>
    </div>
  )
}
