export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:error', (error: any) => {
    if (error?.statusCode === 401 || error?.response?.status === 401 || error?.data?.statusCode === 401) {
      if (nuxtApp.$pinia) {
        const authStore = useAuthStore()
        authStore.logout()
      } else {
         navigateTo('/login')
      }
    }
  })
})
