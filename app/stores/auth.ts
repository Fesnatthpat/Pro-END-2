import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // --- MOCK MODE: จำลองสถานะการ Login เพื่อทดสอบหน้าบ้าน ---
  // กำหนด role ที่ต้องการทดสอบ (admin, teacher, student)
  const user = ref({
    id: 1,
    email: 'mock@example.com',
    role: 'student', // <--- แก้ตรงนี้เพื่อสลับ Role (admin, teacher, student)
    fname: 'ผู้ทดสอบ',
    lname: 'ระบบ'
  })

  /*
  // ============================================================================
  // --- โค้ดเก่าที่ใช้งานได้ปกติ (คอมเมนต์ไว้เพื่อปิดการทำงานชั่วคราว) ---
  // ============================================================================
  const user = ref(null)
  */
  const userCookie = useCookie('user_session')

  // --- MOCK MODE: ปิดการดึงข้อมูลจาก Cookie (เพื่อไม่ให้ค่าเก่ามาทับค่าจำลอง) ---
  /*
  // Initialize user from cookie on store creation
  if (userCookie.value) {
    user.value = userCookie.value
  }
  */

  const isLoggedIn = computed(() => !!user.value)
  const userRole = computed(() => user.value?.role || '')

  async function login(credentials) {
    console.log('Store: Initiating login request...')
    try {
      // --- MOCK MODE: จำลองว่าล็อกอินผ่านโดยไม่ต้องเรียก API ---
      const data = {
        success: true,
        user: { 
          id: 1, 
          email: credentials.email || 'mock@example.com', 
          role: 'admin', 
          fname: 'ผู้ทดสอบ', 
          lname: 'ล็อกอิน' 
        }
      }

      /*
      // ============================================================================
      // --- โค้ดเก่าที่ยิง API ของจริง (คอมเมนต์ไว้) ---
      // ============================================================================
      const data = await $fetch('/api/login', {
        method: 'POST',
        body: credentials
      })
      */

      console.log('Store: Login response received:', data?.success ? 'SUCCESS' : 'FAILURE')

      if (data?.success) {
        user.value = data.user
        userCookie.value = data.user
        console.log('Store: User state updated, role:', data.user.role)
        return data.user
      }
    } catch (err) {
      console.error('Store: Login error details:', err)
      const errorMessage = err.data?.statusMessage || 'เข้าสู่ระบบล้มเหลว'
      throw new Error(errorMessage)
    }
  }

  async function logout() {
    try {
      await $fetch('/api/logout', { method: 'POST' })
    } catch (e) {
      console.error('Logout API error:', e)
    } finally {
      user.value = null
      userCookie.value = null
      navigateTo('/login')
    }
  }

  function setUser(userData) {
    user.value = userData
    userCookie.value = userData
  }

  return {
    user,
    isLoggedIn,
    userRole,
    login,
    logout,
    setUser
  }
})
