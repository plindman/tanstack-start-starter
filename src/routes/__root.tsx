import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
  notFoundComponent: () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">404 - Page Not Found</h1>
    </div>
  ),
})

import { AppHeader } from '@/components/AppHeader'
import { AppFooter } from '@/components/AppFooter'

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="flex min-h-screen flex-col font-sans antialiased">
          {/* Header Pillar: Full-bleed frame -> Centered wrapper -> AppHeader */}
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <AppHeader />
            </div>
          </header>

          {/* Content Pillar: Full-width main frame -> Centered wrapper -> Page content */}
          <main className="flex-1 flex flex-col">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 w-full">
              {children}
            </div>
          </main>

          {/* Footer Pillar: Full-width footer frame -> Centered wrapper -> AppFooter */}
          <footer className="border-t bg-muted/40 py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <AppFooter />
            </div>
          </footer>
        </div>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
