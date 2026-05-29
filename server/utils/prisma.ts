import { PrismaClient } from '~~/prisma/generated/client/index.js'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const getPrisma = () => {
  if (!globalForPrisma.prisma) {
    const databaseUrl = process.env.DATABASE_URL
    
    if (!databaseUrl) {
      console.error('ERROR: DATABASE_URL is not defined in environment variables')
      throw new Error('DATABASE_URL is missing')
    } else {
      console.log('Initializing Prisma with DATABASE_URL starting with:', databaseUrl.substring(0, 15) + '...')
    }
    
    // In Prisma 7, direct connections must use an adapter
    const pool = new pg.Pool({ 
      connectionString: databaseUrl,
      max: 5, // Limit connections to avoid exhausting the pool in dev
      ssl: databaseUrl.includes('supabase.co') || databaseUrl.includes('pooler') ? { rejectUnauthorized: false } : false
    })
    const adapter = new PrismaPg(pool)
    
    globalForPrisma.prisma = new PrismaClient({ adapter })
  }
  return globalForPrisma.prisma
}

export default getPrisma
