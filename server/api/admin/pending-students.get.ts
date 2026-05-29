import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const prisma = getPrisma()

  try {
    const pendingStudents = await prisma.user.findMany({
      where: {
        role: 'student',
        isApproved: false
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullname: true,
        academicYear: true,
        tel: true,
        lineId: true,
        profileImage: true,
        role: true,
        isApproved: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return {
      success: true,
      students: pendingStudents
    }
  } catch (error: any) {
    console.error('Fetch Pending Students Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลนักศึกษา'
    })
  }
})
