export default defineEventHandler((event) => {
  // Remove server information disclosure headers
  setHeader(event, 'X-Powered-By', '')
  setHeader(event, 'Server', '')
  
  // Enforce HTTPS redirect (for CVE-693)
  const protocol = getHeader(event, 'x-forwarded-proto') || 'http'
  const host = getHeader(event, 'host')
  
  if (protocol === 'http' && process.env.NODE_ENV === 'production') {
    const url = `https://${host}${event.node.req.url}`
    return sendRedirect(event, url, 301)
  }
})
