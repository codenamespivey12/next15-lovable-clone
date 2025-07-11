import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "lovable-clone",
  // Use the event key from environment variables
  eventKey: process.env.INNGEST_EVENT_KEY || "dev",
  // Configure for local development
  ...(process.env.NODE_ENV === "development" && {
    isDev: true,
    // Point to local dev server
    baseURL: "http://localhost:8288",
  }),
});
