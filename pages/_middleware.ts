import { getToken } from "next-auth/jwt";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import path from "node:path/win32";
export async function middleware(req: any) {
  const secret = process.env.JWT_SECRET ?? "";
  const token = await getToken({ req, secret: secret });
  const { pathname } = req.nextUrl;
  console.log(pathname);

  if (token || pathname.includes("/api/auth")) {
    return NextResponse.next();
  } else {
    if (pathname !== "/login" && !token) return NextResponse.redirect("/login");
  }
}
