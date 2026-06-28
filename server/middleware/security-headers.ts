export default defineEventHandler((event) => {
  // 1. เคลียร์ Headers ที่อาจเปิดเผยข้อมูลเซิร์ฟเวอร์
  setHeader(event, 'X-Powered-By', '')
  setHeader(event, 'Server', '')
  
  // 2. ตั้งค่า Security Headers พื้นฐานเพื่อป้องกันการโจมตีทางไซเบอร์
  setHeader(event, 'X-Content-Type-Options', 'nosniff') // ป้องกันเบราว์เซอร์เดาประเภทไฟล์เอง (MIME sniffing)
  setHeader(event, 'X-Frame-Options', 'SAMEORIGIN') // ป้องกันการถูกดึงเว็บไปแสดงใน iframe ของเว็บอื่น (ป้องกัน Clickjacking)
  setHeader(event, 'Referrer-Policy', 'strict-origin-when-cross-origin') // จัดการว่าส่ง Referrer ข้อมูลใดบ้างออกไปภายนอก
  setHeader(event, 'Permissions-Policy', 'camera=(), microphone=(), geolocation=()') // บล็อกสิทธิ์การเข้าถึงกล้อง ไมโครโฟน และตำแหน่ง
  
  // 3. ตั้งค่า Content Security Policy (CSP) เพื่อป้องกัน XSS Attack (สำคัญมาก)
  // เป็นการระบุ White-list ชัดเจนว่าเว็บเราจะอนุญาตให้โหลด Resource ต่างๆ จากโดเมนไหนได้บ้าง
  const cspHeader = [
    "default-src 'self'", // ค่าเริ่มต้น: อนุญาตเฉพาะโหลดของจากโดเมนตัวเอง
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net", // JS: อนุญาต inline script และจาก jsdelivr
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net", // CSS: อนุญาต inline และจาก CDN ต่างๆ
    "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net data:", // ฟอนต์
    "img-src 'self' data: https: blob:", // รูปภาพ: อนุญาต data url และ https ทั่วไป
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co", // API Connections: อนุญาตติดต่อกับ Supabase
    "frame-ancestors 'none'", // ห้ามนำเว็บเราไปใส่ใน iframe เด็ดขาด
    "base-uri 'self'", // ห้ามใช้ <base> tag เปลี่ยน URL ตั้งต้น
    "form-action 'self'", // ให้ Submit ฟอร์มไปที่โดเมนตัวเองเท่านั้น
    "object-src 'none'" // บล็อก Flash/Java applets
  ].join('; ')
  
  // นำค่า CSP ที่สร้างไว้ใส่ลงไปใน Header ของ Response
  setHeader(event, 'Content-Security-Policy', cspHeader)
  
  // 4. บังคับใช้ HTTPS ในฝั่ง Production (HSTS)
  const protocol = getHeader(event, 'x-forwarded-proto') || 'http'
  const host = getHeader(event, 'host')
  
  if (process.env.NODE_ENV === 'production') {
    // ส่ง HSTS Header บอกเบราว์เซอร์ให้เชื่อมต่อด้วย HTTPS เท่านั้น เป็นเวลา 1 ปีเต็ม (31536000 วินาที)
    setHeader(event, 'Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    
    // ถ้าผู้ใช้เผลอเข้าด้วย HTTP ให้ทำ Redirect (301) ไปเป็น HTTPS อัตโนมัติ
    if (protocol === 'http') {
      const url = `https://${host}${event.node.req.url}`
      return sendRedirect(event, url, 301)
    }
  }
})
