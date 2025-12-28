import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Link, useRouter } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_authed/admin/organizations/new')({
  component: CreateOrganization,
})

function CreateOrganization() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    await authClient.organization.create({
        name,
        slug,
    }, {
        onSuccess: async () => {
             // 1. Force the active org to the new one
             // Note: BetterAuth usually sets it automatically on create, but we can be explicit if needed.
             // 2. Redirect to Dashboard
             await router.invalidate()
             window.location.href = "/admin/organizations"
        },
        onError: (ctx) => {
            setError(ctx.error.message)
            setLoading(false)
        }
    })
  }

  return (
      <div className="p-6 flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-sm">

            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold">Create Organization</h1>
                <p className="text-sm text-muted-foreground">Provision a new tenant environment.</p>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Organization Name</label>
                    <input
                        id="name"
                        type="text"
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Acme Corp"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            // Auto-generate slug
                            setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'))
                        }}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="slug" className="text-sm font-medium">URL Slug</label>
                    <input
                        id="slug"
                        type="text"
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                    />
                </div>

                {error && (
                    <div className="text-sm text-destructive font-medium">
                        Error: {error}
                    </div>
                )}

                <div className="flex gap-4 pt-4">
                    <Button variant="outline" type="button" asChild className="w-full">
                        <Link to="/dashboard">Cancel</Link>
                    </Button>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Organization'}
                    </Button>
                </div>
            </form>
          </div>
      </div>
  )
}
