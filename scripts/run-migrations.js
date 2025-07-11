const { execSync } = require('child_process');

try {
  // Generate Prisma client
  console.log('Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Create migration
  console.log('Creating migration...');
  execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
  
  console.log('Migration completed successfully');
} catch (error) {
  console.error('Error running migrations:', error);
  process.exit(1);
}