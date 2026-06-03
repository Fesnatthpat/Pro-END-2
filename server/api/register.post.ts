import { hash } from 'bcryptjs'
import { getPrisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { 
    username, email, password, fullname, academicYear, tel, lineId, profileImage,
    addressNo, moo, soi, road, subdistrict, district, province, zipcode,
    homePhone, emergencyContact
  } = body

  const prisma = getPrisma()

  try {
    // 1. Check if username or email already exists in ANY table
    const [existingStudent, existingTeacher, existingAdmin] = await Promise.all([
      prisma.student.findFirst({ where: { OR: [{ username }, { email }] } }),
      prisma.teacher.findFirst({ where: { OR: [{ username }, { email }] } }),
      prisma.admin.findFirst({ where: { OR: [{ username }, { email }] } })
    ])

    const existingUser = existingStudent || existingTeacher || existingAdmin

    if (existingUser) {
      const isUsername = existingUser.username === username
      throw createError({
        statusCode: 400,
        statusMessage: isUsername ? 'ชื่อผู้ใช้นี้ถูกใช้งานไปแล้ว' : 'อีเมลนี้ถูกใช้งานไปแล้ว'
      })
    }

    // 2. Hash password
    const hashedPassword = await hash(password, 10)

    // 3. Create student in database
    const student = await prisma.student.create({
      data: {
        username,
        email,
        password: hashedPassword,
        fullname,
        academicYear: academicYear?.toString(),
        tel,
        lineId,
        profileImage,
        addressNo,
        moo,
        soi,
        road,
        subdistrict,
        district,
        province,
        zipcode,
        homePhone,
        emergencyContact
      }
    })

    return {
      success: true,
      user: {
        id: student.id,
        username: student.username,
        email: student.email
      }
    }
  } catch (error: any) {
    console.error('Registration Error:', error)
    
    // ถ้าเป็น Error ที่เราสร้างเอง (เช่น User ซ้ำ) ให้ส่งกลับไปตามนั้น
    if (error.statusCode) throw error

    // ถ้าเป็น Error อื่นๆ จาก Database (เช่น Table not found)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง'
    })
  }
})
