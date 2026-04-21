import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminPaths = ['/adminpro/dashboard', '/adminpro/content', '/adminpro/media', '/adminpro/credentials', '/adminpro/monitoring'];
  const isAdminPath = adminPaths.some(path => request.nextUrl.pathname.startsWith(path));
  
  if (isAdminPath) {
    const authCookie = request.cookies.get('admin_session');
    if (!authCookie || authCookie.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/adminpro', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};