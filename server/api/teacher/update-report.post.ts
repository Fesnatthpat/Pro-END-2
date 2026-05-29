import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { reportId, feedback, status } = body

  if (!reportId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing reportId' })
  }

  const prisma = getPrisma()

  try {
    const report = await prisma.progressReport.update({
      where: { id: parseInt(reportId) },
      data: {
        feedback: feedback !== undefined ? feedback : undefined,
        status: status !== undefined ? status : undefined
      }
    })

    return {
      success: true,
      report
    }
  } catch (error: any) {
    console.error('Update Report Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการอัปเดตรายงาน'
    })
  }
})
