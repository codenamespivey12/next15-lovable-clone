import { Prisma, PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

const projectData: Prisma.ProjectCreateInput[] = [
  {
    name: "Sample Project 1",
    userId: "user_123",
    messages: {
      create: [
        {
          content: "Hello, this is a test message",
          role: "USER",
          type: "RESULT",
        },
        {
          content: "This is a response message",
          role: "ASSISTANT",
          type: "RESULT",
        },
      ],
    },
  },
  {
    name: "Sample Project 2",
    userId: "user_456",
    messages: {
      create: [
        {
          content: "Another test message",
          role: "USER",
          type: "RESULT",
        },
      ],
    },
  },
];

export async function main() {
  for (const p of projectData) {
    await prisma.project.create({ data: p });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
