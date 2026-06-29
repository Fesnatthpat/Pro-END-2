import { getPrisma } from '~~/server/utils/prisma'

// API Endpoint สำหรับดึงตัวเลขแจ้งเตือน (Badges) ค้างของเมนูด้านซ้ายผู้ดูแลระบบ (Admin Navigation)
export default defineEventHandler(async (event) => {
  const prisma = getPrisma()

  try {
    // 1. นับจำนวนนักศึกษาใหม่ที่ลงทะเบียนเข้ามาและรออนุมัติสิทธิ์ (isApproved: false)
    const pendingStudents = await prisma.student.count({ where: { isApproved: false } })
    
    // 2. นับจำนวนโครงงานในขั้นตอนยื่นเสนอหัวข้อ CP1 ที่แอดมินยังไม่ได้อนุมัติ (step: 1 และ status: 'pending')
    const pendingTopicExams = await prisma.project.count({ where: { step: 1, status: 'pending' } })
    
    // 3. นับจำนวนโครงงานในขั้นตอนยื่นขอสอบจบวิทยานิพนธ์ที่รอการตรวจสอบ (step: 4 และ status: 'pending')
    const pendingFinalExams = await prisma.project.count({ where: { step: 4, status: 'pending' } })

    return {
      success: true,
      data: {
        pendingStudents,
        pendingTopicExams,
        pendingFinalExams
      }
    }
  } catch (error: any) {
    console.error('Menu Badges Error:', error)
    return {
      success: false,
      data: {
        pendingStudents: 0,
        pendingTopicExams: 0,
        pendingFinalExams: 0
      }
    }
  }
})
