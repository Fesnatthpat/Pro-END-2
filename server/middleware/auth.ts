import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const JWT_SECRET = process.env.JWT_SECRET

  if (!JWT_SECRET) {
    throw createError({ statusCode: 500, statusMessage: 'Server Configuration Error: JWT_SECRET is missing' })
  }

  // Only intercept API requests
  if (!url.pathname.startsWith('/api')) return

  // Define routes that DON'T need authentication
  const publicApiRoutes = [
    '/api/login',
    '/api/register',
  ]

  if (publicApiRoutes.some(route => url.pathname.startsWith(route))) return

  // 1. Check for token
  const token = getCookie(event, 'auth_token')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: No token provided'
    })
  }

  try {
    // 2. Verify token
    const decoded: any = jwt.verify(token, JWT_SECRET)
    event.context.auth = decoded

    // 3. Role-Based Access Control (RBAC)
    const role = decoded.role

    // Admin routes protection
    if (url.pathname.startsWith('/api/admin') && role !== 'admin') {
      // List of admin endpoints that are allowed for GET by any authenticated user
      const allowedAdminGetEndpoints = [
        '/api/admin/teachers',
        '/api/admin/project-detail'
      ]

      // Check if it's an allowed endpoint and a GET request
      const isAllowedGet = allowedAdminGetEndpoints.some(path => url.pathname.includes(path)) && event.method === 'GET'
      
      if (!isAllowedGet) {
        throw createError({
          statusCode: 403,
          statusMessage: 'Forbidden: Admin access required'
        })
      }
    }

    // Teacher routes protection
    if (url.pathname.startsWith('/api/teacher') && role !== 'teacher' && role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden: Teacher access required'
      })
    }

    // Student routes protection
    if (url.pathname.startsWith('/api/student') && role !== 'student' && role !== 'teacher' && role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden: Access denied'
      })
    }

  } catch (error: any) {
    if (error.statusCode) throw error
    
    // If token is invalid or expired, clear it
    deleteCookie(event, 'auth_token')
    
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Invalid or expired token'
    })
  }
})
