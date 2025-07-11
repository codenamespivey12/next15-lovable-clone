const { execSync } = require('child_process');

try {
  console.log('Running Prisma migrations...');
  
  // Deploy migrations to the database
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  
  console.log('Migrations completed successfully');
} catch (error) {
  console.error('Error running migrations:', error);
  process.exit(1);
}