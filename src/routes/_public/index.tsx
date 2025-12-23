import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, LayoutDashboard, Lock } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/_public/')({
  component: LandingPage,
})

function LandingPage() {
  const { data: session } = authClient.useSession()

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 space-y-8">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Build Faster with <span className="text-primary">TanStack Start</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            A production-ready starter template featuring TanStack Router, Shadcn UI, and Better Auth.
            Secure, scalable, and type-safe.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {session ? (
            <Link to="/users/me">
              <Button size="lg" className="gap-2">
                Go to Profile <LayoutDashboard className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<Lock className="w-10 h-10 text-primary" />}
          title="Authentication"
          description="Pre-configured with Better Auth. Secure login, registration, and session management out of the box."
        />
        <FeatureCard 
          icon={<LayoutDashboard className="w-10 h-10 text-primary" />}
          title="Domain Modules"
          description="Scalable architecture with distinct Public, Auth, and Application layers."
        />
        <FeatureCard 
          icon={<ArrowRight className="w-10 h-10 text-primary" />}
          title="Type-Safe Routing"
          description="Leverage the full power of TanStack Router for 100% type-safe navigation and data fetching."
        />
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
