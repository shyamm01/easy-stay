import Link from "next/link";
import type { ReactNode } from "react";
import { logoutOwner } from "@/app/actions/owner-auth";
import { getCurrentOwnerContext } from "@/lib/owner-auth";
import { getOwnerPortalBasePath } from "@/lib/owner-portal.server";
import { buildOwnerPortalHref } from "@/lib/owner-portal";

export default async function BusinessLayout({
  children,
}: {
  children: ReactNode;
}) {
  const portalBasePath = await getOwnerPortalBasePath();
  const ownerContext = await getCurrentOwnerContext();
  const homeHref = buildOwnerPortalHref(portalBasePath, "/");
  const loginHref = buildOwnerPortalHref(portalBasePath, "/login");
  const signupHref = buildOwnerPortalHref(portalBasePath, "/signup");
  const dashboardHref = buildOwnerPortalHref(portalBasePath, "/dashboard");
  const newPropertyHref = buildOwnerPortalHref(portalBasePath, "/properties/new");

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#eefdf4_100%)]">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <Link href={homeHref} className="text-lg font-extrabold text-dark-900">
              EasyStay Business
            </Link>
            <p className="text-xs text-dark-500">
              Owner portal for inventory, listings, and property operations
            </p>
          </div>

          <nav className="flex items-center gap-3">
            {ownerContext?.isOwner ? (
              <>
                <Link
                  href={dashboardHref}
                  className="text-sm font-medium text-dark-600 hover:text-primary-600 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href={newPropertyHref}
                  className="btn-secondary !rounded-xl !py-2.5 !px-4 !text-sm"
                >
                  New Property
                </Link>
                <form action={logoutOwner}>
                  <input type="hidden" name="redirectTo" value={homeHref} />
                  <button
                    type="submit"
                    className="btn-primary !rounded-xl !py-2.5 !px-4 !text-sm"
                  >
                    Log out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href={loginHref}
                  className="text-sm font-medium text-dark-600 hover:text-primary-600 transition-colors"
                >
                  Owner Login
                </Link>
                <Link
                  href={signupHref}
                  className="btn-primary !rounded-xl !py-2.5 !px-4 !text-sm"
                >
                  Create Owner Account
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
