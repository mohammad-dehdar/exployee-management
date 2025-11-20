import { getDb } from './db';
import { logger } from './logger';

/**
 * Index definition interface
 */
export interface IndexDefinition {
  key: Record<string, number>;
  unique?: boolean;
  name: string;
}

/**
 * Index definitions for all collections
 */
export const indexDefinitions: Record<string, IndexDefinition[]> = {
  users: [
    {
      key: { email: 1 },
      unique: true,
      name: 'email_unique',
    },
    {
      key: { role: 1 },
      name: 'role_index',
    },
    {
      key: { isActive: 1 },
      name: 'isActive_index',
    },
  ],
  employee_profiles: [
    {
      key: { userId: 1 },
      unique: true,
      name: 'userId_unique',
    },
    {
      key: { userEmail: 1 },
      name: 'userEmail_index',
    },
    {
      key: { orgEmail: 1 },
      name: 'orgEmail_index',
    },
  ],
  employees: [
    {
      key: { email: 1 },
      unique: true,
      name: 'email_unique',
    },
    {
      key: { departmentId: 1 },
      name: 'departmentId_index',
    },
    {
      key: { status: 1 },
      name: 'status_index',
    },
  ],
  departments: [
    {
      key: { name: 1 },
      unique: true,
      name: 'name_unique',
    },
    {
      key: { isActive: 1 },
      name: 'isActive_index',
    },
  ],
};

/**
 * Create indexes for a specific collection
 */
export async function createIndexesForCollection(
  collectionName: string
): Promise<void> {
  try {
    const db = await getDb();
    const collection = db.collection(collectionName);
    const indexes = indexDefinitions[collectionName];

    logger.info(`Creating indexes for collection: ${collectionName}`, {
      collection: collectionName,
      indexCount: indexes.length,
    });

    for (const index of indexes) {
      try {
        await collection.createIndex(index.key, {
          unique: index.unique || false,
          name: index.name,
          // Allow existing documents to have null/undefined values for unique indexes
          sparse: index.unique ? true : false,
        });
        logger.debug(`Created index: ${index.name}`, {
          collection: collectionName,
          index: index.name,
          unique: index.unique || false,
        });
      } catch (error: unknown) {
        const err = error as { code?: number; message?: string };
        // Index already exists or duplicate key error
        if (err.code === 85 || err.code === 86 || err.message?.includes('already exists')) {
          logger.debug(`Index already exists: ${index.name}`, {
            collection: collectionName,
            index: index.name,
          });
        } else {
          logger.error(`Failed to create index ${index.name}`, error, {
            collection: collectionName,
            index: index.name,
          });
          throw error;
        }
      }
    }
  } catch (error) {
    logger.error(`Error creating indexes for ${collectionName}`, error, {
      collection: collectionName,
    });
    throw error;
  }
}

/**
 * Create all indexes for all collections
 */
export async function createAllIndexes(): Promise<void> {
  try {
    logger.info('Starting database index setup', {
      collectionCount: Object.keys(indexDefinitions).length,
    });

    const collectionNames = Object.keys(indexDefinitions) as Array<
      keyof typeof indexDefinitions
    >;

    for (const collectionName of collectionNames) {
      await createIndexesForCollection(collectionName);
    }

    logger.info('All indexes created successfully', {
      collectionCount: collectionNames.length,
    });
  } catch (error) {
    logger.error('Failed to create indexes', error);
    throw error;
  }
}

/**
 * List all indexes for a collection (for debugging)
 */
export async function listIndexes(
  collectionName: string
): Promise<Array<{ name: string; key: Record<string, number>; unique?: boolean }>> {
  try {
    const db = await getDb();
    const collection = db.collection(collectionName);
    const indexes = await collection.listIndexes().toArray();
    return indexes.map((idx) => ({
      name: idx.name as string,
      key: idx.key as Record<string, number>,
      unique: idx.unique as boolean | undefined,
    }));
  } catch (error) {
    logger.error(`Error listing indexes for ${collectionName}`, error, {
      collection: collectionName,
    });
    throw error;
  }
}
