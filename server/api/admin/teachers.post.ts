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
    const existingTeacher = await prisma.teacher.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }
        ]
      }
    })

    if (existingTeacher) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ชื่อผู้ใช้หรืออีเมลนี้ถูกใช้งานไปแล้ว'
      })
    }

    const hashedPassword = await hash(password, 10)

    const teacher = await prisma.teacher.create({
      data: {
        username,
        email,
        password: hashedPassword,
        fullname,
        tel: tel || '-',
        lineId: lineId || '-',
        // role and academicYear removed as they are not in Teacher model
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
