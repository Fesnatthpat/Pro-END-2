import { getPrisma } from '~~/server/utils/prisma'

// API Endpoint สำหรับให้แอดมินลบบัญชีของอาจารย์ออกหลังจากได้รับการตรวจสอบ
export default defineEventHandler(async (event) => {
  // ดึงค่าไอดีอาจารย์จาก Query Parameter เช่น ?id=1
  const query = getQuery(event)
  const id = parseInt(query.id as string)

  // ตรวจสอบความถูกต้องของไอดี
  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID ไม่ถูกต้อง'
    })
  }

  const prisma = getPrisma()

  try {
    // ดำเนินการลบข้อมูลอาจารย์ในตาราง Teacher ของฐานข้อมูล
    await prisma.teacher.delete({
      where: {
        id
      }
    })

    return {
      success: true,
      message: 'ลบข้อมูลเรียบร้อยแล้ว'
    }
  } catch (error: any) {
    console.error('Delete Teacher Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการลบข้อมูล'
    })
  }
})
