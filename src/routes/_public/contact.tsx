import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/contact')({
  component: ContactPage,
})

function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg text-muted-foreground">
        Get in touch with us at hello@example.com.
      </p>
    </div>
  )
}
