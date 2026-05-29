import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { projectId, title, description, fileUrl, reportType } = body

  if (!projectId || !title) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  const prisma = getPrisma()

  try {
    const report = await prisma.progressReport.create({
      data: {
        projectId: parseInt(projectId),
        title,
        description,
        fileUrl,
        reportType: reportType || 'progress',
        status: 'pending'
      }
    })

    // Add Activity Log
    await prisma.projectActivity.create({
      data: {
        projectId: parseInt(projectId),
        type: reportType === 'thesis' ? 'THESIS_SUBMIT' : 'PROGRESS_SUBMIT',
        title: reportType === 'thesis' ? 'ส่งเล่มโครงงานฉบับร่าง' : 'ส่งรายงานความก้าวหน้า',
        description: title,
        status: 'pending',
        icon: reportType === 'thesis' ? 'description' : 'code',
        fileUrl: fileUrl,
        actorName: event.context.auth?.fullname || 'นักศึกษา'
      }
    })

    return {
      success: true,
      report
    }
  } catch (error: any) {
    console.error('Submit Progress Report Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการบันทึกรายงานความก้าวหน้า'
    })
  }
})
