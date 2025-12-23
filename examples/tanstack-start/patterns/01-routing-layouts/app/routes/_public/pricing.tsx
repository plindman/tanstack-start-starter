import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/pricing')({
  component: PricingPage,
})

function PricingPage() {
  return (
    <div className="py-12 text-center">
      <h1 className="text-4xl font-bold">Pricing Plans</h1>
      <p className="mt-4">Extend your public site by adding new marketing pages here.</p>
    </div>
  )
}
