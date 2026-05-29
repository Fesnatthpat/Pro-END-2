import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = query.id ? parseInt(query.id as string) : null

  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Missing or invalid project id' })
  }

  const prisma = getPrisma()

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        student1: {
          select: {
            id: true, username: true, email: true, fullname: true,
            tel: true, lineId: true, addressNo: true, moo: true,
            soi: true, road: true, subdistrict: true, district: true,
            province: true, zipcode: true, homePhone: true, emergencyContact: true
          }
        },
        student2: {
          select: {
            id: true, username: true, email: true, fullname: true,
            tel: true, lineId: true, addressNo: true, moo: true,
            soi: true, road: true, subdistrict: true, district: true,
            province: true, zipcode: true, homePhone: true, emergencyContact: true
          }
        },
        advisor: { select: { id: true, fullname: true, username: true } },
        coAdvisor: { select: { id: true, fullname: true, username: true } },
        reports: {
          orderBy: { createdAt: 'desc' }
        },
        exams: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!project) {
      throw createError({ statusCode: 404, statusMessage: `Project not found with ID: ${id}` })
    }

    // Map Prisma fields to match frontend expectations
    const mappedProject = {
      ...project,
      exams: project.exams.map(e => ({
        ...e,
        examTime: e.startTime,
        examLocation: e.location
      }))
    }

    return {
      success: true,
      project: mappedProject
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Admin Fetch Project Detail Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลโครงงาน'
    })
  }
})
