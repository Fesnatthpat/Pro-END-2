import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { projectId, title, description, fileUrl, reportType } = body

  if (!projectId || !title) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  if (fileUrl && !fileUrl.startsWith('http://') && !fileUrl.startsWith('https://')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid file URL' })
  }

  const auth = event.context.auth
  if (!auth?.userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const prisma = getPrisma()

  try {
    const project = await prisma.project.findFirst({
      where: {
        id: parseInt(projectId),
        OR: [{ student1Id: auth.userId }, { student2Id: auth.userId }]
      }
    })

    if (!project) {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden: คุณไม่มีสิทธิ์เข้าถึงโครงงานนี้' })
    }

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
