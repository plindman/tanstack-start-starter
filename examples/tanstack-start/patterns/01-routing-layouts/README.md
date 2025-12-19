# Routing Layout Patterns

In TanStack Router, there are two primary ways to define layouts that wrap a group of routes. Both are valid, but they serve different organizational preferences.

## 1. Nested Layout Pattern (File + Folder)

This is the most common and explicit pattern. You have a layout file (e.g., `_auth.tsx`) and a folder with the same name (`_auth/`) containing the child routes.

### Structure
```text
src/routes/
  _auth.tsx       <-- The Layout (Parent)
  _auth/          <-- The Children (Folder)
    login.tsx
    signup.tsx
```

### Example: `_auth.tsx` (The Layout)
```tsx
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: () => (
    <div className="layout-wrapper">
      <h1>Auth Layout</h1>
      <Outlet /> {/* Children render here */}
    </div>
  ),
})
```

---

## 2. Directory Route Pattern (co-located `route.tsx`)

This pattern keeps the layout code *inside* the directory it governs. This is useful for co-locating all logic for a feature in one place.

### Structure
```text
src/routes/
  dashboard/
    route.tsx     <-- The Layout (Parent)
    index.tsx     <-- Dashboard Home (/dashboard)
    settings.tsx  <-- Dashboard Settings (/dashboard/settings)
```

### Example: `dashboard/route.tsx`
```tsx
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: () => (
    <div className="sidebar-layout">
      <nav>Sidebar</nav>
      <Outlet />
    </div>
  ),
})
```

## When to use which?

| Pattern | Best For |
| :--- | :--- |
| **Nested Layout** | Pathless layouts (starting with `_`), shared UI across distinct pages, and standard project structures. |
| **Directory Route** | Feature-based organization where the layout is tightly coupled with its children. |
