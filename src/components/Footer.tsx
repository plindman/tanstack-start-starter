import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto p-8 grid md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">
              TS
            </div>
            TanStack Starter
          </div>
          <p className="text-sm text-muted-foreground">
            A modern starter template for building robust web applications with TanStack technologies.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><span className="text-muted-foreground/50 cursor-not-allowed">Demo</span></li>
          </ul>
        </div>

        <div>
           <h3 className="font-semibold mb-4">Resources</h3>
           <ul className="space-y-2 text-sm text-muted-foreground">
             <li><span className="text-muted-foreground/50 cursor-not-allowed">Documentation</span></li>
             <li><span className="text-muted-foreground/50 cursor-not-allowed">Blog</span></li>
             <li><a href="https://github.com/tanstack/router" target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a></li>
           </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/legal" className="hover:text-foreground">Privacy Policy</Link></li>
            <li><Link to="/legal" className="hover:text-foreground">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} TanStack Start Starter. All rights reserved.
      </div>
    </footer>
  )
}
