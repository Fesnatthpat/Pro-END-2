import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { projectId } = body

  if (!projectId) {
    throw createError({ statusCode: 400, statusMessage: 'ข้อมูลไม่ครบถ้วน' })
  }

  const prisma = getPrisma()

  try {
    const currentProject = await prisma.project.findUnique({ where: { id: parseInt(projectId) } })
    
    const project = await prisma.project.update({
      where: { id: parseInt(projectId) },
      data: {
        // เมื่อยื่นขอสอบแล้ว ให้ขยับ step เป็น 4 โดยอัตโนมัติ (ถ้ายังไม่ถึง)
        step: {
          set: Math.max(4, currentProject?.step || 0)
        },
        status: 'pending' // กลับเป็นรออนุมัติสำหรับการสอบ
      }
    })

    return {
      success: true,
      project
    }
  } catch (error: any) {
    console.error('Notify Readiness Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการส่งคำร้อง'
    })
  }
})
