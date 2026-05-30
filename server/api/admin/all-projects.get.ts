import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const prisma = getPrisma()
  const query = getQuery(event)
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 10
  const skip = (page - 1) * limit

  try {
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        skip,
        take: limit,
        include: {
          student1: true,
          student2: true,
          advisor: true,
          coAdvisor: true
        },
        orderBy: {
          updatedAt: 'desc'
        }
      }),
      prisma.project.count()
    ])

    return {
      success: true,
      projects,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  } catch (error: any) {
    console.error('Fetch All Projects Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลโครงงานทั้งหมด'
    })
  }
})
