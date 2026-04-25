import { redirect } from "next/navigation";
import OwnerSignupForm from "@/components/business/OwnerSignupForm";
import { getCurrentOwnerContext } from "@/lib/owner-auth";
import { buildOwnerPortalHref } from "@/lib/owner-portal";
import { getOwnerPortalBasePath } from "@/lib/owner-portal.server";

export default async function OwnerSignupPage() {
  const portalBasePath = await getOwnerPortalBasePath();
  const ownerContext = await getCurrentOwnerContext();
  const dashboardHref = buildOwnerPortalHref(portalBasePath, "/dashboard");

  if (ownerContext?.isOwner) {
    redirect(dashboardHref);
  }

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <div className="section-badge mb-6">
            <span>📋</span> Owner onboarding
          </div>
          <h1
            className="text-4xl font-extrabold text-dark-900 sm:text-5xl"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Create a Dedicated Owner Account
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-dark-600">
            Set up a business login for your team, publish property inventory,
            and keep operational access separated from renters.
          </p>
        </div>

        <OwnerSignupForm
          portalBasePath={portalBasePath}
          redirectTo={dashboardHref}
        />
      </div>
    </section>
  );
}
