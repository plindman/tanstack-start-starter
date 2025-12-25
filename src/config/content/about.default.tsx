
export function AboutContent() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg text-muted-foreground mb-4">
        We are building the future of web development with TanStack Start.
      </p>
      <p className="text-muted-foreground">
        (This content is configurable. Override it by creating <code>src/config/content/about.local.tsx</code>)
      </p>
    </div>
  )
}
