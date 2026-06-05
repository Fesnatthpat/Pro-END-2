import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const prisma = getPrisma()

  try {
    const pendingStudents = await prisma.student.count({ where: { isApproved: false } })
    const pendingTopicExams = await prisma.project.count({ where: { step: 1, status: 'pending' } })
    const pendingFinalExams = await prisma.project.count({ where: { step: 4, status: 'pending' } })

    return {
      success: true,
      data: {
        pendingStudents,
        pendingTopicExams,
        pendingFinalExams
      }
    }
  } catch (error: any) {
    console.error('Menu Badges Error:', error)
    return {
      success: false,
      data: {
        pendingStudents: 0,
        pendingTopicExams: 0,
        pendingFinalExams: 0
      }
    }
  }
})
