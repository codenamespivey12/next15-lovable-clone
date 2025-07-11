const { PrismaClient } = require('@prisma/client');

async function checkDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Checking database connection...');
    
    // Try to query the database
    await prisma.$queryRaw`SELECT 1`;
    console.log('Database connection successful!');
    
    // List all tables in the database
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    console.log('Available tables:', tables);
    
    return { success: true, tables };
  } catch (error) {
    console.error('Database connection failed:', error);
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase()
  .then(result => {
    if (!result.success) {
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });