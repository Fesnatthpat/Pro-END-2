import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const prisma = getPrisma()
  const query = getQuery(event)
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 10
  const skip = (page - 1) * limit

  try {
    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where: {
          isApproved: true
        },
        skip,
        take: limit,
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
      }),
      prisma.student.count({
        where: { isApproved: true }
      })
    ])

    return {
      success: true,
      students,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  } catch (error: any) {
    console.error('Fetch Approved Students Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลนักศึกษา'
    })
  }
})
