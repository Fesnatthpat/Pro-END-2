import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { projectId, type } = body

  if (!projectId || !type || !['cp2', 'cp3'].includes(type)) {
    throw createError({ statusCode: 400, statusMessage: 'ข้อมูลไม่ถูกต้อง' })
  }

  const auth = event.context.auth
  if (!auth?.userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const prisma = getPrisma()

  try {
    const parsedProjectId = parseInt(projectId)

    const existingProject = await prisma.project.findFirst({
      where: {
        id: parsedProjectId,
        OR: [{ student1Id: auth.userId }, { student2Id: auth.userId }]
      }
    })

    if (!existingProject) {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden: คุณไม่มีสิทธิ์เข้าถึงโครงงานนี้' })
    }

    // ตรวจสอบว่าเคยส่งหรือยัง
    const existingReport = await prisma.progressReport.findFirst({
      where: {
        projectId: parsedProjectId,
        reportType: type
      }
    })

    if (existingReport) {
      return { success: true, message: 'เอกสารนี้ถูกส่งไปแล้ว' }
    }

    // สร้างบันทึกประวัติการส่ง
    await prisma.progressReport.create({
      data: {
        projectId: parsedProjectId,
        title: type === 'cp2' ? 'แบบคำร้องขอสอบจบโครงงาน (CP2)' : 'แบบประเมินการสอบโครงงาน (CP3)',
        description: `นักศึกษาได้ยืนยันการส่งเอกสาร ${type.toUpperCase()} เรียบร้อยแล้ว`,
        reportType: type,
        status: 'pending' // แอดมินสามารถมารับทราบได้
      }
    })

    return {
      success: true,
      message: `ส่งเอกสาร ${type.toUpperCase()} เรียบร้อยแล้ว`
    }
  } catch (error: any) {
    console.error('Submit CP Document Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการบันทึกข้อมูลการส่งเอกสาร'
    })
  }
})
