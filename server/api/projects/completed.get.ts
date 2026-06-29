import { getPrisma } from '~~/server/utils/prisma'

// API Endpoint สำหรับดึงรายชื่อโครงงานรุ่นพี่ที่ผ่านการสอบและส่งเล่มสมบูรณ์เรียบร้อยแล้ว (Completed Projects)
export default defineEventHandler(async (event) => {
  const prisma = getPrisma()

  try {
    // ค้นหาโครงงานที่อยู่ในขั้นตอน 5 (ส่งเล่มสมบูรณ์) และมีสถานะได้รับการอนุมัติปิดโปรเจกต์แล้ว (status: 'approved')
    const projects = await prisma.project.findMany({
      where: {
        step: 5,
        status: 'approved'
      },
      // ดึงรายละเอียดชื่อสมาชิกและอาจารย์ที่ปรึกษาออกมาแสดงด้วย
      include: {
        student1: true,
        student2: true,
        advisor: true
      },
      // เรียงลำดับปีการศึกษาล่าสุดขึ้นก่อน
      orderBy: {
        academicYear: 'desc'
      }
    })

    return {
      success: true,
      projects
    }
  } catch (error: any) {
    console.error('Fetch Completed Projects Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลโครงงานรุ่นพี่'
    })
  }
})
