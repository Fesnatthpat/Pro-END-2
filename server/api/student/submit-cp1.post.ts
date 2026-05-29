import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { 
    titleTh, titleEn, semester, academicYear, 
    student1, student2, // Profile data
    advisorId, coAdvisorId 
  } = body

  const auth = event.context.auth
  if (auth?.userId !== student1.id) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden: You can only submit CP1 for yourself' })
  }

  const prisma = getPrisma()

  try {
    // 1. Update Student 1 Profile
    await prisma.user.update({
      where: { id: student1.id },
      data: {
        fullname: student1.fullname,
        tel: student1.tel,
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

    // 2. Update Student 2 Profile (if exists)
    let s2Id = null
    if (student2 && student2.username) {
      const s2User = await prisma.user.findUnique({
        where: { username: student2.username }
      })
      
      if (s2User) {
        s2Id = s2User.id
        await prisma.user.update({
          where: { id: s2Id },
          data: {
            fullname: student2.fullname,
            tel: student2.tel,
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

    // 3. Create Project
    const project = await prisma.project.create({
      data: {
        titleTh,
        titleEn: titleEn || '',
        semester: semester.toString(),
        academicYear: academicYear.toString(),
        student1Id: student1.id,
        student2Id: s2Id,
        advisorId: advisorId ? parseInt(advisorId) : null,
        coAdvisorId: coAdvisorId ? parseInt(coAdvisorId) : null,
        step: 1,
        status: 'pending'
      }
    })

    // 4. Record Activity
    await prisma.projectActivity.create({
      data: {
        projectId: project.id,
        type: 'CP1_SUBMIT',
        title: 'ยื่นเสนอหัวข้อโครงงาน (CP1)',
        description: `ยื่นข้อเสนอโครงงานเรื่อง "${titleTh}" เข้าสู่ระบบ`,
        status: 'pending',
        icon: 'add_task',
        actorName: student1.fullname
      }
    })

    // 5. Initial Step Status
    await prisma.projectStepStatus.create({
      data: {
        projectId: project.id,
        step: 1,
        status: 'pending'
      }
    })

    return {
      success: true,
      project
    }
  } catch (error: any) {
    console.error('Submit CP1 Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูลโครงงาน'
    })
  }
})
