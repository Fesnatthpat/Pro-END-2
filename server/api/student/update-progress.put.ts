import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { reportId, title, description, fileUrl } = body

  if (!reportId || !title || !description) {
    throw createError({ statusCode: 400, statusMessage: 'ข้อมูลไม่ครบถ้วน' })
  }

  const auth = event.context.auth
  if (!auth?.userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const prisma = getPrisma()

  try {
    const report = await prisma.progressReport.findUnique({
      where: { id: parseInt(reportId) },
      include: { project: true }
    })

    if (!report) {
      throw createError({ statusCode: 404, statusMessage: 'ไม่พบข้อมูลรายงาน' })
    }

    // Verify ownership
    if (report.project.student1Id !== auth.userId && report.project.student2Id !== auth.userId) {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden: คุณไม่มีสิทธิ์เข้าถึงรายงานนี้' })
    }

    const dataToUpdate: any = {
      title,
      description
    }

    if (fileUrl !== undefined) {
      dataToUpdate.fileUrl = fileUrl
    }

    await prisma.progressReport.update({
      where: { id: parseInt(reportId) },
      data: dataToUpdate
    })

    return { success: true, message: 'แก้ไขรายงานเรียบร้อยแล้ว' }
  } catch (error: any) {
    console.error('Update Progress Error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล'
    })
  }
})
