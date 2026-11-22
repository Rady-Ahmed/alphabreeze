import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('alphabreeze_auth') || request.cookies.get('alphabreeze_session');

  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    if (!authCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // إذا كان المستخدم مسجلاً الدخول ويحاول الوصول لصفحة الدخول، حوله للوحة التحكم
  if (request.nextUrl.pathname.startsWith('/admin/login') && authCookie) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
