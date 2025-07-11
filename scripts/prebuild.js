const { execSync } = require('child_process');

try {
  console.log('Running Prisma generate...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Prisma client generated successfully');
} catch (error) {
  console.error('Error generating Prisma client:', error);
  // Don't exit with error code to allow build to continue
}