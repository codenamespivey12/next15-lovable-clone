import { inngest } from "@/inngest/client";
import { db } from "@/lib/db";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { generateSlug } from "random-word-slugs";
import { TRPCError } from "@trpc/server";


export const projectsRouter = createTRPCRouter({
  
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, { message: "Id is required" }),
      })
    )
    .query(async ({ input, ctx }) => {
      const existingProject = await db.project.findUnique({
        where: {
          id: input.id,
          userId: ctx.auth.userId,
        }
      })

      if (!existingProject) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });
      }

      return existingProject;
    }),

  getMany: protectedProcedure
    .query(async ({ ctx }) => {
      const projects = await db.project.findMany({
        where:{
          userId: ctx.auth.userId,
        },
        orderBy: {
          updatedAt: "desc"
        }
      })

      return projects;
    }),

  create: protectedProcedure
    .input(
      z.object({
        value: z.string()
          .min(1, { message: "Prompt value is required" })
          .max(10000, { message: "Prompt value is too long" }),
      }),
    )
    .mutation(async({ input, ctx }) => {
      const createdProject = await db.project.create({
        data: {
          userId: ctx.auth.userId,
          name: generateSlug(2, {
            format: "kebab",
          }),
          messages: {
            create: {
              content: input.value,
              role: "USER",
              type: "RESULT",
            }
          }
        }
      })

      // Send Inngest event for code generation
      try {
        await inngest.send({
          name: "code-agent/run",
          data: {
            value: input.value,
            projectId: createdProject.id
          }
        })
        console.log("Inngest event sent successfully");
      } catch (error) {
        console.error("Inngest error:", error);
        // For now, continue without throwing to allow project creation
        // TODO: Fix Inngest authentication keys in Vercel
      }

      return createdProject;
    })
})
