"use client";
import { useState, type FormEvent } from "react";
import type { LeadLocationInput } from "@/lib/validations/leads";

const cityOptions = [
  { value: "Bengaluru", label: "🏙️ Bengaluru" },
  { value: "Delhi NCR", label: "🏛️ Delhi NCR" },
  { value: "Pune", label: "⛰️ Pune" },
  { value: "Hyderabad", label: "🕌 Hyderabad" },
  { value: "Mumbai", label: "🌊 Mumbai" },
  { value: "Chennai", label: "🏖️ Chennai" },
  { value: "Other", label: "🗺️ Other" },
];

function getLocationErrorMessage(error: GeolocationPositionError) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Please allow location access so we can save your current location.";
    case error.POSITION_UNAVAILABLE:
      return "Your current location is unavailable right now. Please try again.";
    case error.TIMEOUT:
      return "Location request timed out. Please try again.";
    default:
      return "We couldn’t read your location. Please try again.";
  }
}

export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState(cityOptions[0].value);
  const [location, setLocation] = useState<LeadLocationInput | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCaptureLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Location services are not supported in this browser.");
      return;
    }

    setLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: Number(position.coords.latitude.toFixed(6)),
          longitude: Number(position.coords.longitude.toFixed(6)),
          accuracy: position.coords.accuracy
            ? Math.round(position.coords.accuracy)
            : undefined,
        });
        setLocating(false);
      },
      (error) => {
        setLocationError(getLocationErrorMessage(error));
        setLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    if (!location) {
      setLocationError("Please capture your current location before joining.");
      return;
    }

    setLoading(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          city,
          currentLocation: location,
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to save your details");
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
            Start Your Search
            <br />
            <span className="gradient-text">With Better Leads.</span>
          </h2>
          <p className="mt-4 text-lg text-dark-400 max-w-lg mx-auto">
            Join early access and tell us where you&apos;re looking. We&apos;ll
            reach out when EasyStay opens in your city with relevant updates and
            first access to listings.
          </p>
        </div>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="mt-10 glass-dark rounded-3xl p-8 sm:p-10 shadow-2xl"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="waitlist-name" className="block text-sm font-medium text-dark-300 mb-2">
                  Full Name
                </label>
                <input
                  id="waitlist-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-5 py-3.5 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-base"
                />
              </div>

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
                  {cityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-dark-700 bg-dark-800/70 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-dark-200">
                      Current Location
                    </p>
                    <p className="text-xs text-dark-400 mt-1 leading-relaxed">
                      Share your current location so we can understand where
                      demand is coming from and match it with the city you need.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCaptureLocation}
                    disabled={locating}
                    className="btn-secondary !rounded-xl !py-3 !text-sm justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {locating ? "Fetching location..." : location ? "Refresh Location" : "Use Current Location"}
                  </button>
                </div>

                <div className="mt-4 rounded-xl border border-dark-700 bg-dark-900/70 px-4 py-3">
                  {location ? (
                    <p className="text-sm text-emerald-300">
                      Location captured: {location.latitude}, {location.longitude}
                      {location.accuracy ? ` • ±${location.accuracy}m` : ""}
                    </p>
                  ) : (
                    <p className="text-sm text-dark-400">
                      No location captured yet.
                    </p>
                  )}
                </div>

                {locationError && (
                  <p className="mt-3 text-sm text-red-300">{locationError}</p>
                )}
              </div>

              {submitError && (
                <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {submitError}
                </div>
              )}

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
                  <span>Join Early Access</span>
                )}
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-dark-500">
              We only collect what we need to contact you and understand lead demand by city and location.
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
              Thanks, <strong className="text-white">{name}</strong>. We&apos;ll
              keep you posted when EasyStay opens early access in{" "}
              <strong className="text-white">{city}</strong>.
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
