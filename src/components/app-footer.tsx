import { Link } from '@tanstack/react-router'

export function AppFooter() {
  return (
    <footer className="border-t bg-muted/40 py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with <span className="font-semibold">TanStack Start</span>.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/legal" className="hover:underline">Legal</Link>
        </div>
      </div>
    </footer>
  )
}
