"use client";
import Image from "next/image";

const features = [
  {
    icon: "🗺️",
    title: "Map-Based Search",
    description:
      "Find rooms near your office or college with our interactive map. Autocomplete powered by Google Places API — just type \"HSR Layout\" and go.",
    image: "/map-search.png",
    badge: "Phase 1",
    color: "from-primary-500 to-teal-500",
    bgColor: "bg-primary-50",
  },
  {
    icon: "✅",
    title: "Verified Listings",
    description:
      "Community-verified rooms with video tours. Auto-hide fake listings after 3 reports. No more bait-and-switch.",
    image: "/verified-listing.png",
    badge: "Phase 2",
    color: "from-teal-500 to-primary-500",
    bgColor: "bg-teal-50",
  },
  {
    icon: "💬",
    title: "WhatsApp Alerts",
    description:
      "Get instant room availability alerts on WhatsApp. Because in India, WhatsApp > Email. Set your budget and area, we'll ping you.",
    image: null,
    badge: "Phase 3",
    color: "from-coral-500 to-coral-400",
    bgColor: "bg-coral-50",
    emoji: "📱",
  },
];

const moreFeatures = [
  {
    icon: "💸",
    title: "UPI Payments",
    description: "Pay rent via UPI with Razorpay. No cash hassles, full digital trail.",
  },
  {
    icon: "📄",
    title: "Auto Rental Agreements",
    description: "Generate rental agreement drafts automatically with React-PDF on booking confirmation.",
  },
  {
    icon: "🔐",
    title: "Login with Google/OTP",
    description: "One-tap sign in. No passwords to remember. Powered by Supabase Auth.",
  },
  {
    icon: "🏢",
    title: "Building & Room Relationships",
    description: "See all rooms in a building, compare amenities, and pick the best fit with PostgreSQL-powered queries.",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    description: "Next.js 15 + Vercel Edge = sub-200ms page loads across India. SEO-optimized.",
  },
  {
    icon: "🇮🇳",
    title: "Built for India",
    description: "Hindi support, ₹ pricing, locality-aware search, and metro/bus route proximity.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 gradient-mesh" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="section-badge mx-auto mb-4">
            <span>✨</span> Features
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-900"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Everything You Need.
            <br />
            <span className="gradient-text">Nothing You Don&apos;t.</span>
          </h2>
          <p className="mt-4 text-lg text-dark-500 max-w-2xl mx-auto">
            Built by someone who has been through the PG hunting nightmare.
            Every feature solves a real pain point.
          </p>
        </div>

        {/* Main Feature Cards */}
        <div className="space-y-20 mb-20">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${feature.color} mb-4`}
                >
                  {feature.badge}
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-bold text-dark-900 mb-4"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {feature.icon} {feature.title}
                </h3>
                <p className="text-dark-500 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                {feature.image ? (
                  <div className={`rounded-2xl overflow-hidden shadow-2xl card-hover border border-dark-200 ${feature.bgColor}`}>
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={560}
                      height={560}
                      className="w-full h-auto"
                    />
                  </div>
                ) : (
                  <div
                    className={`${feature.bgColor} rounded-2xl p-12 flex items-center justify-center shadow-xl card-hover border border-dark-200`}
                  >
                    <div className="text-center">
                      <div className="text-7xl mb-4">{feature.emoji}</div>
                      <div className="glass rounded-xl p-4 inline-block">
                        <p className="text-sm font-semibold text-dark-600">
                          &quot;New room in HSR Layout — ₹8,500/mo&quot;
                        </p>
                        <p className="text-xs text-dark-400 mt-1">
                          via WhatsApp • 2 min ago
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* More Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {moreFeatures.map((f) => (
            <div
              key={f.title}
              className="glass rounded-2xl p-6 card-hover border border-white/50"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h4 className="text-lg font-bold text-dark-800 mb-2">{f.title}</h4>
              <p className="text-sm text-dark-500 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
