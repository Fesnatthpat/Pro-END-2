import { getPrisma } from '~~/server/utils/prisma'

// API Endpoint สำหรับดึงรายชื่อโครงงานทั้งหมดในระบบพร้อมฟังก์ชันค้นหา (Search) และกรองปีการศึกษา
export default defineEventHandler(async (event) => {
  const prisma = getPrisma()
  
  // อ่านพารามิเตอร์เคียวรี่ที่ส่งมา
  const query = getQuery(event)
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 999
  const search = query.search as string || ''
  const year = query.year as string || ''
  const skip = (page - 1) * limit

  // สร้างเงื่อนไขการค้นหาแบบ Dynamic (where)
  const where: any = {}
  
  // กรองตามปีการศึกษา
  if (year) {
    where.academicYear = year
  }
  
  // กรองตามคำค้นหา (ค้นจากชื่อไทย หรือ ชื่อของนักศึกษาคนที่ 1 และ คนที่ 2) แบบไม่สนใจพิมพ์เล็ก-ใหญ่ (mode: 'insensitive')
  if (search) {
    where.OR = [
      { titleTh: { contains: search, mode: 'insensitive' } },
      { student1: { fullname: { contains: search, mode: 'insensitive' } } },
      { student2: { fullname: { contains: search, mode: 'insensitive' } } }
    ]
  }

  try {
    // รันคิวรี่หาข้อมูลโครงงานและนับจำนวนทั้งหมดไปพร้อมกันแบบขนาน
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        // เชื่อมโยงดึงข้อมูลที่เกี่ยวข้องของนักศึกษา อาจารย์ที่ปรึกษา และการจองสอบ
        include: {
          student1: true,
          student2: true,
          advisor: true,
          coAdvisor: true,
          exams: {
            orderBy: { examDate: 'desc' }
          }
        },
        orderBy: {
          updatedAt: 'desc'
        }
      }),
      prisma.project.count({ where })
    ])

    return {
      success: true,
      projects,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  } catch (error: any) {
    console.error('Fetch All Projects Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลโครงงานทั้งหมด'
    })
  }
})
