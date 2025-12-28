# Design System & Implementation Guide

## Overview
This application uses a modern, component-based design system built with:
- **Tailwind CSS** for comprehensive styling
- **Shadcn/ui** for accessible, reusable UI components
- **TanStack Router** for seamless routing and layout management

## Layout Structure
The application employs two primary layout strategies based on user authentication state.

### 1. Public Layout
Used for landing pages, marketing content, and authentication flows. It follows a standard vertical stack containing a top navigation bar, a flexible main content area, and a consistent footer.

### 2. Authenticated Layout
Used for the dashboard and tenant-specific application experiences. It provides a focused, full-width content area. 
- **Navigation**: Handled entirely via the Global Header (Top Nav + Hamburger).
- **Constraint**: This layout does **not** include a sidebar. Sidebars are reserved for zone-specific internal navigation (e.g., the System Admin area).
- **Protection**: Access is strictly managed by session-based authentication guards.

## Styling & Theming
- **Global Styles**: Centralized configuration for look and feel.
- **Colors**: Uses semantic variables to support flexible theming and dark mode.
- **Typography**: Employs clean, system-standard fonts optimized for readability.

### Common Utility Principles
The design relies on standard layout patterns (Flexbox, Grid) and a consistent spacing scale to ensure a cohesive and accessible user experience across all devices.

## Component Usage

### Header
The Header is a persistent top navigation bar that adapts to the user's authentication state.
- **Brand Identity**: The left side always features the application logo and name.
- **Public State**: When logged out, a single "Login" link is provided on the right.
- **Authenticated State**: When logged in, a Hamburger menu button is the primary interface for user-related actions.
  - **Large Screens**: Primary navigation (such as the Dashboard) is visible in the bar. The Hamburger menu contains the user's identity (email), profile and settings links, and a placeholder for a theme toggle.
  - **Small Screens**: Navigation links are moved into the Hamburger menu to maintain a clean layout.
  - **Constraint**: No separate user avatar dropdown or desktop-specific menus are used; the Hamburger menu is the unified interface for all authenticated actions.

### Footer
The Footer is a minimalist, single-row element at the bottom of the page.
- **Layout**: Features copyright information on the left and a flat list of secondary links (e.g., About, Legal) on the right.
- **Logic**: The content is entirely configuration-driven, allowing for easy updates to branding and links without modifying the layout logic.
- **Constraint**: Multi-column or complex marketing-style footers are avoided in favor of a clean, utility-focused design.

### UI Components
Reusable UI components are used throughout the application to maintain consistency and ensure accessibility standards are met.

## File Naming Conventions
To maintain a clear distinction between internal project logic and external or foundational components, the following naming conventions are applied:
- **Application-Specific Components**: Use **PascalCase** (e.g., `AppHeader.tsx`, `AppFooter.tsx`). This identifies project-level components that embody application business logic or specific shell structures.
- **UI Primitives / Library Components**: Use **kebab-case** (e.g., `button.tsx`, `dropdown-menu.tsx`). This follows the standard convention for shadcn/ui and other shared utility components.

## Component Configuration

Some components are designed to be configuration-driven, separating the content from the visual implementation. This allows behavior and links to be modified without altering the component's logic.

### Pattern: Default + Override
The system follows a strict file-based configuration pattern:
- **Default Config**: `src/config/[component].default.ts` — Contains the global baseline settings.
- **User Config**: `src/config/[component].local.ts` — An optional, git-ignored file used for environment or user-specific overrides.
- **Accessor**: `src/lib/config.ts` — The central utility that merges these files, which components import from.

Example: To change the Footer copyright or links, an override is defined in the local configuration file rather than modifying the footer component itself.

## Adding New Routes
1. **Public Route**: Create under `src/routes/_public` or ensure it inherits the `_public` layout.
2. **Authenticated Route**: Create under `src/routes/_authed` to automatically inherit the Sidebar layout and auth protection.
