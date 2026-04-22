"use client";

const steps = [
  {
    num: "01",
    icon: "🔍",
    title: "Search by Location",
    description: "Type your area or drop a pin on the map. Filter by budget, room type, and amenities.",
  },
  {
    num: "02",
    icon: "🏠",
    title: "Browse Verified Rooms",
    description: "Watch video tours, check ratings, and read reviews from real tenants. No fake listings.",
  },
  {
    num: "03",
    icon: "💬",
    title: "Connect Instantly",
    description: "Chat with the landlord on WhatsApp or schedule a visit. Direct connection, no middlemen.",
  },
  {
    num: "04",
    icon: "🎉",
    title: "Book & Move In",
    description: "Pay via UPI, get an auto-generated rental agreement, and move into your new home.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-dark-900 text-white relative overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="section-badge mx-auto mb-4 !bg-dark-800 !border-dark-700 !text-primary-400">
            <span>🛤️</span> How It Works
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Room Hunting,{" "}
            <span className="gradient-text">Reimagined.</span>
          </h2>
          <p className="mt-4 text-lg text-dark-400 max-w-xl mx-auto">
            Four simple steps from search to move-in. No brokers, no BS.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative group"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-gradient-to-r from-primary-500/50 to-transparent z-0" />
              )}

              <div className="glass-dark rounded-2xl p-6 card-hover relative z-10">
                <div className="text-xs font-bold text-primary-400 mb-3 tracking-widest">
                  STEP {step.num}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-dark-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
