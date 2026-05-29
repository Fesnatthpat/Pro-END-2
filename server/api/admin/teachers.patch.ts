import { hash } from 'bcryptjs'
import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { id, username, email, password, fullname, tel, lineId } = body

  if (!id || !username || !email || !fullname) {
    throw createError({
      statusCode: 400,
      statusMessage: 'กรุณากรอกข้อมูลให้ครบถ้วน'
    })
  }

  const prisma = getPrisma()

  try {
    // ตรวจสอบ Username/Email ซ้ำ (ยกเว้นของตัวเอง)
    const existingTeacher = await prisma.teacher.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }
        ],
        NOT: { id: parseInt(id) }
      }
    })

    if (existingTeacher) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ชื่อผู้ใช้หรืออีเมลนี้ถูกใช้งานโดยผู้อื่นแล้ว'
      })
    }

    const updateData: any = {
      username,
      email,
      fullname,
      tel: tel || '-',
      lineId: lineId || '-'
    }

    // ถ้ามีการเปลี่ยนรหัสผ่าน
    if (password && password.trim() !== '') {
      updateData.password = await hash(password, 10)
    }

    const teacher = await prisma.teacher.update({
      where: { id: parseInt(id) },
      data: updateData
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
    console.error('Update Teacher Error:', error)
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล'
    })
  }
})
