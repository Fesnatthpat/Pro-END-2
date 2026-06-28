import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const prisma = getPrisma()
  const query = getQuery(event)
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 999
  const search = query.search as string || ''
  const year = query.year as string || ''
  const skip = (page - 1) * limit

  const where: any = {}
  if (year) {
    where.academicYear = year
  }
  if (search) {
    where.OR = [
      { titleTh: { contains: search, mode: 'insensitive' } },
      { student1: { fullname: { contains: search, mode: 'insensitive' } } },
      { student2: { is: { fullname: { contains: search, mode: 'insensitive' } } } }
    ]
  }

  try {
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        include: {
          student1: true,
          student2: true,
          advisor: true,
          coAdvisor: true,
          exams: {
            orderBy: { examDate: 'desc' }
          }
        },
        orderBy: {
          updatedAt: 'desc'
        }
      }),
      prisma.project.count({ where })
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
