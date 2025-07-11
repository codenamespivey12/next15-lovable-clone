import { inngest } from './client';
import { prisma } from '@/lib/db';

// Define your functions here
export const helloWorld = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello.world' },
  async ({ event, step }) => {
    await step.sleep('wait-a-moment', '1s');
    return { message: `Hello ${event.data.name}!` };
  }
);

// Add the missing codeAgentFunction
export const codeAgentFunction = inngest.createFunction(
  { id: 'code-agent' },
  { event: 'code/agent.run' },
  async ({ event, step }) => {
    await step.sleep('wait-a-moment', '1s');
    return { message: `Code agent processed: ${event.data.query || 'No query provided'}` };
  }
);

// Add more functions as needed
