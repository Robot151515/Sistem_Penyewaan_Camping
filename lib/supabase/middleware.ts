import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // SIMULASI LOGIN: Cek cookie 'simulated_session'
  const hasSimulatedSession = request.cookies.has('simulated_session')
  const url = request.nextUrl.clone()

  // Protect admin routes
  if (url.pathname.startsWith('/dashboard')) {
    if (!hasSimulatedSession) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  // Prevent logged-in users from accessing login/register pages
  if (hasSimulatedSession && (url.pathname.startsWith('/login') || url.pathname.startsWith('/register'))) {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
