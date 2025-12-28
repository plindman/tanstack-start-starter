import { Link } from '@tanstack/react-router'
import { footerConfig, appConfig } from '@/lib/config'

export function AppFooter() {
  const year = new Date().getFullYear().toString()
  const copyrightText = footerConfig.copyright
    .replace('{year}', year)
    .replace('{appName}', appConfig.name)

  // Flatten all items from all sections into a single list
  const allLinks = footerConfig.sections.flatMap(section => section.items)

  return (
    <footer className="border-t bg-muted/40 py-6">
      <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Copyright info on the left */}
        <p className="text-sm text-muted-foreground">
          {copyrightText}
        </p>

        {/* Flat list of legal/info links on the right */}
        <div className="flex gap-4 text-sm text-muted-foreground">
          {allLinks.map((item) => (
            <div key={item.label}>
              {item.to ? (
                <Link to={item.to} className="hover:underline">
                  {item.label}
                </Link>
              ) : item.href ? (
                <a
                  href={item.href}
                  target={item.target || '_blank'}
                  rel={item.rel || 'noreferrer'}
                  className="hover:underline"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-muted-foreground/50 cursor-not-allowed">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
