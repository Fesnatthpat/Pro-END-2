import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const projectId = query.projectId ? parseInt(query.projectId as string) : null
  const reportType = query.reportType as string

  if (!projectId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing projectId' })
  }

  const prisma = getPrisma()

  try {
    const reports = await prisma.progressReport.findMany({
      where: { 
        projectId,
        reportType: reportType ? reportType : undefined
      },
      orderBy: { createdAt: 'desc' }
    })

    return {
      success: true,
      reports
    }
  } catch (error: any) {
    console.error('Fetch Progress Reports Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลรายงานความก้าวหน้า'
    })
  }
})
