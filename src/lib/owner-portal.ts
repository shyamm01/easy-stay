export const OWNER_PORTAL_INTERNAL_PREFIX = "/business";

const OWNER_PORTAL_HOSTS = new Set([
  "business.easystay.in",
  "www.business.easystay.in",
  "business.localhost",
  "www.business.localhost",
]);

function normalizePath(path: string) {
  if (!path) {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function normalizeHost(host: string | null) {
  return host?.split(":")[0]?.toLowerCase() ?? "";
}

export function isOwnerPortalHost(host: string | null) {
  const normalizedHost = normalizeHost(host);

  return (
    OWNER_PORTAL_HOSTS.has(normalizedHost) ||
    normalizedHost.endsWith(".business.easystay.in")
  );
}

export function buildOwnerPortalHref(basePath: string, path: string) {
  const normalizedPath = normalizePath(path);

  if (!basePath) {
    return normalizedPath;
  }

  return normalizedPath === "/" ? basePath : `${basePath}${normalizedPath}`;
}

export function getOwnerPortalInternalPath(path: string) {
  return buildOwnerPortalHref(OWNER_PORTAL_INTERNAL_PREFIX, path);
}

export function getOwnerPortalPublicPath(host: string | null, path: string) {
  return isOwnerPortalHost(host)
    ? normalizePath(path)
    : getOwnerPortalInternalPath(path);
}

export function shouldRewriteToOwnerPortal(host: string | null, pathname: string) {
  const normalizedPath = normalizePath(pathname);

  return (
    isOwnerPortalHost(host) &&
    !normalizedPath.startsWith(OWNER_PORTAL_INTERNAL_PREFIX) &&
    !normalizedPath.startsWith("/api") &&
    !normalizedPath.startsWith("/auth/callback")
  );
}
