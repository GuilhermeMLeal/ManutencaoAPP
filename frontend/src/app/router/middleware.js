import { NextResponse } from 'next/server';
import { parseCookies } from 'nookies';

/*
export function middleware(req) {
  const cookies = parseCookies(req);
  const token = cookies.auth_token;

  const url = req.nextUrl.clone();

  if (!token) {
    return NextResponse.redirect(new URL('/unauthorized', url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/certification-rule/*'],
};
*/