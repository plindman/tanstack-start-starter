import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { auth } from "@/lib/auth";

export const authMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      throw redirect({ to: "/login" });
    }

    // Strict Multi-Tenancy Enforcement
    if (!session.session.activeOrganizationId) {
        // EXCEPTION: System Admins can access without an active org (System Mode)
        if (session.user.role === "admin") {
             return await next({ context: { session } });
        }

        // Fetch user's organizations
        const orgs = await auth.api.listOrganizations({ 
            headers: request.headers 
        });

        // 1. No Organizations -> Onboarding (Create Org)
        if (!orgs || orgs.length === 0) {
            throw redirect({ to: "/onboarding" as any });
        }

        // 2. Exact One Organization -> Auto-Select
        if (orgs.length === 1) {
            const orgId = orgs[0].id;
             await auth.api.setActiveOrganization({
                headers: request.headers,
                body: { organizationId: orgId }
            });
            // Re-fetch session with new active org
            const updatedSession = await auth.api.getSession({ headers: request.headers });
            return await next({ context: { session: updatedSession } });
        }

        // 3. Multiple Organizations -> Selector
        throw redirect({ to: "/select-org" as any });
    }

    return await next({ context: { session } });
  }
);
