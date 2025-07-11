import { Inngest } from 'inngest';

// Create a client with your API key
export const inngest = new Inngest({ 
  id: 'my-app',
  // Optional: If you have an Inngest API key
  // apiKey: process.env.INNGEST_API_KEY
});
