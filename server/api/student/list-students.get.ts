import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const prisma = getPrisma()
  const auth = event.context.auth

  try {
    const students = await prisma.student.findMany({
      where: {
        isApproved: true,
        // Optional: Exclude the current user
        id: {
          not: auth?.userId
        }
      },
      select: {
        id: true,
        username: true,
        fullname: true,
        email: true,
        tel: true,
        lineId: true,
        addressNo: true,
        moo: true,
        soi: true,
        road: true,
        subdistrict: true,
        district: true,
        province: true,
        zipcode: true,
        homePhone: true,
        emergencyContact: true
      },
      orderBy: {
        fullname: 'asc'
      }
    })

    return {
      success: true,
      students
    }
  } catch (error: any) {
    console.error('Fetch Students List Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลนักศึกษา'
    })
  }
})
