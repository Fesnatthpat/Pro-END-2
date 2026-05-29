export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  // 1. รายการหน้าที่อนุญาตให้เข้าถึงได้โดยไม่ต้อง Login
  const publicPages = ['/login', '/register']
  const isPublicPage = publicPages.includes(to.path)

  // 2. ถ้ายังไม่ได้ Login และพยายามเข้าหน้าที่ไม่ใช่ Public
  if (!authStore.isLoggedIn && !isPublicPage) {
    return navigateTo('/login')
  }

  // 3. ถ้า Login แล้ว
  if (authStore.isLoggedIn) {
    const role = authStore.userRole

    // ถ้าจะไปหน้า Login หรือ Register ทั้งที่ Login แล้ว ให้ดีดไปตามหน้าหลักของ Role นั้น
    if (isPublicPage) {
      if (role === 'admin') return navigateTo('/admin')
      if (role === 'teacher') return navigateTo('/teacher')
      return navigateTo('/student')
    }

    // --- ระบบตรวจสอบสิทธิ์ตาม Role (Role-based Access Control) ---

    // ป้องกันคนที่ไม่ใช่ Admin เข้าหน้า /admin
    if (to.path.startsWith('/admin') && role !== 'admin') {
      return navigateTo(role === 'teacher' ? '/teacher' : '/student')
    }

    // ป้องกันคนที่ไม่ใช่ Teacher เข้าหน้า /teacher
    if (to.path.startsWith('/teacher') && role !== 'teacher') {
      if (role === 'admin') return navigateTo('/admin')
      return navigateTo('/student')
    }

    // ป้องกันคนที่ไม่ใช่ Student เข้าหน้า /student (อนุญาต Admin/Teacher เข้าดูได้)
    if (to.path.startsWith('/student') && role !== 'student' && role !== 'admin' && role !== 'teacher') {
      return navigateTo('/login')
    }
  }
})
