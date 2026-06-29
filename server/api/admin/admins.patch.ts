import { hash } from 'bcryptjs'
import { getPrisma } from '../../utils/prisma'

// API Endpoint สำหรับแก้ไขข้อมูลผู้ดูแลระบบ (Admin Profile Update)
export default defineEventHandler(async (event) => {
  // อ่านข้อมูลฟอร์มที่ส่งมา
  const body = await readBody(event)
  const { id, username, password, fullname, email, role } = body

  // ตรวจสอบสิทธิ์การใช้งานจาก Context Auth
  const auth = event.context.auth
  const prisma = getPrisma()

  try {
    // ป้องกันไม่ให้แอดมินคนอื่นแก้ไขรหัสผ่านของแอดมินคนอื่น (อนุญาตเฉพาะเจ้าของบัญชีเท่านั้น)
    if (auth?.userId !== Number(id)) {
      if (password) {
        throw createError({ statusCode: 403, statusMessage: 'ไม่สามารถเปลี่ยนรหัสผ่านของผู้ดูแลระบบคนอื่นได้' })
      }
    }

    // เก็บอ็อบเจกต์ข้อมูลที่จะบันทึกการปรับปรุง
    const data: any = {
      username,
      fullname,
      email,
      role
    }

    // เข้ารหัสผ่านใหม่ (Hash Password) ด้วย bcryptjs ก่อนอัปเดตลงฐานข้อมูล
    if (password) {
      data.password = await hash(password, 10)
    }

    // ดำเนินการแก้ไขข้อมูลผ่าน Prisma Update
    const admin = await prisma.admin.update({
      where: { id: Number(id) },
      data
    })

    return {
      success: true,
      admin: {
        id: admin.id,
        username: admin.username
      }
    }
  } catch (error: any) {
    console.error('Update Admin Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูลผู้ดูแลระบบ'
    })
  }
})
