"use client";
import { useState, type FormEvent } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("bangalore");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call — replace with Supabase insert later
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section id="waitlist" className="py-24 bg-dark-900 text-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-500/8 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-coral-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="section-badge mx-auto mb-6 !bg-dark-800 !border-dark-700 !text-primary-400">
            <span className="animate-pulse-soft">🔔</span> Early Access
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Be the First to
            <br />
            <span className="gradient-text">Find Your Room.</span>
          </h2>
          <p className="mt-4 text-lg text-dark-400 max-w-lg mx-auto">
            Join the waitlist and get early access when we launch. 
            We&apos;ll notify you on WhatsApp when rooms open in your city.
          </p>
        </div>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="mt-10 glass-dark rounded-3xl p-8 sm:p-10 shadow-2xl"
          >
            <div className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="waitlist-email" className="block text-sm font-medium text-dark-300 mb-2">
                  Email Address
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-5 py-3.5 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-base"
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="waitlist-city" className="block text-sm font-medium text-dark-300 mb-2">
                  Which city are you looking in?
                </label>
                <select
                  id="waitlist-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-dark-800 border border-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-base appearance-none"
                >
                  <option value="bangalore">🏙️ Bangalore</option>
                  <option value="delhi">🏛️ Delhi NCR</option>
                  <option value="pune">⛰️ Pune</option>
                  <option value="hyderabad">🕌 Hyderabad</option>
                  <option value="mumbai">🌊 Mumbai</option>
                  <option value="chennai">🏖️ Chennai</option>
                  <option value="other">🗺️ Other</option>
                </select>
              </div>

              {/* Submit */}
              <button
                id="waitlist-submit"
                type="submit"
                disabled={loading}
                className="w-full btn-primary !py-4 !text-base !rounded-xl justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Joining...
                  </span>
                ) : (
                  <span>Join the Waitlist 🚀</span>
                )}
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-dark-500">
              No spam, ever. We&apos;ll only email you when we launch.
            </p>
          </form>
        ) : (
          <div className="mt-10 glass-dark rounded-3xl p-10 sm:p-14 shadow-2xl text-center animate-slide-up">
            <div className="text-6xl mb-4">🎉</div>
            <h3
              className="text-2xl font-bold gradient-text mb-3"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              You&apos;re on the list!
            </h3>
            <p className="text-dark-400">
              We&apos;ll reach out on WhatsApp when EasyStay launches in{" "}
              <strong className="text-white capitalize">{city}</strong>. 
              Tell your friends! 🏠
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://twitter.com/intent/tweet?text=Just+joined+the+@EasyStayIn+waitlist!+No+more+broker+nightmares+🚀+https://easystay.in`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !py-3 !text-sm justify-center"
              >
                Share on 𝕏
              </a>
              <a
                href={`https://wa.me/?text=Check+out+EasyStay.in+-+A+new+way+to+find+PGs+and+rooms+in+India!+https://easystay.in`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !py-3 !text-sm justify-center"
              >
                💬 Share on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
