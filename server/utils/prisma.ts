import { PrismaClient } from '~~/prisma/generated/client/index.js'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

let prisma: PrismaClient

export const getPrisma = () => {
  if (!prisma) {
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
      ssl: databaseUrl.includes('supabase.co') || databaseUrl.includes('pooler') ? { rejectUnauthorized: false } : false
    })
    const adapter = new PrismaPg(pool)
    
    prisma = new PrismaClient({ adapter })
  }
  return prisma
}

export default getPrisma
