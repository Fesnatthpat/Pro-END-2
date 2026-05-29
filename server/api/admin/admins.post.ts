import { hash } from 'bcryptjs'
import { getPrisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password, fullname, email, role } = body

  const prisma = getPrisma()

  try {
    // Check if exists
    const existing = await prisma.admin.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    })

    if (existing) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Username หรือ Email นี้ถูกใช้งานแล้ว'
      })
    }

    const hashedPassword = await hash(password, 10)

    const admin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
        fullname,
        email,
        role: role || 'admin'
      }
    })

    return {
      success: true,
      admin: {
        id: admin.id,
        username: admin.username
      }
    }
  } catch (error: any) {
    console.error('Create Admin Error:', error)
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'เกิดข้อผิดพลาดในการสร้างผู้ดูแลระบบ'
    })
  }
})
