import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const auth = event.context.auth

  if (!auth?.userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const { 
    fullname, tel, email, lineId, 
    addressNo, moo, soi, road, subdistrict, district, province, zipcode, 
    homePhone, emergencyContact 
  } = body

  const prisma = getPrisma()

  try {
    const user = await prisma.student.update({
      where: { id: auth.userId },
      data: {
        fullname: fullname !== undefined ? fullname : undefined,
        tel: tel !== undefined ? tel : undefined,
        email: email !== undefined ? email : undefined,
        lineId: lineId !== undefined ? lineId : undefined,
        addressNo: addressNo !== undefined ? addressNo : undefined,
        moo: moo !== undefined ? moo : undefined,
        soi: soi !== undefined ? soi : undefined,
        road: road !== undefined ? road : undefined,
        subdistrict: subdistrict !== undefined ? subdistrict : undefined,
        district: district !== undefined ? district : undefined,
        province: province !== undefined ? province : undefined,
        zipcode: zipcode !== undefined ? zipcode : undefined,
        homePhone: homePhone !== undefined ? homePhone : undefined,
        emergencyContact: emergencyContact !== undefined ? emergencyContact : undefined,
      }
    })

    return {
      success: true,
      user: {
        id: user.id,
        fullname: user.fullname,
        tel: user.tel,
        email: user.email,
        lineId: user.lineId,
      }
    }
  } catch (error: any) {
    console.error('Update Profile Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลโปรไฟล์'
    })
  }
})
