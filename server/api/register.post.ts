import { hash } from 'bcryptjs'
import { getPrisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, email, password, fullname, academicYear, tel, lineId, profileImage } = body

  const prisma = getPrisma()

  try {
    // 1. Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }
        ]
      }
    })

    if (existingUser) {
      const isUsername = existingUser.username === username
      throw createError({
        statusCode: 400,
        statusMessage: isUsername ? 'รหัสนักศึกษานี้ถูกใช้งานไปแล้ว' : 'อีเมลนี้ถูกใช้งานไปแล้ว'
      })
    }

    // 2. Hash password
    const hashedPassword = await hash(password, 10)

    // 3. Create user in database
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        fullname,
        academicYear,
        tel,
        lineId,
        profileImage
      }
    })

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    }
  } catch (error: any) {
    console.error('Registration Error:', error)
    
    // ถ้าเป็น Error ที่เราสร้างเอง (เช่น User ซ้ำ) ให้ส่งกลับไปตามนั้น
    if (error.statusCode) throw error

    // ถ้าเป็น Error อื่นๆ จาก Database (เช่น Table not found)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง'
    })
  }
})
