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

// Static asset file extensions that should be accessible from public folder
const STATIC_ASSET_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico', '.webp', '.pdf', '.mp4', '.webm', '.mp3', '.woff', '.woff2', '.ttf', '.otf']

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Check if the request is for a static asset
  const isStaticAsset = STATIC_ASSET_EXTENSIONS.some(ext => path.endsWith(ext)) || path.startsWith('/images/')

  // If the request is for a static asset, don't rewrite it
  if (isStaticAsset) {
    return NextResponse.next()
  }

  // For all other cases, proceed with the request
  return NextResponse.next()
} 