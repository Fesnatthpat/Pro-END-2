import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const userCookie = useCookie('user_session')

  // Initialize user from cookie on store creation
  if (userCookie.value) {
    user.value = userCookie.value
  }

  const isLoggedIn = computed(() => !!user.value)
  const userRole = computed(() => user.value?.role || '')

  async function login(credentials) {
    try {
      const data = await $fetch('/api/login', {
        method: 'POST',
        body: credentials
      })

      if (data?.success) {
        user.value = data.user
        userCookie.value = data.user
        return data.user
      }
    } catch (err) {
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
