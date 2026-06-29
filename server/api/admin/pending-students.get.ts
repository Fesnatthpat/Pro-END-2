import { getPrisma } from '~~/server/utils/prisma'

// API Endpoint สำหรับดึงรายชื่อนักศึกษาที่เพิ่งสมัครสมาชิกใหม่และรอรับการยืนยันอนุมัติบัญชี
export default defineEventHandler(async (event) => {
  const prisma = getPrisma()

  try {
    // ค้นหาแถวในตารางนักศึกษาเฉพาะกลุ่มที่ยังไม่ผ่านการอนุมัติสิทธิ์ (isApproved: false)
    const pendingStudents = await prisma.student.findMany({
      where: {
        isApproved: false
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullname: true,
        academicYear: true,
        tel: true,
        lineId: true,
        profileImage: true,
        isApproved: true,
        createdAt: true,
        updatedAt: true
      },
      // เรียงลำดับตามวันที่ลงทะเบียนล่าสุดเข้ามาหาแรกสุด (createdAt: 'desc')
      orderBy: {
        createdAt: 'desc'
      }
    })

    return {
      success: true,
      students: pendingStudents
    }
  } catch (error: any) {
    console.error('Fetch Pending Students Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลนักศึกษา'
    })
  }
})
