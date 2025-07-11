import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Try to query the database
    await prisma.$queryRaw`SELECT 1`;
    
    // List all tables in the database
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    return NextResponse.json({ 
      status: 'connected',
      tables
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'error',
      message: error.message
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}