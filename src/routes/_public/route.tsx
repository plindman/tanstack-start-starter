import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
})

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
       {/* Placeholder for Navbar */}
       <header className="p-4 border-b">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="font-bold">Brand</div>
          <div className="flex gap-4">
             {/* Links will go here */}
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="p-4 border-t text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Brand. All rights reserved.
      </footer>
    </div>
  )
}
