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
    // 1. Update Project if projectId is provided
    if (projectId) {
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

    // 2. Update Student 1 Profile
    if (student1) {
      await prisma.student.update({
        where: { id: student1.id || auth.userId },
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

    // 3. Update Student 2 Profile (if provided)
    if (student2 && (student2.id || student2.studentId || student2.username)) {
      const s2Identifier = student2.id ? { id: student2.id } : { username: student2.studentId || student2.username }
      
      const s2User = await prisma.student.findUnique({
        where: s2Identifier as any
      })

      if (s2User) {
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
      statusMessage: error.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล'
    })
  }
})
