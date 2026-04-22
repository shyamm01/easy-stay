"use client";

const techStack = [
  { name: "Next.js 15", role: "Frontend", icon: "⚡", desc: "SEO-first, blazing fast" },
  { name: "Supabase", role: "Database", icon: "🗄️", desc: "PostgreSQL, real-time" },
  { name: "Vercel", role: "Hosting", icon: "🌐", desc: "Edge CDN, auto-deploy" },
  { name: "Razorpay", role: "Payments", icon: "💳", desc: "UPI, cards, wallets" },
  { name: "Google Maps", role: "Maps", icon: "📍", desc: "Places, geocoding" },
  { name: "WhatsApp API", role: "Alerts", icon: "💬", desc: "Instant notifications" },
];

const costs = [
  { service: "Hosting (Vercel)", cost: "₹0", note: "Free Tier" },
  { service: "Database (Supabase)", cost: "₹0", note: "Free up to 500MB" },
  { service: "Domain (.in)", cost: "~₹85", note: "/month, billed yearly" },
  { service: "Maps API", cost: "₹0", note: "$200 free credit/mo" },
];

export default function PricingSection() {
  const total = "~₹100";

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 gradient-mesh" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="section-badge mx-auto mb-4">
            <span>💰</span> Transparent Pricing
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-900"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Run for{" "}
            <span className="gradient-text-warm">{total}/month</span>
          </h2>
          <p className="mt-4 text-lg text-dark-500 max-w-xl mx-auto">
            Serverless stack = near-zero costs. Scale from 0 to 10,000 users before spending a rupee more.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Cost Breakdown */}
          <div className="glass rounded-3xl p-8 shadow-xl border border-white/50">
            <h3 className="text-xl font-bold text-dark-800 mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Monthly Cost Breakdown
            </h3>
            <div className="space-y-4">
              {costs.map((item) => (
                <div
                  key={item.service}
                  className="flex items-center justify-between py-3 border-b border-dark-100 last:border-0"
                >
                  <div>
                    <p className="font-semibold text-dark-700">{item.service}</p>
                    <p className="text-xs text-dark-400">{item.note}</p>
                  </div>
                  <span
                    className={`text-lg font-bold ${
                      item.cost === "₹0" ? "text-primary-500" : "text-dark-700"
                    }`}
                  >
                    {item.cost}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4 mt-2 border-t-2 border-primary-200">
                <span className="text-lg font-bold text-dark-900">Total</span>
                <span className="text-2xl font-extrabold gradient-text-warm">
                  {total}/mo
                </span>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xl font-bold text-dark-800 mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Powered By
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="glass rounded-2xl p-5 card-hover border border-white/50"
                >
                  <div className="text-2xl mb-2">{tech.icon}</div>
                  <p className="font-bold text-dark-800 text-sm">{tech.name}</p>
                  <p className="text-xs text-primary-600 font-medium">{tech.role}</p>
                  <p className="text-xs text-dark-400 mt-1">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
