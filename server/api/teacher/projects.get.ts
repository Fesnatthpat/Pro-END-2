import { getPrisma } from '~~/server/utils/prisma'

// API Endpoint สำหรับดึงรายชื่อโครงงานทั้งหมดภายใต้การดูแล (ทั้งอาจารย์ที่ปรึกษาหลักหรือที่ปรึกษาร่วม)
export default defineEventHandler(async (event) => {
  // อ่านค่าพารามิเตอร์เคียวรี่ที่ส่งมาทาง URL
  const query = getQuery(event)
  const advisorId = query.advisorId ? parseInt(query.advisorId as string) : null
  const academicYear = query.year as string

  // หากไม่มีรหัสอาจารย์ที่ปรึกษาส่งมาด้วย ให้ส่งข้อผิดพลาด 400
  if (!advisorId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing advisorId' })
  }

  const prisma = getPrisma()

  try {
    // ค้นหาโครงงานที่อาจารย์เป็นที่ปรึกษาหลัก (advisorId) หรือเป็นที่ปรึกษาร่วม (coAdvisorId)
    // พร้อมกรองตามปีการศึกษา (ถ้ามีการระบุมา)
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { advisorId: advisorId },
          { coAdvisorId: advisorId }
        ],
        academicYear: academicYear
      },
      // เชื่อมโยงข้อมูลผู้ใช้เพื่อนำข้อมูลชื่อ รหัสประจำตัว ออกมาแสดงผล
      include: {
        student1: { select: { id: true, fullname: true, username: true } },
        student2: { select: { id: true, fullname: true, username: true } },
        advisor: { select: { id: true, fullname: true } },
        coAdvisor: { select: { id: true, fullname: true } }
      },
      // เรียงลำดับตามวันที่อัปเดตล่าสุดจากใหม่สุดลงไป
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return {
      success: true,
      projects
    }
  } catch (error: any) {
    console.error('Fetch Teacher Projects Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลโครงงาน'
    })
  }
})
