import { headers } from "next/headers";
import { isOwnerPortalHost, OWNER_PORTAL_INTERNAL_PREFIX } from "@/lib/owner-portal";

export async function getOwnerPortalBasePath() {
  const host = (await headers()).get("host");

  return isOwnerPortalHost(host) ? "" : OWNER_PORTAL_INTERNAL_PREFIX;
}
