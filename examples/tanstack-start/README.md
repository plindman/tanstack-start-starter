# TanStack Start Pattern Gallery

This project serves as a reference for best practices and common patterns when building with **TanStack Start**.

## 🚀 Patterns Overview

We have isolated key concepts into standalone guides to help you understand how to structure your application:

1.  **[Routing Layouts](./patterns/01-routing-layouts/README.md)**
    *   Comparison of Nested Layouts vs. Directory Routes.
    *   When to use `_layout.tsx` vs `folder/route.tsx`.

2.  **[Auth Guards](./patterns/02-auth-guards/README.md)**
    *   Protecting UI routes with `beforeLoad`.
    *   Protecting data with Server Middleware.

## 🛠 Running the Reference App

The `/app` directory contains a minimal, working implementation of these patterns.

```bash
cd examples/tanstack-start
npm install
npm run dev
```

The reference app demonstrates:
- A public landing page at `/`.
- An authenticated layout at `/_app`.
- A login/signup layout at `/_auth`.
- Route protection using `beforeLoad`.
