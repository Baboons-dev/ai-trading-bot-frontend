import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAuthPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup';
  const isRootPage = request.nextUrl.pathname === '/';

  // if (!token && !isAuthPage && !isRootPage) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  //
  // if (token && (isAuthPage || isRootPage)) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/signup', '/dashboard/:path*'],
};
