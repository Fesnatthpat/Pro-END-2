import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = query.id ? parseInt(query.id as string) : null
  const auth = event.context.auth

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

    // RBAC check: Only Admins, Teachers, and the project owners can see personal details
    const isOwner = auth?.role === 'student' && (project.student1?.id === auth.userId || project.student2?.id === auth.userId)
    const isAuthorized = auth?.role === 'admin' || auth?.role === 'teacher' || isOwner

    if (!isAuthorized) {
      const redactStudent = (student: any) => {
        if (!student) return null
        return {
          id: student.id,
          username: student.username,
          fullname: student.fullname,
          email: student.email,
          // Redact all personal info
          tel: null, lineId: null, addressNo: null, moo: null,
          soi: null, road: null, subdistrict: null, district: null,
          province: null, zipcode: null, homePhone: null, emergencyContact: null
        }
      }
      mappedProject.student1 = redactStudent(mappedProject.student1)
      mappedProject.student2 = redactStudent(mappedProject.student2)
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
