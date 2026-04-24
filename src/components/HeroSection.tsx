"use client";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-coral-300/10 rounded-full blur-3xl animate-pulse-soft" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-up">
            <div className="section-badge mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-soft" />
              Launching in Bangalore 🇮🇳
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-dark-900"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Find a Room
              <br />
              <span className="gradient-text">You&apos;d Actually</span>
              <br />
              <span className="text-dark-400 text-3xl sm:text-4xl lg:text-5xl font-semibold">
                Want to Move Into.
              </span>
            </h1>

            <p className="mt-6 text-lg text-dark-500 max-w-lg leading-relaxed">
              EasyStay helps you discover verified PGs and room rentals near work,
              college, or the neighborhoods you already love. Compare rent,
              deposit, amenities, and commute before you waste time on the wrong
              visit.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#waitlist" className="btn-primary text-center">
                <span>Join Early Access</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="#why-easystay" className="btn-secondary text-center">
                <span>Why EasyStay</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            {/* Social Proof */}
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-3">
                {["🧑‍💻", "👩‍🎓", "👨‍💼", "👩‍💻"].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-primary-100 border-2 border-white flex items-center justify-center text-lg shadow-sm"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-dark-700">
                  500+ renters joined early access
                </p>
                <p className="text-xs text-dark-400">Students, interns, and working professionals</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="animate-slide-up-delay relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-float" style={{ animationDuration: "8s" }}>
              <Image
                src="/hero-illustration.png"
                alt="Find your perfect room with EasyStay"
                width={600}
                height={600}
                className="w-full h-auto"
                priority
              />
              {/* Floating Cards */}
              <div className="absolute bottom-6 left-6 glass rounded-2xl p-4 shadow-xl animate-bounce-gentle">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center text-white text-lg">
                    📍
                  </div>
                  <div>
                    <p className="text-sm font-bold text-dark-800">HSR Layout</p>
                    <p className="text-xs text-dark-400">Furnished rooms from ₹8,500</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-6 right-6 glass rounded-2xl p-3 shadow-xl animate-bounce-gentle" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">✅</span>
                  <span className="text-sm font-semibold text-primary-700">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
