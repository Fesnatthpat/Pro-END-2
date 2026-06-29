import { getPrisma } from '~~/server/utils/prisma'

// API Endpoint สำหรับอาจารย์/แอดมินใช้ประเมินให้คะแนนหรือคอมเม้นต์ความเห็น (Feedback) ให้กับรายงานความก้าวหน้า
export default defineEventHandler(async (event) => {
  // อ่านข้อมูลที่รับเข้ามาจากฝั่ง Client
  const body = await readBody(event)
  const { reportId, feedback, status } = body

  // หากไม่มีไอดีรายงานส่งเข้ามา ให้แจ้งข้อผิดพลาด 400 Bad Request
  if (!reportId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing reportId' })
  }

  const prisma = getPrisma()

  try {
    // บันทึกความเห็น (feedback) และการเปลี่ยนสถานะรายงาน (status) เช่น อนุมัติ / ให้แก้ไข
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
