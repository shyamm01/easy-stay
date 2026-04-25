import OwnerPropertyForm from "@/components/business/OwnerPropertyForm";
import { requireOwnerContext } from "@/lib/owner-auth";
import { buildOwnerPortalHref } from "@/lib/owner-portal";
import { getOwnerPortalBasePath } from "@/lib/owner-portal.server";

export default async function NewOwnerPropertyPage() {
  const portalBasePath = await getOwnerPortalBasePath();
  const loginHref = buildOwnerPortalHref(portalBasePath, "/login");

  await requireOwnerContext(loginHref);

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="max-w-3xl">
          <div className="section-badge mb-4">
            <span>🏗️</span> New inventory
          </div>
          <h1
            className="text-3xl font-extrabold text-dark-900 sm:text-4xl"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Add a Property, Floors, and Live Listings
          </h1>
          <p className="mt-3 text-base leading-relaxed text-dark-600">
            Create the property structure first, then publish every flat or room with
            layout details like 2BHK, 1RK, attached bathroom, carpet area, and pricing.
          </p>
        </div>

        <OwnerPropertyForm portalBasePath={portalBasePath} />
      </div>
    </section>
  );
}
