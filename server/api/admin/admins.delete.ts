import { getPrisma } from '../../utils/prisma'

// API Endpoint สำหรับให้ Super Admin ลบบัญชีผู้ดูแลระบบอื่น
export default defineEventHandler(async (event) => {
  // ดึงรหัสไอดีผู้ดูแลระบบจาก Query Parameter (?id=...)
  const query = getQuery(event)
  const id = query.id as string

  const prisma = getPrisma()

  try {
    const auth = event.context.auth
    
    // ป้องกันความปลอดภัย: ห้ามแอดมินลบบัญชีตัวเองที่กำลังล็อกอินอยู่
    if (auth?.userId === Number(id)) {
      throw createError({ statusCode: 400, statusMessage: 'ไม่สามารถลบตัวเองได้' })
    }

    // ดำเนินการลบบัญชีผู้ดูแลระบบออกจากตาราง Admin
    await prisma.admin.delete({
      where: { id: Number(id) }
    })

    return { success: true }
  } catch (error: any) {
    console.error('Delete Admin Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการลบผู้ดูแลระบบ'
    })
  }
})
