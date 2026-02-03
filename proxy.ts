import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PASSWORD = process.env.SITE_PASSWORD || 'wedding2026'

export function proxy(request: NextRequest) {
  // Check if user has valid session cookie
  const sessionCookie = request.cookies.get('wedding-auth')
  
  // If accessing login page, allow through
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.next()
  }

  // If no valid session, redirect to login
  if (!sessionCookie || sessionCookie.value !== PASSWORD) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Protect all routes except API routes and static files
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}