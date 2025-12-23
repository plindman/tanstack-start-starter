
import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { env } from '@/env'

const sqlite = new Database(env.DATABASE_URL)
const db = drizzle(sqlite)

console.log('⏳ Running migrations...')

try {
  migrate(db, { migrationsFolder: './drizzle' })
  console.log('✅ Migrations completed!')
} catch (error) {
  console.error('❌ Migration failed:', error)
  process.exit(1)
}
