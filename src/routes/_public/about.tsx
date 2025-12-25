import { createFileRoute } from '@tanstack/react-router'
import { AboutContent } from '@/lib/content'

export const Route = createFileRoute('/_public/about')({
  component: AboutPage,
})

function AboutPage() {
  return <AboutContent />
}
