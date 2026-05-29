import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { projectId, thesisUrl, programUrl, manualUrl } = body

  if (!projectId || !thesisUrl || !programUrl || !manualUrl) {
    throw createError({ statusCode: 400, statusMessage: 'กรุณากรอกข้อมูลให้ครบทุกช่อง' })
  }

  const prisma = getPrisma()

  try {
    // 1. Update Project
    const project = await prisma.project.update({
      where: { id: parseInt(projectId) },
      data: {
        thesisUrl,
        programUrl,
        manualUrl,
        step: 5, // เข้าสู่ขั้นตอนสุดท้าย
        status: 'pending' // กลับมาเป็นรออนุมัติเล่มสมบูรณ์
      }
    })

    // 2. Update Step Status
    await prisma.projectStepStatus.upsert({
      where: {
        projectId_step: {
          projectId: project.id,
          step: 5
        }
      },
      update: { status: 'pending' },
      create: {
        projectId: project.id,
        step: 5,
        status: 'pending'
      }
    })

    // 3. Add Activity Log
    await prisma.projectActivity.create({
      data: {
        projectId: parseInt(projectId),
        type: 'FINAL_SUBMIT',
        title: 'ส่งเล่มและโปรแกรมฉบับสมบูรณ์',
        description: 'นักศึกษาได้ส่งไฟล์เล่มและโปรแกรมฉบับสมบูรณ์เข้าสู่ระบบเพื่อรอการอนุมัติขั้นสุดท้าย',
        status: 'pending',
        icon: 'inventory_2',
        actorName: event.context.auth?.fullname || 'นักศึกษา'
      }
    })

    return {
      success: true,
      project
    }
  } catch (error: any) {
    console.error('Final Submission Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการบันทึกข้อมูลการส่งงานสมบูรณ์'
    })
  }
})
