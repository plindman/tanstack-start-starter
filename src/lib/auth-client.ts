import { createAuthClient } from "better-auth/react";
// import { env } from "@/env";

export const authClient = createAuthClient({
   /** The base URL of the server (optional if you're using the same domain) */
  // baseURL:  "http://localhost:3000" // env.VITE_AUTH_URL,
});

/**
 * Exported authClient methods:
 * - useSession: Hook to get the current session state
 * - signIn: Methods to sign in (e.g. .email, .social)
 * - signUp: Methods to sign up
 * - signOut: Method to sign out
 */