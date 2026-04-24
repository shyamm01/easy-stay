"use client";

const steps = [
  {
    num: "01",
    icon: "🔍",
    title: "Tell Us Where You Want to Live",
    description: "Start with your preferred locality, commute, and monthly budget so you only see relevant options.",
  },
  {
    num: "02",
    icon: "🏠",
    title: "Compare Rooms Side by Side",
    description: "Review rent, deposit, amenities, photos, and essentials before deciding which places deserve a visit.",
  },
  {
    num: "03",
    icon: "💬",
    title: "Reach Out to the Right Listings",
    description: "Connect with promising options quickly instead of calling every listing you can find online.",
  },
  {
    num: "04",
    icon: "🎉",
    title: "Visit, Decide, and Move Confidently",
    description: "Walk into visits with the key details already in hand and choose your next room with less stress.",
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
            From First Search to
            <span className="gradient-text"> Move-In.</span>
          </h2>
          <p className="mt-4 text-lg text-dark-400 max-w-xl mx-auto">
            A simpler path to finding a room without chasing dead leads or
            repeating the same questions all day.
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
