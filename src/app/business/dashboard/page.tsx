import Link from "next/link";
import { desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import {
  properties,
  propertyFloors,
  propertyListings,
  propertyUnits,
} from "@/db/schema";
import { requireOwnerContext } from "@/lib/owner-auth";
import { buildOwnerPortalHref } from "@/lib/owner-portal";
import { getOwnerPortalBasePath } from "@/lib/owner-portal.server";

export default async function OwnerDashboardPage() {
  const portalBasePath = await getOwnerPortalBasePath();
  const loginHref = buildOwnerPortalHref(portalBasePath, "/login");
  const newPropertyHref = buildOwnerPortalHref(portalBasePath, "/properties/new");
  const ownerContext = await requireOwnerContext(loginHref);

  const ownerProperties = await db
    .select()
    .from(properties)
    .where(eq(properties.ownerId, ownerContext.owner.id))
    .orderBy(desc(properties.createdAt));

  const propertyIds = ownerProperties.map((property) => property.id);

  const [floors, units, listings] = propertyIds.length
    ? await Promise.all([
        db
          .select()
          .from(propertyFloors)
          .where(inArray(propertyFloors.propertyId, propertyIds)),
        db
          .select()
          .from(propertyUnits)
          .where(inArray(propertyUnits.propertyId, propertyIds)),
        db
          .select()
          .from(propertyListings)
          .where(inArray(propertyListings.propertyId, propertyIds)),
      ])
    : [[], [], []];

  const floorCountByProperty = new Map<string, number>();
  const unitCountByProperty = new Map<string, number>();
  const listingCountByProperty = new Map<string, number>();

  floors.forEach((floor) => {
    floorCountByProperty.set(
      floor.propertyId,
      (floorCountByProperty.get(floor.propertyId) ?? 0) + 1
    );
  });

  units.forEach((unit) => {
    unitCountByProperty.set(
      unit.propertyId,
      (unitCountByProperty.get(unit.propertyId) ?? 0) + 1
    );
  });

  listings.forEach((listing) => {
    listingCountByProperty.set(
      listing.propertyId,
      (listingCountByProperty.get(listing.propertyId) ?? 0) + 1
    );
  });

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="section-badge mb-4">
              <span>📊</span> Owner Dashboard
            </div>
            <h1
              className="text-3xl font-extrabold text-dark-900 sm:text-4xl"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Welcome back, {ownerContext.owner.fullName}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-dark-600">
              Manage your business inventory, monitor property structure, and publish
              room or flat listings from one place.
            </p>
          </div>

          <Link href={newPropertyHref} className="btn-primary !rounded-xl !py-3 !px-5">
            + Add property listing
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              label: "Properties",
              value: ownerProperties.length,
              note: "Buildings or houses added to your business portal",
            },
            {
              label: "Floors & Units",
              value: floors.length + units.length,
              note: "Floor inventory and rentable flats or rooms",
            },
            {
              label: "Published Listings",
              value: listings.length,
              note: "Live rental listings created by your owner account",
            },
          ].map((card) => (
            <div
              key={card.label}
              className="glass rounded-3xl border border-white/60 p-6 shadow-xl"
            >
              <p className="text-sm font-medium text-dark-500">{card.label}</p>
              <p className="mt-3 text-4xl font-extrabold text-dark-900">
                {card.value}
              </p>
              <p className="mt-2 text-sm text-dark-500">{card.note}</p>
            </div>
          ))}
        </div>

        <div className="glass rounded-3xl border border-white/60 p-8 shadow-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2
                className="text-2xl font-bold text-dark-900"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Property Inventory
              </h2>
              <p className="mt-2 text-sm text-dark-500">
                Every property shows how many floors, units, and active listings are already configured.
              </p>
            </div>
          </div>

          {ownerProperties.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-dark-200 bg-white/70 p-10 text-center">
              <h3 className="text-xl font-bold text-dark-900">No properties yet</h3>
              <p className="mt-3 text-sm text-dark-500">
                Start with your first building or house, define floors and units,
                and publish the related listings from one flow.
              </p>
              <Link
                href={newPropertyHref}
                className="btn-primary !rounded-xl !py-3 !px-5 inline-flex mt-6"
              >
                Create your first property
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {ownerProperties.map((property) => (
                <div
                  key={property.id}
                  className="rounded-3xl border border-dark-100 bg-white/80 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-600">
                        {property.propertyType.replace(/_/g, " ")}
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-dark-900">
                        {property.title}
                      </h3>
                      <p className="mt-2 text-sm text-dark-500">
                        {property.locality}, {property.city}
                      </p>
                    </div>
                    <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 capitalize">
                      {property.status}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-dark-50 p-4">
                      <p className="text-xs text-dark-400">Floors</p>
                      <p className="mt-1 text-2xl font-bold text-dark-900">
                        {floorCountByProperty.get(property.id) ?? 0}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-dark-50 p-4">
                      <p className="text-xs text-dark-400">Units</p>
                      <p className="mt-1 text-2xl font-bold text-dark-900">
                        {unitCountByProperty.get(property.id) ?? 0}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-dark-50 p-4">
                      <p className="text-xs text-dark-400">Listings</p>
                      <p className="mt-1 text-2xl font-bold text-dark-900">
                        {listingCountByProperty.get(property.id) ?? 0}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
