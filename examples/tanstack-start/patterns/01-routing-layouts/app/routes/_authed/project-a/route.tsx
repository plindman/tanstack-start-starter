import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/project-a')({
  component: () => (
    <div className="border p-4 rounded-lg">
        <h2 className="font-semibold mb-4 text-sm uppercase text-muted-foreground">Domain: Project A</h2>
        <Outlet />
    </div>
  ),
})
