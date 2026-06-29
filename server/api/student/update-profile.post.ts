import { getPrisma } from '~~/server/utils/prisma'

// API Endpoint สำหรับอัปเดตข้อมูลส่วนตัวและที่อยู่ของนักศึกษา
export default defineEventHandler(async (event) => {
  // อ่านข้อมูลที่ส่งมาจากฟอร์ม (Body Request)
  const body = await readBody(event)
  
  // ตรวจสอบข้อมูลการยืนยันสิทธิ์จาก Context Middleware
  const auth = event.context.auth

  // หากไม่มีข้อมูลรหัสผู้ใช้แปลว่ายังไม่ได้เข้าสู่ระบบ ให้ส่งข้อผิดพลาด 401
  if (!auth?.userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  // แยกตัวแปรค่าข้อมูลส่วนตัวและที่อยู่
  const { 
    fullname, tel, email, lineId, 
    addressNo, moo, soi, road, subdistrict, district, province, zipcode, 
    homePhone, emergencyContact 
  } = body

  const prisma = getPrisma()

  try {
    // ดำเนินการอัปเดตข้อมูลนักศึกษาโดยอิงจากไอดี (Prisma Update)
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

    // ส่งข้อความความสำเร็จพร้อมแนบข้อมูลผู้ใช้งานที่อัปเดตใหม่กลับไป
    return {
      success: true,
      user: {
        id: user.id,
        fullname: user.fullname,
        tel: user.tel,
        email: user.email,
        lineId: user.lineId,
        addressNo: user.addressNo,
        moo: user.moo,
        soi: user.soi,
        road: user.road,
        subdistrict: user.subdistrict,
        district: user.district,
        province: user.province,
        zipcode: user.zipcode,
        homePhone: user.homePhone,
        emergencyContact: user.emergencyContact
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
