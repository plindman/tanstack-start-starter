import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/magic-link')({
  component: MagicLinkPage,
})

function MagicLinkPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Sign in with Magic Link</h1>
      <p>Add new authentication methods or custom flows in this group.</p>
      {/* Form implementation */}
    </div>
  )
}
