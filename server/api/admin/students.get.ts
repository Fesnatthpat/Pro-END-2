import { getPrisma } from '~~/server/utils/prisma'

// API Endpoint สำหรับดึงรายชื่อนักศึกษาที่ได้รับอนุมัติบัญชีแล้ว พร้อมระบบแบ่งหน้า (Pagination)
export default defineEventHandler(async (event) => {
  const prisma = getPrisma()
  const query = getQuery(event)
  
  // อ่านค่าพารามิเตอร์หน้าปัจจุบัน (page) และขีดจำกัดจำนวนรายการ (limit)
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 10
  
  // คำนวณจำนวนแถวที่ต้องข้าม (skip) สำหรับใช้แบ่งหน้า
  const skip = (page - 1) * limit

  try {
    // ใช้ Promise.all ในการดึงรายชื่อหน้าปัจจุบันพร้อมคำนวณจำนวนหน้าทั้งหมดในคราวเดียวแบบขนาน
    const [students, total] = await Promise.all([
      // ค้นหานักศึกษาที่มีการเปิดใช้งานบัญชีแล้ว (isApproved: true)
      prisma.student.findMany({
        where: {
          isApproved: true
        },
        skip,
        take: limit,
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
          // ดึงข้อมูลชื่อโครงงานที่เข้าร่วม (ดึงจากทั้งตำแหน่งสมาชิกคนที่ 1 และคนที่ 2)
          projects1: { select: { titleTh: true } },
          projects2: { select: { titleTh: true } },
          createdAt: true,
          updatedAt: true
        },
        // เรียงลำดับรหัสนักศึกษาจากน้อยไปมาก
        orderBy: {
          username: 'asc'
        }
      }),
      // นับจำนวนนักศึกษาที่ผ่านการอนุมัติทั้งหมดในฐานข้อมูลเพื่อคำนวณตัวเลข Pagination
      prisma.student.count({
        where: { isApproved: true }
      })
    ])

    return {
      success: true,
      students,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  } catch (error: any) {
    console.error('Fetch Approved Students Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลนักศึกษา'
    })
  }
})
