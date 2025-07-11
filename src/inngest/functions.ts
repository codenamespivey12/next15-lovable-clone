import { inngest } from "./client";
import { Sandbox } from "@e2b/code-interpreter";
import { PROMPT } from "../prompt";
import { prisma } from "@/lib/db";
import { generateWithContext7 } from "../lib/openai";

export const codeAgentFunction = inngest.createFunction(
  { id: "code-agent" },
  { event: "code-agent/run" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("lovableclone-test16");
      return sandbox.sandboxId;
    });

    // Get the prompt and project ID from the event
    const { value: prompt, projectId } = event.data;

    // Run the OpenAI agent with the prompt and Context7
    const agentResponse = await step.run("run-openai-agent", async () => {
      return await generateWithContext7(prompt, PROMPT);
    });

    // Store the response in the database
    await step.run("store-response", async () => {
      await prisma.message.create({
        data: {
          projectId,
          content: agentResponse,
          role: "ASSISTANT",
          type: "RESULT",
        },
      });
    });

    return { success: true, response: agentResponse };
  }
);
