import { compare } from 'bcryptjs'
import { getPrisma } from '../utils/prisma'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email_or_id, password } = body

  const prisma = getPrisma()
  const JWT_SECRET = process.env.JWT_SECRET

  if (!JWT_SECRET) {
    throw createError({ statusCode: 500, statusMessage: 'Server Configuration Error: JWT_SECRET is missing' })
  }

  try {
    let userData = null
    let role = ''

    // 1. Try to find in Admin table first
    const admin = await prisma.admin.findFirst({
      where: {
        OR: [
          { username: email_or_id },
          { email: email_or_id }
        ]
      }
    })

    if (admin) {
      const isPasswordValid = await compare(password, admin.password)
      if (!isPasswordValid) {
        throw createError({ statusCode: 401, statusMessage: 'รหัสผ่านไม่ถูกต้อง' })
      }
      userData = {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        fullname: admin.fullname,
        role: 'admin'
      }
      role = 'admin'
    } else {
      // 2. Try to find in Student table
      let user = await prisma.student.findFirst({
        where: {
          OR: [
            { username: email_or_id },
            { email: email_or_id }
          ]
        }
      })

      if (user) {
        role = 'student'
      } else {
        // 3. Try to find in Teacher table
        user = await prisma.teacher.findFirst({
          where: {
            OR: [
              { username: email_or_id },
              { email: email_or_id }
            ]
          }
        })
        if (user) {
          role = 'teacher'
        }
      }

      if (!user) {
        throw createError({
          statusCode: 401,
          statusMessage: 'ไม่พบผู้ใช้งานในระบบ'
        })
      }

      // 4. Compare password
      const isPasswordValid = await compare(password, user.password)
      if (!isPasswordValid) {
        throw createError({
          statusCode: 401,
          statusMessage: 'รหัสผ่านไม่ถูกต้อง'
        })
      }

      // 5. Check approval status (only for students)
      if (role === 'student' && !(user as any).isApproved) {
        throw createError({
          statusCode: 403,
          statusMessage: 'ชื่อผู้ใช้นี้ยังไม่ได้รับอนุมัติจากผู้ดูแลระบบ'
        })
      }

      userData = {
        id: user.id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        profileImage: user.profileImage,
        academicYear: (user as any).academicYear,
        tel: user.tel,
        lineId: user.lineId,
        addressNo: (user as any).addressNo,
        moo: (user as any).moo,
        soi: (user as any).soi,
        road: (user as any).road,
        subdistrict: (user as any).subdistrict,
        district: (user as any).district,
        province: (user as any).province,
        zipcode: (user as any).zipcode,
        homePhone: (user as any).homePhone,
        emergencyContact: (user as any).emergencyContact,
        role: role,
        isApproved: role === 'student' ? (user as any).isApproved : true
      }
    }

    // 5. Generate JWT Token
    const token = jwt.sign(
      { 
        userId: userData.id, 
        role: userData.role,
        email: userData.email 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // 6. Set Secure Cookie
    setCookie(event, 'auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return {
      success: true,
      user: userData,
      token
    }
  } catch (error: any) {
    console.error('Login Error:', error)
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
    })
  }
})
