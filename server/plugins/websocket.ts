import ws from 'ws'

// ปลั๊กอิน Nitro สำหรับตั้งค่าการทำงานของ WebSocket บนฝั่ง Server-Side (SSR)
export default defineNitroPlugin((nitroApp) => {
  // ตรวจสอบว่าในสภาพแวดล้อม Node.js ของเซิร์ฟเวอร์มีอ็อบเจกต์ WebSocket หรือไม่
  // หากไม่มี (เช่น ใน SSR mode) ให้ทำการจำลอง (Polyfill) โดยใช้แพ็กเกจ 'ws' 
  // เพื่อให้ระบบอื่นๆ (เช่น Supabase Realtime) สามารถทำงานบนเซิร์ฟเวอร์ได้อย่างไร้รอยต่อ
  if (!globalThis.WebSocket) {
    globalThis.WebSocket = ws as any
  }
})
