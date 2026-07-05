import { getPrisma } from '~~/server/utils/prisma'
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { reportId } = body

  if (!reportId) {
    throw createError({ statusCode: 400, statusMessage: 'ข้อมูลไม่ถูกต้อง' })
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

    await prisma.progressReport.delete({
      where: { id: parseInt(reportId) }
    })

    return { success: true, message: 'ลบรายงานเรียบร้อยแล้ว' }
  } catch (error: any) {
    console.error('Delete Progress Error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'เกิดข้อผิดพลาดในการลบข้อมูล'
    })
  }
})
