import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const advisorId = query.advisorId ? parseInt(query.advisorId as string) : null
  const academicYear = query.year as string

  if (!advisorId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing advisorId' })
  }

  const prisma = getPrisma()

  try {
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { advisorId: advisorId },
          { coAdvisorId: advisorId }
        ],
        academicYear: academicYear
      },
      include: {
        student1: { select: { id: true, fullname: true, username: true } },
        student2: { select: { id: true, fullname: true, username: true } },
        advisor: { select: { id: true, fullname: true } },
        coAdvisor: { select: { id: true, fullname: true } }
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
    console.error('Fetch Teacher Projects Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลโครงงาน'
    })
  }
})
