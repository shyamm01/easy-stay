"use client";

const renterBenefits = [
  {
    title: "No broker-first experience",
    description: "Focus on direct, relevant options so you can avoid paying extra just to get a phone number.",
  },
  {
    title: "Useful before the visit",
    description: "Get the rent range, deposit expectations, and key amenities before you travel across the city.",
  },
  {
    title: "Better fit, less compromise",
    description: "Shortlist rooms that match your actual routine, whether you care about commute, food, parking, or privacy.",
  },
  {
    title: "Made for fast-moving renters",
    description: "Great for students, interns, job switchers, and anyone relocating who needs to make decisions quickly.",
  },
];

const expectations = [
  {
    label: "Best for",
    value: "PGs, shared rooms, and rental options for people moving within or into the city",
  },
  {
    label: "Helps you avoid",
    value: "Fake urgency, hidden costs, irrelevant listings, and endless back-and-forth with brokers",
  },
  {
    label: "What you can compare",
    value: "Rent, deposit, furnishing, room type, amenities, and whether a place suits your daily commute",
  },
  {
    label: "Why join early",
    value: "You&apos;ll hear when EasyStay opens up in your city and get early access to the first wave of listings",
  },
];

export default function PricingSection() {
  return (
    <section id="why-easystay" className="py-24 relative">
      <div className="absolute inset-0 gradient-mesh" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="section-badge mx-auto mb-4">
            <span>🌟</span> Why EasyStay
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-900"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Built Around What
            <span className="gradient-text-warm"> Renters Need</span>
          </h2>
          <p className="mt-4 text-lg text-dark-500 max-w-xl mx-auto">
            EasyStay is meant to save time, reduce friction, and help you make
            better rental decisions with less guesswork.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Benefits */}
          <div className="glass rounded-3xl p-8 shadow-xl border border-white/50">
            <h3 className="text-xl font-bold text-dark-800 mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              What makes it useful
            </h3>
            <div className="space-y-4">
              {renterBenefits.map((item) => (
                <div
                  key={item.title}
                  className="py-3 border-b border-dark-100 last:border-0"
                >
                  <p className="font-semibold text-dark-700">{item.title}</p>
                  <p className="text-sm text-dark-500 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Expectations */}
          <div>
            <h3 className="text-xl font-bold text-dark-800 mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              What to expect
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expectations.map((item) => (
                <div
                  key={item.label}
                  className="glass rounded-2xl p-5 card-hover border border-white/50"
                >
                  <p className="text-xs text-primary-600 font-semibold uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-sm text-dark-600 mt-2 leading-relaxed">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
