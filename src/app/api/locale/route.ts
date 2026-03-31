import { NextResponse } from "next/server";
import { isLocale, localeCookieName } from "@/lib/i18n";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang");
  const next = url.searchParams.get("next") || "/";
  const locale = isLocale(lang) ? lang : "ru";

  const response = NextResponse.redirect(new URL(next, url.origin));
  response.cookies.set(localeCookieName, locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365
  });

  return response;
}
