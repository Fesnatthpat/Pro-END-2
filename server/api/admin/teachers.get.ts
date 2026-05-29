import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const prisma = getPrisma()

  try {
    const teachers = await prisma.teacher.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        fullname: true,
        tel: true,
        lineId: true,
        profileImage: true,
        position: true,
        department: true,
        expertise: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        fullname: 'asc'
      }
    })

    return {
      success: true,
      teachers
    }
  } catch (error: any) {
    console.error('Fetch Teachers Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลอาจารย์'
    })
  }
})
