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

  // Handle root domain - serve the guest layout
  if (isRootDomain) {
    return NextResponse.rewrite(url)
  }

  // Rewrites for app subdomain
  if (currentHost === 'app') {
    return NextResponse.rewrite(
      new URL(`/dashboard${path}`, req.url)
    )
  }

  // Rewrites for admin subdomain
  if (currentHost === 'admin') {
    return NextResponse.rewrite(
      new URL(`/admin${path}`, req.url)
    )
  }

  // Handle store subdomains - only if not root domain and not other special subdomains
  if (currentHost && !['www', 'app', 'admin'].includes(currentHost) && !isRootDomain) {
    return NextResponse.rewrite(
      new URL(`/store/${currentHost}${path}`, req.url)
    )
  }

  // Default case: handle root domain
  return NextResponse.rewrite(url)
} 