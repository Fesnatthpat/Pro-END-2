// API Endpoint สำหรับลบ Cookie การยืนยันตัวตนออกจากเบราว์เซอร์ของไคลเอนต์เมื่อต้องการออกจากระบบ (Logout)
export default defineEventHandler((event) => {
  // ลบ Cookie คีย์โทเค็น (auth_token) และคีย์เซสชัน (user_session)
  deleteCookie(event, 'auth_token')
  deleteCookie(event, 'user_session')
  
  return {
    success: true,
    message: 'Logged out successfully'
  }
})
