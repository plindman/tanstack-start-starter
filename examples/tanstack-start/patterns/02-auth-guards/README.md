# Auth Guard Patterns

Protecting routes is a core requirement for most applications. TanStack Router provides a native way to handle this that works seamlessly across both SSR and CSR.

## 1. The `beforeLoad` Guard (View Protection)

The `beforeLoad` hook is the recommended way to protect UI routes. It runs before the route component is loaded or rendered, allowing for instant redirects.

### Why `beforeLoad`?
- **No FOUC:** Prevents the "Flash of Unstyled Content" because the redirect happens before the component even starts rendering.
- **Type-Safe:** You can pass data (like the user session) from `beforeLoad` down to the component via `context`.

### Example Implementation

```tsx
// src/routes/_app.tsx (Layout Guard)
import { createFileRoute, redirect } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ location }) => {
    // Check session
    const { data } = await authClient.getSession()
    
    if (!data?.session) {
      // Throwing a redirect cancels the load and changes the URL
      throw redirect({
        to: '/login',
        search: {
          // Pass the current URL to redirect back after login
          redirect: location.href,
        },
      })
    }
  },
})
```

---

## 2. Server Middleware (Data Protection)

While `beforeLoad` protects the **UI**, you must still protect your **Data**. This is done using server middleware on your Server Functions or API endpoints.

### Example Implementation

```tsx
// src/middleware/auth.ts
import { createMiddleware } from "@tanstack/react-start"
import { auth } from "@/lib/auth"

export const authMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) {
      throw new Error("Unauthorized")
    }
    // Pass session to the server function context
    return await next({ context: { session } })
  }
)

// Usage in a Server Function
export const getDashboardData = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
     // Access authenticated session via context
     return { data: '...' }
  })
```

## Summary
- Use **`beforeLoad`** in your layout routes to protect the **UI**.
- Use **Middleware** in your server functions to protect the **Data**.
