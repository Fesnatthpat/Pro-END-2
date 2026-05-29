export default defineEventHandler((event) => {
  deleteCookie(event, 'auth_token')
  deleteCookie(event, 'user_session')
  
  return {
    success: true,
    message: 'Logged out successfully'
  }
})
