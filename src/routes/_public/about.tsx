import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg text-muted-foreground">
        We are building the future of web development with TanStack Start.
      </p>
    </div>
  )
}
