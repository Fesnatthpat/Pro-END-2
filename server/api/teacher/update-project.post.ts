import { getPrisma } from '~~/server/utils/prisma'

// API Endpoint สำหรับอาจารย์ใช้เปลี่ยนสถานะหรือขั้นตอนของโครงงานที่เป็นที่ปรึกษา
export default defineEventHandler(async (event) => {
  // อ่านค่าพารามิเตอร์ที่ส่งมาจากฝั่ง Client
  const body = await readBody(event)
  const { id, step, status, feedback } = body

  // หากไม่มีไอดีโครงการส่งเข้ามา ให้โยนข้อผิดพลาด 400
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing project id' })
  }

  const auth = event.context.auth
  const prisma = getPrisma()

  try {
    // ดึงข้อมูลโครงการเดิมมาตรวจสอบก่อน
    const existingProject = await prisma.project.findUnique({ where: { id: parseInt(id) } })
    if (!existingProject) {
      throw createError({ statusCode: 404, statusMessage: 'Project not found' })
    }

    // กรณีเป็นผู้ใช้งานบทบาท 'teacher' ตรวจสอบสิทธิ์ว่าต้องเป็นที่ปรึกษาหลักหรือที่ปรึกษาร่วมของโครงงานนี้เท่านั้น
    if (auth.role === 'teacher' && existingProject.advisorId !== auth.userId && existingProject.coAdvisorId !== auth.userId) {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden: You can only update projects you advise' })
    }

    // อัปเดตขั้นตอน (Step), สถานะ (Status) หรือข้อเสนอแนะความเห็น (Feedback)
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
