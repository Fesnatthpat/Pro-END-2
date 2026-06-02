import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { 
    projectId, titleTh, titleEn, semester, academicYear, 
    student1, student2 
  } = body

  const auth = event.context.auth
  if (!auth?.userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const prisma = getPrisma()

  try {
    // 1. Validate Project ownership
    if (projectId) {
      const project = await prisma.project.findUnique({
        where: { id: parseInt(projectId) }
      })

      if (!project) {
        throw createError({ statusCode: 404, statusMessage: 'ไม่พบข้อมูลโครงงาน' })
      }

      if (project.student1Id !== auth.userId && project.student2Id !== auth.userId) {
        throw createError({ statusCode: 403, statusMessage: 'คุณไม่มีสิทธิ์แก้ไขโครงงานนี้' })
      }

      await prisma.project.update({
        where: { id: parseInt(projectId) },
        data: {
          titleTh: titleTh !== undefined ? titleTh : undefined,
          titleEn: titleEn !== undefined ? titleEn : undefined,
          semester: semester !== undefined ? semester.toString() : undefined,
          academicYear: academicYear !== undefined ? academicYear.toString() : undefined,
        }
      })
    }

    // 2. Update Student 1 Profile (Must be the authenticated user)
    if (student1) {
      // Force ID to be the authenticated user's ID
      await prisma.student.update({
        where: { id: auth.userId },
        data: {
          fullname: student1.fullname || student1.name,
          tel: student1.tel || student1.phone,
          email: student1.email,
          lineId: student1.lineId,
          addressNo: student1.addressNo,
          moo: student1.moo,
          soi: student1.soi,
          road: student1.road,
          subdistrict: student1.subdistrict,
          district: student1.district,
          province: student1.province,
          zipcode: student1.zipcode,
          homePhone: student1.homePhone,
          emergencyContact: student1.emergencyContact
        }
      })
    }

    // 3. Update Student 2 Profile (Only if they are in the same project)
    if (student2 && (student2.id || student2.studentId || student2.username)) {
      const s2Identifier = student2.id ? { id: student2.id } : { username: student2.studentId || student2.username }
      
      const s2User = await prisma.student.findUnique({
        where: s2Identifier as any
      })

      if (s2User) {
        // Verify if s2User is actually part of the student's project
        const projectWithS2 = await prisma.project.findFirst({
          where: {
            OR: [
              { student1Id: auth.userId, student2Id: s2User.id },
              { student1Id: s2User.id, student2Id: auth.userId }
            ]
          }
        })

        if (!projectWithS2) {
          throw createError({ statusCode: 403, statusMessage: 'คุณไม่มีสิทธิ์แก้ไขข้อมูลของนักศึกษาท่านนี้' })
        }

        await prisma.student.update({
          where: { id: s2User.id },
          data: {
            fullname: student2.fullname || student2.name,
            tel: student2.tel || student2.phone,
            email: student2.email,
            lineId: student2.lineId,
            addressNo: student2.addressNo,
            moo: student2.moo,
            soi: student2.soi,
            road: student2.road,
            subdistrict: student2.subdistrict,
            district: student2.district,
            province: student2.province,
            zipcode: student2.zipcode,
            homePhone: student2.homePhone,
            emergencyContact: student2.emergencyContact
          }
        })
      }
    }

    return {
      success: true,
      message: 'บันทึกข้อมูลเรียบร้อยแล้ว'
    }
  } catch (error: any) {
    console.error('Save CP Data Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล'
    })
  }
})
