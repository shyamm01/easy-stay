"use client";
import Image from "next/image";

const features = [
  {
    icon: "🗺️",
    title: "Search by Area, Budget, and Commute",
    description:
      "Start with the neighborhoods you already trust. Narrow options by budget, room type, furnishing, and distance from office, college, or the nearest metro.",
    image: "/map-search.png",
    badge: "Shortlist Faster",
    color: "from-primary-500 to-teal-500",
    bgColor: "bg-primary-50",
  },
  {
    icon: "✅",
    title: "See the Important Details Up Front",
    description:
      "Browse rooms with clear rent, deposit, amenities, and recent photos before you book a visit. Fewer surprises, fewer wasted weekends.",
    image: "/verified-listing.png",
    badge: "Choose With Confidence",
    color: "from-teal-500 to-primary-500",
    bgColor: "bg-teal-50",
  },
  {
    icon: "💬",
    title: "Get Alerts for Places That Match",
    description:
      "Tell us your preferred area and monthly budget, and we&apos;ll let you know when a promising match shows up so you don&apos;t miss good options.",
    image: null,
    badge: "Stay Updated",
    color: "from-coral-500 to-coral-400",
    bgColor: "bg-coral-50",
    emoji: "📱",
  },
];

const moreFeatures = [
  {
    icon: "💰",
    title: "Zero Brokerage Focus",
    description: "Spend your budget on your move, not on unnecessary middlemen and surprise fees.",
  },
  {
    icon: "📄",
    title: "Clear Cost Breakdown",
    description: "See rent, deposit, and essentials together so you can spot what actually fits your monthly budget.",
  },
  {
    icon: "🏡",
    title: "Filters That Matter",
    description: "Filter by furnishing, attached bathroom, food, parking, Wi-Fi, move-in date, and room-sharing preferences.",
  },
  {
    icon: "🤝",
    title: "Direct Contact",
    description: "Reach out to owners or property managers quickly once a place looks right for you.",
  },
  {
    icon: "🧾",
    title: "Fewer Hidden Surprises",
    description: "Know the basics before visiting, from house rules to move-in expectations and what&apos;s included.",
  },
  {
    icon: "🇮🇳",
    title: "Built for India",
    description: "Designed around localities, commute patterns, and city-specific room hunting in Bengaluru and beyond.",
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
            Made for Real
            <br />
            <span className="gradient-text">Room Hunting.</span>
          </h2>
          <p className="mt-4 text-lg text-dark-500 max-w-2xl mx-auto">
            Every section is built around the questions renters ask before they
            spend time visiting a place.
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
                          &quot;New shared room in HSR Layout under ₹9,000&quot;
                        </p>
                        <p className="text-xs text-dark-400 mt-1">
                          New match • 2 min ago
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
