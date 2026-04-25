import { redirect } from "next/navigation";
import OwnerLoginForm from "@/components/business/OwnerLoginForm";
import { getCurrentOwnerContext } from "@/lib/owner-auth";
import { buildOwnerPortalHref } from "@/lib/owner-portal";
import { getOwnerPortalBasePath } from "@/lib/owner-portal.server";

function getOwnerErrorMessage(error?: string) {
  if (error === "owner_access_required") {
    return "Please log in with an owner account to access the business portal.";
  }

  return undefined;
}

export default async function OwnerLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string; error?: string }>;
}) {
  const portalBasePath = await getOwnerPortalBasePath();
  const ownerContext = await getCurrentOwnerContext();
  const dashboardHref = buildOwnerPortalHref(portalBasePath, "/dashboard");

  if (ownerContext?.isOwner) {
    redirect(dashboardHref);
  }

  const resolvedSearchParams = await searchParams;

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <div className="section-badge mb-6">
            <span>🔐</span> Separate owner access
          </div>
          <h1
            className="text-4xl font-extrabold text-dark-900 sm:text-5xl"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Business Login for Owners and Property Managers
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-dark-600">
            Use your owner account to manage business inventory on EasyStay without
            overlapping with the renter journey.
          </p>
        </div>

        <OwnerLoginForm
          portalBasePath={portalBasePath}
          redirectTo={resolvedSearchParams.redirect || dashboardHref}
          initialError={getOwnerErrorMessage(resolvedSearchParams.error)}
        />
      </div>
    </section>
  );
}
