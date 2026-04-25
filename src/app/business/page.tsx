import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentOwnerContext } from "@/lib/owner-auth";
import { buildOwnerPortalHref } from "@/lib/owner-portal";
import { getOwnerPortalBasePath } from "@/lib/owner-portal.server";

export default async function BusinessHomePage() {
  const portalBasePath = await getOwnerPortalBasePath();
  const ownerContext = await getCurrentOwnerContext();
  const dashboardHref = buildOwnerPortalHref(portalBasePath, "/dashboard");
  const signupHref = buildOwnerPortalHref(portalBasePath, "/signup");
  const loginHref = buildOwnerPortalHref(portalBasePath, "/login");

  if (ownerContext?.isOwner) {
    redirect(dashboardHref);
  }

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0">
        <div className="absolute left-8 top-10 h-72 w-72 rounded-full bg-primary-300/20 blur-3xl" />
        <div className="absolute bottom-10 right-8 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="animate-slide-up">
          <div className="section-badge mb-6">
            <span>🏢</span> Business Portal
          </div>
          <h1
            className="text-4xl font-extrabold leading-tight text-dark-900 sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            List Properties,
            <br />
            Manage Floors,
            <br />
            <span className="gradient-text">Publish Units Faster.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dark-600">
            EasyStay Business gives owners and property managers a dedicated workflow
            for adding buildings, floor-wise inventory, flats, rooms, and live rental
            listings without mixing it with the renter experience.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href={signupHref} className="btn-primary justify-center">
              Start owner account
            </Link>
            <Link href={loginHref} className="btn-secondary justify-center">
              Owner login
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              "Create separate owner accounts with business access",
              "Add properties, floors, units, and publish listings in one flow",
              "Keep renter and owner journeys separate for business.easystay.in",
            ].map((item) => (
              <div
                key={item}
                className="glass rounded-2xl border border-white/50 p-5 text-sm text-dark-600"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-[2rem] border border-white/60 p-8 shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">
            Owner workflow
          </p>
          <div className="mt-6 space-y-4">
            {[
              {
                title: "1. Create an owner login",
                description: "Sign up with role owner and keep business access separate from renter accounts.",
              },
              {
                title: "2. Add your inventory",
                description: "Define the property, create floors, and list every flat or room with the right layout.",
              },
              {
                title: "3. Publish and manage",
                description: "Set rent, deposit, bathroom type, availability, and tenant preference for each listing.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-dark-100 bg-white/80 p-5"
              >
                <h2 className="text-base font-bold text-dark-900">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-dark-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
