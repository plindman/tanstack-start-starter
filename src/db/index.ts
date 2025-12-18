import { drizzle } from 'drizzle-orm/better-sqlite3'

import * as schema from './schema/index.ts'

export const db = drizzle(process.env.DATABASE_URL!, { schema })
