import { createAuthClient } from "better-auth/react";
import { adminClient, organizationClient } from "better-auth/client/plugins";
// import { env } from "@/env";

export const authClient = createAuthClient({
  // baseURL: "http://localhost:3000" 
  plugins: [
    adminClient(),
    organizationClient()
  ]
});

/**
 * Exported authClient methods:
 * - useSession: Hook to get the current session state
 * - signIn: Methods to sign in (e.g. .email, .social)
 * - signUp: Methods to sign up
 * - signOut: Method to sign out
 * - organization: Methods to manage organizations
 * - admin: Methods to manage admin tasks
 */
