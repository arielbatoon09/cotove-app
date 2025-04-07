import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define the middleware matcher
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}

// Protected routes that should only be accessible via their respective subdomains
const PROTECTED_ROUTES = ['/admin', '/dashboard', '/store']

export default function middleware(req: NextRequest) {
  const url = req.nextUrl
  const hostname = req.headers.get('host') || ''

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname

  // Define our custom domains
  const currentHost = 
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
      : hostname.replace(`.localhost:3000`, '')

  // Check if we're on the root domain (localhost:3000 or domain.com)
  const isRootDomain = hostname === 'localhost:3000' || 
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN ||
    hostname === 'www.localhost:3000' ||
    hostname === `www.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`

  // Check if the current path is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(route => path.startsWith(route))

  // If on root domain and trying to access protected route, return 404
  if (isRootDomain && isProtectedRoute) {
    return new NextResponse(null, { status: 404 })
  }

  // Handle root domain - serve the guest layout
  if (isRootDomain) {
    return NextResponse.rewrite(url)
  }

  // Rewrites for app subdomain
  if (currentHost === 'app') {
    const newUrl = new URL(`/dashboard${path}`, req.url)
    // Add cache control headers for development
    if (process.env.NODE_ENV === 'development') {
      newUrl.searchParams.set('_t', Date.now().toString())
    }
    return NextResponse.rewrite(newUrl)
  }

  // Rewrites for admin subdomain
  if (currentHost === 'admin') {
    const newUrl = new URL(`/admin${path}`, req.url)
    // Add cache control headers for development
    if (process.env.NODE_ENV === 'development') {
      newUrl.searchParams.set('_t', Date.now().toString())
    }
    return NextResponse.rewrite(newUrl)
  }

  // Handle store subdomains - only if not root domain and not other special subdomains
  if (currentHost && !['www', 'app', 'admin'].includes(currentHost) && !isRootDomain) {
    const newUrl = new URL(`/store/${currentHost}${path}`, req.url)
    // Add cache control headers for development
    if (process.env.NODE_ENV === 'development') {
      newUrl.searchParams.set('_t', Date.now().toString())
    }
    return NextResponse.rewrite(newUrl)
  }

  // Default case: handle root domain
  return NextResponse.rewrite(url)
} 