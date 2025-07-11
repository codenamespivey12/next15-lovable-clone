import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ 
  id: "lovable-clone",
  // Add the event key from environment variable
  eventKey: process.env.INNGEST_EVENT_KEY || "dev", // Fallback to "dev" for development
});
