import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const prisma = getPrisma()

  try {
    const students = await prisma.student.findMany({
      where: {
        isApproved: true
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
        isApproved: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        username: 'asc'
      }
    })

    return {
      success: true,
      students
    }
  } catch (error: any) {
    console.error('Fetch Approved Students Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลนักศึกษา'
    })
  }
})
