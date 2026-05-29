import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = parseInt(query.id as string)

  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID ไม่ถูกต้อง'
    })
  }

  const prisma = getPrisma()

  try {
    // 1. ตรวจสอบก่อนว่านักศึกษานี้ติด Foreign Key ใน Project หรือไม่
    // เนื่องจากลบ User ที่มี Project ผูกอยู่จะติด Database Constraint
    
    // ลบโครงงานที่นักศึกษานี้เป็นคนสร้าง (Student1 หรือ Student2)
    // หรือจะเลือกใช้วิธีเปลี่ยนเป็น Null ก็ได้ แต่ในกรณีนี้ "ลบนักศึกษา" มักหมายถึง "ลบข้อมูลที่เกี่ยวข้องทั้งหมด"
    await prisma.project.deleteMany({
      where: {
        OR: [
          { student1Id: id },
          { student2Id: id }
        ]
      }
    })

    // 2. ลบตัวนักศึกษา
    await prisma.user.delete({
      where: {
        id,
        role: 'student'
      }
    })

    return {
      success: true,
      message: 'ลบข้อมูลนักศึกษาและข้อมูลที่เกี่ยวข้องเรียบร้อยแล้ว'
    }
  } catch (error: any) {
    console.error('Delete Student Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการลบข้อมูลนักศึกษา'
    })
  }
})
