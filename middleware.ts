import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path starts with /dashboard or /profile
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/profile")

  if (isProtectedRoute) {
    const token = await getToken({ req: request })

    // Check if the user is not authenticated, redirect to the login page
    if (!token) {
      const url = new URL("/auth/login", request.url)
      // Properly encode the pathname to ensure it works as a callback URL
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
}

