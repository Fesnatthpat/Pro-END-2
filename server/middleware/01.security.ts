export default defineEventHandler((event) => {
  // ลบ Headers ที่เปิดเผยข้อมูลเบื้องหลังของเซิร์ฟเวอร์ (Information Disclosure) เพื่อเพิ่มความปลอดภัย
  removeResponseHeader(event, 'X-Powered-By') // ซ่อนข้อมูล Framework (เช่น Nuxt, Express)
  removeResponseHeader(event, 'Server')       // ซ่อนข้อมูลประเภท Server (เช่น Nginx, Apache)
})
