import { getPrisma } from '~~/server/utils/prisma'

// API Endpoint สำหรับดึงข้อมูลสถิติรวมและรายการอัปเดตล่าสุดมาแสดงในแดชบอร์ดหลักของผู้ดูแลระบบ
export default defineEventHandler(async (event) => {
  const prisma = getPrisma()

  try {
    // 1. นับจำนวนภาพรวมระบบ (จำนวนนักศึกษา, จำนวนหัวข้อโครงการทั้งหมด, โครงการที่ค้างรอตรวจ CP1, โครงการที่ค้างตรวจขอสอบ)
    const studentCount = await prisma.student.count({ where: { isApproved: true } })
    const projectCount = await prisma.project.count()
    const cp1PendingCount = await prisma.project.count({ where: { step: 1, status: 'pending' } })
    const cp2PendingCount = await prisma.project.count({ where: { step: 4, status: 'pending' } })

    // 2. ดึงข้อมูล 5 โครงการล่าสุดที่มีการอัปเดตในระบบ (เพื่อแสดงในกล่องความเคลื่อนไหวล่าสุด)
    const recentProjects = await prisma.project.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
      include: {
        student1: true
      }
    })

    // 3. ดึงรายชื่อ 5 นักศึกษาล่าสุดที่สมัครสมาชิกเข้ามาและรออนุมัติสิทธิ์ใช้งาน
    const pendingStudents = await prisma.student.findMany({
      where: { isApproved: false },
      take: 5,
      orderBy: { createdAt: 'desc' }
    })

    // จัดรูปแบบและส่งข้อมูลผลลัพธ์สถิติออกไป
    return {
      success: true,
      stats: {
        students: studentCount,
        projects: projectCount,
        cp1: cp1PendingCount,
        cp2: cp2PendingCount
      },
      recentProjects: recentProjects.map(p => ({
        id: p.id,
        title: p.titleTh,
        student: p.student1.fullname,
        step: p.step
      })),
      pendingStudents: pendingStudents.map(s => ({
        id: s.id,
        name: s.fullname,
        code: s.username
      }))
    }
  } catch (error: any) {
    console.error('Admin Stats Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลสถิติ'
    })
  }
})
