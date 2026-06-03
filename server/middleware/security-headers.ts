export default defineEventHandler((event) => {
  // Remove server information disclosure headers
  setHeader(event, 'X-Powered-By', '')
  setHeader(event, 'Server', '')
  
  // Security Headers
  setHeader(event, 'X-Content-Type-Options', 'nosniff')
  setHeader(event, 'X-Frame-Options', 'SAMEORIGIN')
  setHeader(event, 'Referrer-Policy', 'strict-origin-when-cross-origin')
  setHeader(event, 'Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // Robust Content Security Policy (CSP)
  const cspHeader = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net",
    "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'"
  ].join('; ')
  
  setHeader(event, 'Content-Security-Policy', cspHeader)
  
  // Enforce HTTPS redirect and HSTS (for production)
  const protocol = getHeader(event, 'x-forwarded-proto') || 'http'
  const host = getHeader(event, 'host')
  
  if (process.env.NODE_ENV === 'production') {
    // HSTS (HTTP Strict Transport Security)
    setHeader(event, 'Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    
    if (protocol === 'http') {
      const url = `https://${host}${event.node.req.url}`
      return sendRedirect(event, url, 301)
    }
  }
})
