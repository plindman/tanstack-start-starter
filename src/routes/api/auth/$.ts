import { createFileRoute } from '@tanstack/react-router';
import { auth } from "@/lib/auth";

export const Route = createFileRoute('/api/auth/$')({
  server: {
    loader: async ({ request }) => {
      return auth.handler(request);
    },
    action: async ({ request }) => {
      return auth.handler(request);
    },
  },
});