import { getPrisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const prisma = getPrisma()

  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        fullname: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: {
        id: 'asc'
      }
    })

    return admins
  } catch (error: any) {
    console.error('Get Admins Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ดูแลระบบ'
    })
  }
})
