import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  const studentId = auth?.userId

  if (!studentId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const prisma = getPrisma()

  try {
    const project = await prisma.project.findFirst({
      where: {
        OR: [
          { student1Id: studentId },
          { student2Id: studentId }
        ]
      },
      include: {
        advisor: { select: { id: true, fullname: true, username: true } },
        coAdvisor: { select: { id: true, fullname: true, username: true } },
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
        exams: {
          orderBy: { createdAt: 'desc' }
        },
        stepStatuses: true,
        _count: {
          select: { reports: true }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    let percentage = 0
    if (project) {
      if (project.step === 1) percentage = 0
      else if (project.step === 2) percentage = 20
      else if (project.step === 3) percentage = 40
      else if (project.step === 4) percentage = 60
      else if (project.step === 5) {
        if (project.status === 'approved') percentage = 100
        else percentage = 80
      }

      // Add a little extra for reports if in step 2 or 3
      if (project.step >= 2 && project.step < 4) {
        const reportCount = project._count?.reports || 0
        percentage += Math.min(15, reportCount * 5)
      }
    }

    return {
      success: true,
      project: project ? { ...project, percentage } : null
    }
  } catch (error: any) {
    console.error('Fetch Student Project Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลโครงงาน'
    })
  }
})
