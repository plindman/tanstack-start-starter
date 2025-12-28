import { createFileRoute, redirect } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'

/**
 * Navigation Dispatcher
 *
 * Responsibility: Determine the best "Home" for a user.
 * Entry Points: Landing Page ("Enter App") and Login Success (no redirect param).
 *
 * Logic Priority (Organization Membership overrides Admin default):
 * 1. Multiple Organizations: Redirect to /select-org
 * 2. Single Organization: setActive -> Redirect to /dashboard
 * 3. Zero Organizations:
 *    - If Admin: Redirect to /admin (System Admin Dashboard)
 *    - If User: Redirect to /access-denied (Invite Only)
 */
export const Route = createFileRoute('/_authed/app-entry')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession()

    if (!session) {
      throw redirect({ to: '/login' })
    }

    // Fetch user's organizations
    const { data: orgs } = await authClient.organization.list()

    // Priority 1: Multiple Organizations -> Selection Screen
    if (orgs && orgs.length > 1) {
      throw redirect({ to: '/select-org' as any })
    }

    // Priority 2: Single Organization -> Auto-Select & Proceed
    if (orgs && orgs.length === 1) {
      await authClient.organization.setActive({
        organizationId: orgs[0].id,
      })
      throw redirect({ to: '/dashboard' })
    }

    // Priority 3: Zero Organizations
    // 3a. System Admins go to Admin Dashboard
    if (session.user.role === 'admin') {
      throw redirect({ to: '/admin' as any })
    }

    // 3b. Regular Users get Access Denied (Invite Only)
    throw redirect({ to: '/access-denied' })
  },
  component: () => null, // This route should never render, always redirects
})
