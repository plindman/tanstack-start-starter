import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/select-org')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/select-org"!</div>
}
