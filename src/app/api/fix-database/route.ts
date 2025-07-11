import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client/edge';

// This is a temporary API route to fix database schema issues
export async function GET() {
  const prisma = new PrismaClient();
  
  try {
    // Check if Project table exists
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'Project'
    `;
    
    let message = '';
    
    if (Array.isArray(tables) && tables.length === 0) {
      message += 'Project table does not exist. Creating it...\n';
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
      
      if (Array.isArray(columns) && columns.length === 0) {
        message += 'userId column does not exist. Adding it...\n';
        await prisma.$executeRaw`
          ALTER TABLE "Project" ADD COLUMN "userId" TEXT NOT NULL DEFAULT ''
        `;
      } else {
        message += 'userId column already exists.\n';
      }
    }
    
    message += 'Database fix completed successfully.';
    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error('Error fixing database:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
