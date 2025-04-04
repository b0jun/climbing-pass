import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { auth } from '@/auth';

import { locales, routing } from './i18n/routing.public';

const intlMiddleware = createMiddleware(routing);

const publicRoutes = ['/gyms(/.*)?']; // * 다국어 또는 비로그인 포함
const authRoutes = ['/admin/login']; // * 로그인한 사용자가 접근할 필요 없는 페이지

const matchPath = (pathname: string, routes: string[]) => {
  const pattern = routes.map((route) => route.replace(/\[.*?\]/g, '[^/]+')).join('|');
  const regex = new RegExp(`^(/(${locales.join('|')}))?(${pattern})/?$`, 'i');
  return regex.test(pathname);
};

// * 인증 미들웨어
const authMiddleware = auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthPage = matchPath(pathname, authRoutes);
  const isLoggedIn = !!req.auth;

  // * 로그인한 사용자가 authRoutes 접근 시 리다이렉트
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/admin/home', req.nextUrl));
  }

  return NextResponse.next();
});

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublicPage = matchPath(pathname, publicRoutes);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
