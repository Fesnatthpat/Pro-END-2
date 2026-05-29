import { hash } from 'bcryptjs'
import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, email, password, fullname, tel, lineId } = body

  if (!username || !email || !password || !fullname) {
    throw createError({
      statusCode: 400,
      statusMessage: 'กรุณากรอกข้อมูลให้ครบถ้วน'
    })
  }

  const prisma = getPrisma()

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }
        ]
      }
    })

    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ชื่อผู้ใช้หรืออีเมลนี้ถูกใช้งานไปแล้ว'
      })
    }

    const hashedPassword = await hash(password, 10)

    const teacher = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        fullname,
        tel: tel || '-',
        lineId: lineId || '-',
        role: 'teacher',
        isApproved: true,
        academicYear: '-' // Teachers don't specifically have academic year but it's required in schema
      }
    })

    return {
      success: true,
      teacher: {
        id: teacher.id,
        username: teacher.username,
        fullname: teacher.fullname
      }
    }
  } catch (error: any) {
    console.error('Add Teacher Error:', error)
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล'
    })
  }
})
