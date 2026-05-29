import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { id, step, status, feedback } = body

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing project id' })
  }

  const auth = event.context.auth
  const prisma = getPrisma()

  try {
    const existingProject = await prisma.project.findUnique({ where: { id: parseInt(id) } })
    if (!existingProject) {
      throw createError({ statusCode: 404, statusMessage: 'Project not found' })
    }

    if (auth.role === 'teacher' && existingProject.advisorId !== auth.userId && existingProject.coAdvisorId !== auth.userId) {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden: You can only update projects you advise' })
    }

    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        step: step !== undefined ? parseInt(step) : undefined,
        status: status !== undefined ? status : undefined,
        feedback: feedback !== undefined ? feedback : undefined
      }
    })

    return {
      success: true,
      project
    }
  } catch (error: any) {
    console.error('Update Project Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลโครงงาน'
    })
  }
})
