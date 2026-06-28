import jwt from 'jsonwebtoken'

// Middleware ที่จะถูกเรียกใช้ทุกครั้งที่มี Request เข้ามายังเซิร์ฟเวอร์
export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const JWT_SECRET = process.env.JWT_SECRET

  // 1. เช็คว่าเซิร์ฟเวอร์ตั้งค่า Secret Key หรือยัง
  if (!JWT_SECRET) {
    throw createError({ statusCode: 500, statusMessage: 'Server Configuration Error: JWT_SECRET is missing' })
  }

  // 2. ให้ Middleware ทำงานเฉพาะเส้นทางที่เป็น API เท่านั้น (ไม่ยุ่งกับไฟล์สแตติกหรือเพจอื่นๆ)
  if (!url.pathname.startsWith('/api')) return

  // 3. กำหนด API ที่เป็นสาธารณะ (ไม่ต้องใช้ Token ในการเข้าถึง)
  const publicApiRoutes = [
    '/api/login',
    '/api/register',
  ]

  // ถ้ายิงมาที่ API สาธารณะ ปล่อยผ่านได้เลย
  if (publicApiRoutes.some(route => url.pathname.startsWith(route))) return

  // --- ส่วนตรวจสอบ Token (Authentication) ---
  // ดึงค่า Cookie ที่ชื่อ 'auth_token'
  const token = getCookie(event, 'auth_token')

  // ถ้าไม่มี Token แนบมา แสดงว่ายังไม่ได้ล็อกอิน ให้โยน Error 401
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: No token provided'
    })
  }

  try {
    // 4. ถอดรหัส (Verify) Token ด้วย JWT_SECRET
    const decoded: any = jwt.verify(token, JWT_SECRET)
    // เก็บข้อมูล user ที่ถอดรหัสได้ไว้ใน context เพื่อให้ API ข้างในนำไปใช้ต่อได้ (ไม่ต้องถอดใหม่)
    event.context.auth = decoded

    // --- ส่วนตรวจสอบสิทธิ์ (Role-Based Access Control - RBAC) ---
    const role = decoded.role // บทบาทของผู้ใช้งาน (student, teacher, admin)

    // A. ป้องกันเส้นทางของ Admin
    if (url.pathname.startsWith('/api/admin') && role !== 'admin') {
      // กรณียกเว้น: อนุญาตให้ Role อื่นสามารถยิง GET request ไปที่ API ของ Admin ตามลิสต์นี้ได้
      const allowedAdminGetEndpoints = [
        '/api/admin/teachers',
        '/api/admin/project-detail'
      ]

      // เช็คว่าเป็นเส้นทางที่อนุญาตและเป็น GET จริงหรือไม่
      const isAllowedGet = allowedAdminGetEndpoints.some(path => url.pathname.startsWith(path)) && event.method === 'GET'
      
      // ถ้าไม่ได้เป็นแอดมิน และไม่ได้ดึงข้อมูลแบบ GET ที่อนุญาต โยน Error 403 Forbidden
      if (!isAllowedGet) {
        throw createError({
          statusCode: 403,
          statusMessage: 'Forbidden: Admin access required'
        })
      }
    }

    // B. ป้องกันเส้นทางของ Teacher (ให้แค่ Teacher และ Admin เข้าได้)
    if (url.pathname.startsWith('/api/teacher') && role !== 'teacher' && role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden: Teacher access required'
      })
    }

    // C. ป้องกันเส้นทางของ Student (ให้ Student, Teacher, Admin เข้าได้)
    if (url.pathname.startsWith('/api/student') && role !== 'student' && role !== 'teacher' && role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden: Access denied'
      })
    }

  } catch (error: any) {
    if (error.statusCode) throw error
    
    // ถ้าเกิดข้อผิดพลาดในการ Verify Token (เช่น หมดอายุ หรือ Token ปลอม) ให้ลบ Cookie ทิ้ง
    deleteCookie(event, 'auth_token')
    
    // โยน Error 401 ให้เด้งกลับไปหน้าล็อกอิน
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Invalid or expired token'
    })
  }
})
