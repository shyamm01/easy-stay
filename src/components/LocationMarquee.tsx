"use client";

const locations = [
  "HSR Layout", "Koramangala", "Indiranagar", "BTM Layout",
  "Whitefield", "Electronic City", "Marathahalli", "JP Nagar",
  "Jayanagar", "Hebbal", "Yelahanka", "Bannerghatta Road",
];

export default function LocationMarquee() {
  const doubled = [...locations, ...locations];
  return (
    <section className="py-8 bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-transparent to-dark-900 z-10 pointer-events-none" />
      <div className="marquee-container">
        <div className="marquee-content gap-8">
          {doubled.map((loc, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-dark-800 text-dark-300 text-sm font-medium border border-dark-700 whitespace-nowrap"
            >
              <span className="text-primary-400">📍</span> {loc}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
