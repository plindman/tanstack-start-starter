import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/project-a/list')({
  component: ProjectListPage,
})

function ProjectListPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Projects</h1>
      <p>List of resources for this domain.</p>
    </div>
  )
}
