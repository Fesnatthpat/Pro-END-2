import { getPrisma } from '~~/server/utils/prisma'

// API Endpoint สำหรับดึงรายชื่ออาจารย์ทั้งหมดในระบบ
export default defineEventHandler(async (event) => {
  const prisma = getPrisma()

  try {
    // ดึงข้อมูลอาจารย์ทั้งหมด โดยเจาะจงเฉพาะฟิลด์ที่จำเป็น (Prisma Select)
    const teachers = await prisma.teacher.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        fullname: true,
        tel: true,
        lineId: true,
        profileImage: true,
        position: true,
        department: true,
        expertise: true,
        createdAt: true,
        updatedAt: true
      },
      // เรียงลำดับชื่อตามตัวอักษรภาษาไทยจาก ก-ฮ (fullname: 'asc')
      orderBy: {
        fullname: 'asc'
      }
    })

    return {
      success: true,
      teachers
    }
  } catch (error: any) {
    console.error('Fetch Teachers Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลอาจารย์'
    })
  }
})
