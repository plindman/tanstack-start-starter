# Design System & Implementation Guide

## Overview
This application uses a modern, component-based design system built with:
- **Tailwind CSS** for comprehensive styling
- **Shadcn/ui** for accessible, reusable UI components
- **TanStack Router** for seamless routing and layout management

## Layout Structure
The application employs two primary layout strategies based on user authentication state.

### 1. Public Layout
Used for landing pages, marketing content, and authentication flows.
- **File**: `src/routes/_public/route.tsx`
- **Structure**:
  ```tsx
  <div className="flex flex-col min-h-screen">
    <Header />  {/* Common Top Navigation */}
    <main className="flex-1">
      <Outlet /> {/* Page Content */}
    </main>
    <Footer />  {/* Common Footer */}
  </div>
  ```
- **Components**:
  - `Header` (`src/components/Header.tsx`): Contains logo, navigation, and login/auth status.
  - `Footer` (`src/components/Footer.tsx`): Contains copyright, links, and branding.

### 2. Authenticated Layout
Used for the dashboard and logged-in user experiences.
- **File**: `src/routes/_authed/route.tsx`
- **Structure**:
  - **Sidebar**: Left-side navigation for domain-specific features.
  - **Main Area**: Top bar (optional) and main content area.
  - **Authentication**: Wraps content with session checks.

## Styling & Theming
- **Global Styles**: Defined in `src/styles.css`.
- **Colors**: configuration uses CSS variables (e.g., `--primary`, `--muted`) enabling dark mode support.
- **Typography**: Defaults to system sans-serif fonts, styled via Tailwind utility classes.

### Common Utility Classes
- **Colors**: `bg-background`, `text-foreground`, `text-muted-foreground`.
- **Spacing**: Standard Tailwind spacing (e.g., `p-4`, `m-4`, `gap-4`).
- **Flexbox**: extensively used for layout (e.g., `flex`, `items-center`, `justify-between`).

## Component Usage

### Header
The `Header` component automatically handles the authentication state display (Login vs User Profile).
```tsx
import Header from '@/components/Header'

// Usage
<Header />
```

### Footer
The `Footer` component provides consistent branding and navigation links at the bottom of public pages.
```tsx
import { Footer } from '@/components/Footer'

// Usage
<Footer />
```

### UI Components
Reusable UI components (Buttons, Inputs, etc.) are located in `src/components/ui` and should be used to maintain consistency.

## Component Configuration

Some components, like the `Footer`, are designed to be "Configuration Driven". This allows content and behavior to be modified without altering the component's source code.

### Pattern: Default + Override
- **Default Config**: `src/config/[component].default.ts` (Do not edit)
- **User Config**: Create `src/config/[component].local.ts` (Gitignored, use for overrides)
- **Accessor**: `src/lib/config.ts` (Components import from here)

Example: To change the Footer copyright or links, create `src/config/footer.local.ts` and export a partial config.

## Adding New Routes
1. **Public Route**: Create under `src/routes/_public` or ensure it inherits the `_public` layout.
2. **Authenticated Route**: Create under `src/routes/_authed` to automatically inherit the Sidebar layout and auth protection.
