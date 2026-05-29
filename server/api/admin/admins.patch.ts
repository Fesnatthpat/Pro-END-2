import { hash } from 'bcryptjs'
import { getPrisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { id, username, password, fullname, email, role } = body

  const prisma = getPrisma()

  try {
    const data: any = {
      username,
      fullname,
      email,
      role
    }

    if (password) {
      data.password = await hash(password, 10)
    }

    const admin = await prisma.admin.update({
      where: { id: Number(id) },
      data
    })

    return {
      success: true,
      admin: {
        id: admin.id,
        username: admin.username
      }
    }
  } catch (error: any) {
    console.error('Update Admin Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูลผู้ดูแลระบบ'
    })
  }
})
