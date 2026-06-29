import { getPrisma } from '~~/server/utils/prisma'

// API Endpoint สำหรับแอดมินอนุมัติสิทธิ์ (isApproved: true) บัญชีสมาชิกของนักศึกษาใหม่
export default defineEventHandler(async (event) => {
  // อ่านข้อมูลไอดีผู้ใช้ที่แอดมินเลือกอนุมัติ
  const body = await readBody(event)
  const { userId } = body

  // หากไม่มีไอดีผู้ใช้ส่งมา ให้ส่งข้อผิดพลาด 400 Bad Request
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ไม่พบ ID ผู้ใช้งาน'
    })
  }

  const prisma = getPrisma()

  try {
    // แก้ไขฟิลด์ "isApproved" ของนักศึกษารายดังกล่าวให้เป็น true เพื่อเปิดให้เข้าสู่ระบบได้
    const user = await prisma.student.update({
      where: { id: userId },
      data: { isApproved: true }
    })

    return {
      success: true,
      user: {
        id: user.id,
        fullname: user.fullname,
        isApproved: user.isApproved
      }
    }
  } catch (error: any) {
    console.error('Approve Student Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการอนุมัติผู้ใช้งาน'
    })
  }
})
