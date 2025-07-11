import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// Define the user data without relying on Prisma types
const userData = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        {
          title: "Join the Prisma Discord",
          content: "https://pris.ly/discord",
          published: true,
        },
        {
          title: "Prisma on YouTube",
          content: "https://pris.ly/youtube",
        },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    posts: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          content: "https://www.twitter.com/prisma",
          published: true,
        },
      ],
    },
  },
];

export async function main() {
  try {
    console.log(`Start seeding ...`);
    
    for (const u of userData) {
      const user = await prisma.user.create({ data: u });
      console.log(`Created user with id: ${user.id}`);
    }
    
    console.log(`Seeding finished.`);
  } catch (error) {
    console.error(`Error seeding database:`, error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
