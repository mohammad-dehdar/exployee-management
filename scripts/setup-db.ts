#!/usr/bin/env tsx
/**
 * Database Setup Script
 *
 * This script initializes the database by creating all necessary indexes.
 * Run this script after setting up MongoDB connection.
 *
 * Usage:
 *   npm run db:setup
 *   or
 *   tsx scripts/setup-db.ts
 */

import { createAllIndexes } from '../src/utils/db-indexes';

async function main() {
  try {
    console.log('='.repeat(50));
    console.log('Database Index Setup');
    console.log('='.repeat(50));
    console.log('');

    await createAllIndexes();

    console.log('');
    console.log('='.repeat(50));
    console.log('Setup completed successfully!');
    console.log('='.repeat(50));

    process.exit(0);
  } catch (error) {
    console.error('');
    console.error('='.repeat(50));
    console.error('Setup failed!');
    console.error('='.repeat(50));
    console.error(error);
    process.exit(1);
  }
}

// Run the setup
main();
