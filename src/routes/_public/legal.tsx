import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/legal')({
  component: LegalPage,
})

function LegalPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">Legal</h1>
      <div className="prose dark:prose-invert">
        <h2>Terms of Service</h2>
        <p>Your terms go here...</p>
        <h2>Privacy Policy</h2>
        <p>Your privacy policy goes here...</p>
      </div>
    </div>
  )
}
