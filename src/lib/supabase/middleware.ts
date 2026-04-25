import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  getOwnerPortalInternalPath,
  getOwnerPortalPublicPath,
  isOwnerPortalHost,
  shouldRewriteToOwnerPortal,
} from "@/lib/owner-portal";
import { hasSupabaseEnv, requireSupabaseEnv } from "@/lib/supabase/config";

export async function updateSession(request: NextRequest) {
  const host = request.headers.get("host");
  const rewriteToOwnerPortal = shouldRewriteToOwnerPortal(
    host,
    request.nextUrl.pathname
  );
  const internalUrl = rewriteToOwnerPortal
    ? (() => {
        const rewrittenUrl = request.nextUrl.clone();
        rewrittenUrl.pathname = getOwnerPortalInternalPath(request.nextUrl.pathname);
        return rewrittenUrl;
      })()
    : null;

  const createResponse = () =>
    internalUrl
      ? NextResponse.rewrite(internalUrl, { request })
      : NextResponse.next({
          request,
        });

  let supabaseResponse = NextResponse.next({
    request,
  });

  supabaseResponse = createResponse();

  if (!hasSupabaseEnv()) {
    return supabaseResponse;
  }

  const { url, key } = requireSupabaseEnv();

  const supabase = createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = createResponse();
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the session — IMPORTANT: avoid writing logic between
  // createServerClient and supabase.auth.getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const pathname = internalUrl?.pathname ?? request.nextUrl.pathname;
  const isOwnerAuthPath =
    pathname === "/business/login" || pathname === "/business/signup";
  const isOwnerProtectedPath =
    pathname === "/business/dashboard" ||
    pathname.startsWith("/business/dashboard/") ||
    pathname.startsWith("/business/properties");
  const isRenterAuthPath =
    pathname.startsWith("/login") || pathname.startsWith("/signup");
  const ownerLoginPath = getOwnerPortalPublicPath(host, "/login");
  const ownerDashboardPath = getOwnerPortalPublicPath(host, "/dashboard");
  const requestedOwnerPath = isOwnerPortalHost(host)
    ? request.nextUrl.pathname
    : pathname;
  const ownerRole = user?.user_metadata?.role;

  if (!user && isOwnerProtectedPath) {
    const url = request.nextUrl.clone();
    url.pathname = ownerLoginPath;
    url.searchParams.set("redirect", requestedOwnerPath);
    return NextResponse.redirect(url);
  }

  if (user && isOwnerAuthPath && ownerRole === "owner") {
    const url = request.nextUrl.clone();
    url.pathname = ownerDashboardPath;
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (user && isOwnerProtectedPath && ownerRole !== "owner") {
    const url = request.nextUrl.clone();
    url.pathname = ownerLoginPath;
    url.searchParams.set("error", "owner_access_required");
    return NextResponse.redirect(url);
  }

  // Protected routes: redirect to login if not authenticated
  if (
    !user &&
    pathname.startsWith("/dashboard")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth pages
  if (
    user &&
    isRenterAuthPath &&
    ownerRole !== "owner"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
