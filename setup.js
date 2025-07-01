#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, copyFileSync } from 'fs';
import { join } from 'path';

console.log('🚀 Setting up Bytesweep File Manager...\n');

try {
  // Check if Node.js is installed
  console.log('📋 Checking prerequisites...');
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Node.js version: ${nodeVersion}`);

  // Install frontend dependencies
  console.log('\n📦 Installing frontend dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed');

  // Install backend dependencies
  console.log('\n📦 Installing backend dependencies...');
  execSync('cd backend && npm install', { stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');

  // Create .env file if it doesn't exist
  console.log('\n⚙️  Setting up environment variables...');
  const envExamplePath = join('backend', 'env.example');
  const envPath = join('backend', '.env');
  
  if (!existsSync(envPath) && existsSync(envExamplePath)) {
    copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from template');
    console.log('⚠️  Please edit backend/.env with your configuration');
  } else if (existsSync(envPath)) {
    console.log('✅ .env file already exists');
  } else {
    console.log('⚠️  No env.example found, please create backend/.env manually');
  }

  console.log('\n🎉 Setup completed successfully!');
  console.log('\n📖 Next steps:');
  console.log('1. Make sure MongoDB is running on your system');
  console.log('2. Edit backend/.env with your configuration');
  console.log('3. Run "cd backend && npm run seed" to populate the database with sample data');
  console.log('4. Run "npm run dev:full" to start both frontend and backend');
  console.log('\n🌐 Frontend will be available at: http://localhost:5173');
  console.log('🔧 Backend API will be available at: http://localhost:5000');

} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  console.log('\n🔧 Manual setup instructions:');
  console.log('1. Install dependencies: npm install && cd backend && npm install');
  console.log('2. Copy backend/env.example to backend/.env and configure it');
  console.log('3. Start MongoDB');
  console.log('4. Run the seed script: cd backend && npm run seed');
  console.log('5. Start the application: npm run dev:full');
  process.exit(1);
} 