// ปลั๊กอิน Nuxt สำหรับจัดการการยืนยันสิทธิ์และความปลอดภัยส่วนกลาง (Global Auth Handler)
export default defineNuxtPlugin((nuxtApp) => {
  // ดักจับข้อผิดพลาดทั่วทั้งแอปพลิเคชัน (Global App Errors Hook)
  nuxtApp.hook('app:error', (error: any) => {
    // หากพบข้อผิดพลาดรหัส 401 Unauthorized (สิทธิ์ผู้ใช้หมดอายุ หรือ Token ไม่ถูกต้อง)
    if (error?.statusCode === 401 || error?.response?.status === 401 || error?.data?.statusCode === 401) {
      if (nuxtApp.$pinia) {
        // ดึง Auth Store มาสั่งการสลัด Token/ลบ Cookie และเปลี่ยนหน้าเป็นล็อกอิน
        const authStore = useAuthStore()
        authStore.logout()
      } else {
         // กรณีโหลด Pinia ไม่ทัน ให้วิ่งไปหน้าล็อกอินโดยตรง
         navigateTo('/login')
      }
    }
  })
})
