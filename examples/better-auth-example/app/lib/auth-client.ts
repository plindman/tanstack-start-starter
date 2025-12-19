import { twoFactorClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: "http://localhost:3000",
	plugins: [twoFactorClient()],
});

/**
 * Exported authClient methods:
 * - useSession: Hook to get the current session state
 * - signIn: Methods to sign in (e.g. .email, .social)
 * - signUp: Methods to sign up
 * - signOut: Method to sign out
 * - twoFactor: Methods for two-factor authentication
 */
