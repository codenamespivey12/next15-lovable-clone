const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Checking database schema...');
    
    // Check if Project table exists
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'Project'
    `;
    
    if (tables.length === 0) {
      console.log('Project table does not exist. Creating it...');
      await prisma.$executeRaw`
        CREATE TABLE "Project" (
          "id" TEXT NOT NULL,
          "name" TEXT NOT NULL,
          "userId" TEXT NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL,
          CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
        )
      `;
    } else {
      // Check if userId column exists
      const columns = await prisma.$queryRaw`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'Project' 
        AND column_name = 'userId'
      `;
      
      if (columns.length === 0) {
        console.log('userId column does not exist. Adding it...');
        await prisma.$executeRaw`
          ALTER TABLE "Project" ADD COLUMN "userId" TEXT NOT NULL DEFAULT ''
        `;
      } else {
        console.log('userId column already exists.');
      }
    }
    
    console.log('Database fix completed successfully.');
  } catch (error) {
    console.error('Error fixing database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();