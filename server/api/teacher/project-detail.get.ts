import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  // ดึงข้อมูล Query Parameters ที่แนบมากับ URL (เช่น ?id=1)
  const query = getQuery(event)
  
  // ตรวจสอบและแปลงค่า id จาก String เป็น Number
  const id = query.id ? parseInt(query.id as string) : null

  // หากไม่มี id หรือ id ไม่ใช่ตัวเลขที่ถูกต้อง ให้โยน Error 400
  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Missing or invalid project id' })
  }

  // เรียกใช้ Prisma Client สำหรับการ Query ฐานข้อมูล
  const prisma = getPrisma()

  try {
    // ค้นหาโครงงาน (Project) ที่มี id ตรงกันแบบเจาะจง (Unique)
    const project = await prisma.project.findUnique({
      where: { id },
      // include ใช้สำหรับดึงข้อมูลจากตารางที่มีความสัมพันธ์ (Relations) กันออกมาพร้อมกัน
      include: {
        // ดึงข้อมูลนักศึกษาคนที่ 1 (ระบุเฉพาะฟิลด์ที่ต้องการเพื่อลดขนาดข้อมูล)
        student1: {
          select: {
            id: true, username: true, email: true, fullname: true,
            tel: true, lineId: true, addressNo: true, moo: true,
            soi: true, road: true, subdistrict: true, district: true,
            province: true, zipcode: true, homePhone: true, emergencyContact: true
          }
        },
        // ดึงข้อมูลนักศึกษาคนที่ 2 (ถ้ามี)
        student2: {
          select: {
            id: true, username: true, email: true, fullname: true,
            tel: true, lineId: true, addressNo: true, moo: true,
            soi: true, road: true, subdistrict: true, district: true,
            province: true, zipcode: true, homePhone: true, emergencyContact: true
          }
        },
        // ดึงข้อมูลอาจารย์ที่ปรึกษาหลัก
        advisor: { select: { id: true, fullname: true, username: true } },
        // ดึงข้อมูลอาจารย์ที่ปรึกษาร่วม
        coAdvisor: { select: { id: true, fullname: true, username: true } },
        // ดึงข้อมูลประวัติการส่งรายงานต่างๆ เรียงลำดับจากใหม่ไปเก่า (desc)
        reports: {
          orderBy: { createdAt: 'desc' }
        },
        // ดึงข้อมูลกำหนดการสอบต่างๆ เรียงลำดับจากใหม่ไปเก่า (desc)
        exams: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    // ถ้า Query แล้วไม่เจอข้อมูลในฐานข้อมูล ให้โยน Error 404
    if (!project) {
      throw createError({ statusCode: 404, statusMessage: `Project not found with ID: ${id}` })
    }

    // ทำการ Map ข้อมูล (แปลงชื่อฟิลด์บางส่วน) ให้ตรงกับรูปแบบที่ฝั่ง Frontend ใช้งาน
    const mappedProject = {
      ...project,
      // แปลง key ของ exams ให้ตรงกัน (startTime -> examTime, location -> examLocation)
      exams: project.exams.map(e => ({
        ...e,
        examTime: e.startTime,
        examLocation: e.location
      }))
    }

    // คืนค่า Response กลับไปที่ Client ในรูปแบบ JSON
    return {
      success: true,
      project: mappedProject
    }
  } catch (error: any) {
    // กรณีที่เกิด Error ที่มีการกำหนด statusCode ไว้แล้ว (เช่น ขาด ID หรือหาไม่เจอ) ให้โยน Error นั้นต่อไปเลย
    if (error.statusCode) {
      throw error
    }
    // ถ้าเป็น Error อื่นๆ จากเซิร์ฟเวอร์หรือ Database ให้ Log ไว้และโยน Error 500
    console.error('Fetch Project Detail Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลโครงงาน'
    })
  }
})
