import { inngest } from "@/inngest/client";
import { codeAgentFunction } from "@/inngest/functions";
import { serve } from "inngest/next";

// Create an API that serves the functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    codeAgentFunction,
  ],
  // Explicitly pass the signing key for authentication
  signingKey: process.env.INNGEST_SIGNING_KEY,
});
