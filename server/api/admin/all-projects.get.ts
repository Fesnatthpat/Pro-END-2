import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const prisma = getPrisma()

  try {
    const projects = await prisma.project.findMany({
      include: {
        student1: true,
        student2: true,
        advisor: true,
        coAdvisor: true
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
    console.error('Fetch All Projects Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลโครงงานทั้งหมด'
    })
  }
})
