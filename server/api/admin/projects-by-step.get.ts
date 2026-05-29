import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const step = query.step ? parseInt(query.step as string) : null

  if (!step) {
    throw createError({ statusCode: 400, statusMessage: 'Missing step' })
  }

  const prisma = getPrisma()

  try {
    const projects = await prisma.project.findMany({
      where: {
        step: step
      },
      include: {
        student1: true,
        student2: true,
        advisor: true,
        exams: {
          where: { status: 'pending' },
          take: 1
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return {
      success: true,
      projects
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Fetch Projects By Step Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลโครงงาน'
    })
  }
})
