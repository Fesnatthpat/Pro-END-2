import { getPrisma } from '../../utils/prisma'

// API Endpoint สำหรับดึงข้อมูลบัญชีผู้ดูแลระบบ (Admin) ทั้งหมดในระบบ
export default defineEventHandler(async (event) => {
  const prisma = getPrisma()

  try {
    // ค้นหาบัญชีผู้ดูแลระบบทั้งหมด โดยเจาะจงเฉพาะข้อมูลสำคัญที่จำเป็น
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        fullname: true,
        email: true,
        role: true,
        createdAt: true
      },
      // เรียงลำดับตาม ID ของผู้ใช้ผู้ดูแลระบบ
      orderBy: {
        id: 'asc'
      }
    })

    return admins
  } catch (error: any) {
    console.error('Get Admins Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ดูแลระบบ'
    })
  }
})
