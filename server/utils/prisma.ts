import { PrismaClient } from '~~/prisma/generated/client/index.js'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

// สร้างตัวแปร global เพื่อเก็บ instance ของ Prisma Client
// วิธีนี้ช่วยป้องกันไม่ให้ระบบสร้าง Connection ซ้ำๆ เวลาเกิดการ Hot-reload ในโหมด Development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// ฟังก์ชันสำหรับดึง Prisma Client ไปใช้งานใน API ต่างๆ
export const getPrisma = () => {
  // หากยังไม่มี instance ของ Prisma ใน global variable ให้ทำการสร้างใหม่
  if (!globalForPrisma.prisma) {
    const databaseUrl = process.env.DATABASE_URL
    
    // ตรวจสอบว่ามีการระบุ DATABASE_URL ในไฟล์ .env หรือไม่
    if (!databaseUrl) {
      console.error('ERROR: DATABASE_URL is not defined in environment variables')
      throw new Error('DATABASE_URL is missing')
    } else {
      console.log('Initializing Prisma with DATABASE_URL starting with:', databaseUrl.substring(0, 15) + '...')
    }
    
    // ตั้งแต่ Prisma v7 เป็นต้นมา การเชื่อมต่อกับฐานข้อมูลโดยตรง (ในสภาพแวดล้อมบางตัว) แนะนำให้ใช้ adapter
    // เราจึงสร้าง Connection Pool ด้วยไลบรารี pg (PostgreSQL)
    const pool = new pg.Pool({ 
      connectionString: databaseUrl,
      max: 5, // จำกัดจำนวน Connection ไว้ที่ 5 เพื่อไม่ให้เปลืองทรัพยากรเกินไปตอน dev
      // ตรวจสอบกรณีใช้งานกับ Supabase ให้ยอมรับ SSL ได้
      ssl: databaseUrl.includes('supabase.co') || databaseUrl.includes('pooler') ? { rejectUnauthorized: false } : false
    })
    
    // นำ Pool มาครอบด้วย PrismaPg adapter
    const adapter = new PrismaPg(pool)
    
    // สร้าง Prisma Client ผ่าน adapter และเก็บไว้ใน global variable
    globalForPrisma.prisma = new PrismaClient({ adapter })
  }
  
  // คืนค่า Prisma Client ที่พร้อมใช้งานกลับไป
  return globalForPrisma.prisma
}

export default getPrisma
