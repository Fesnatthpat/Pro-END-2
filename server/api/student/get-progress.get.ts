import { getPrisma } from '~~/server/utils/prisma'

// API Endpoint สำหรับดึงประวัติการส่งรายงานความก้าวหน้าของโครงงาน
export default defineEventHandler(async (event) => {
  // ดึงพารามิเตอร์เคียวรี่ที่ส่งมาทาง URL (เช่น ?projectId=1&reportType=progress)
  const query = getQuery(event)
  const projectId = query.projectId ? parseInt(query.projectId as string) : null
  const reportType = query.reportType as string

  // หากไม่มีรหัสโครงงานส่งมาให้ปฏิเสธคำขอด้วยรหัส 400 Bad Request
  if (!projectId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing projectId' })
  }

  const prisma = getPrisma()

  try {
    // ค้นหารายการส่งรายงานความก้าวหน้าของโครงงานนี้ เรียงลำดับจากล่าสุดลงไป (createdAt: 'desc')
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
