import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { auth } from '@/auth';

import { locales, routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// * 경로 정의
const publicRoutes = ['/']; // 로그인 여부와 상관없으며 다국어 아닌 페이지
const authRoutes = ['/login']; // 로그인한 사용자가 접근할 필요 없는 페이지
const noLocaleRoutes = ['/', '/login', '/home', '/manager']; // 다국어가 없는 페이지

const testPathnameRegex = (pages: string[], pathName: string): boolean => {
  const pathsWithParams = pages.map((p) => p.replace(/\[.*?\]/g, '[^/]+'));
  return RegExp(
    `^(/(${locales.join('|')}))?(${pathsWithParams.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i',
  ).test(pathName);
};

// 다국어 페이지 체크 (app/[locale]/ 하위)
const isLocalePage = (pathname: string): boolean => {
  return locales.some((locale) => pathname.startsWith(`/${locale}/`));
};

// 비다국어 페이지 체크
const isNoLocalePage = (pathname: string): boolean => {
  return noLocaleRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
};

// 인증 미들웨어
const authMiddleware = auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthPage = testPathnameRegex(authRoutes, pathname);
  const isLogged = !!req.auth;

  // 로그인한 사용자가 authRoutes 접근 시 리다이렉트
  if (isLogged && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  // 다국어 페이지와 publicRoutes 아닌 경우에만 인증 체크
  if (!isLocalePage(pathname) && !testPathnameRegex(publicRoutes, pathname) && !isLogged && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next();
});

// 메인 미들웨어
export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 다국어 페이지: app/[locale]/ 하위, 로그인 여부 상관없음
  if (isLocalePage(pathname)) {
    return intlMiddleware(req);
  }

  // [locale] 없는 다국어 경로 리다이렉트 (noLocaleRoutes 제외)
  const isPublicPage = testPathnameRegex(publicRoutes, pathname);

  if (!isNoLocalePage(pathname) && !pathname.startsWith('/_')) {
    const newUrl = new URL(`/${routing.defaultLocale}${pathname}`, req.nextUrl);
    return NextResponse.redirect(newUrl);
  }

  // 공개 경로 (/): 다국어 적용 안 함
  if (isPublicPage) {
    return NextResponse.next();
  }

  // 비다국어 경로
  return (authMiddleware as any)(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
