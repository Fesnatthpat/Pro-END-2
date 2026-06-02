export default defineEventHandler((event) => {
  // Remove headers that disclose technology stack
  removeResponseHeader(event, 'X-Powered-By')
  removeResponseHeader(event, 'Server')
})
