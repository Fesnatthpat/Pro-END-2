import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const prisma = getPrisma()

  try {
    const projects = await prisma.project.findMany({
      where: {
        step: 5,
        status: 'approved'
      },
      include: {
        student1: true,
        student2: true,
        advisor: true
      },
      orderBy: {
        academicYear: 'desc'
      }
    })

    return {
      success: true,
      projects
    }
  } catch (error: any) {
    console.error('Fetch Completed Projects Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลโครงงานรุ่นพี่'
    })
  }
})
