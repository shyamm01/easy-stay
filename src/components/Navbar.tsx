"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why EasyStay", href: "#why-easystay" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    // Check auth state
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      window.removeEventListener("scroll", onScroll);
      subscription.unsubscribe();
    };
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="group-hover:scale-[1.02] transition-transform">
          <Logo size={38} />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-dark-500 hover:text-primary-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-primary-500 after:transition-all"
            >
              {item.label}
            </a>
          ))}

          {/* Auth Buttons */}
          {!loading && (
            user ? (
              <Link
                href="/dashboard"
                className="btn-primary !py-2.5 !px-5 !text-sm !rounded-lg"
              >
                Dashboard →
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-dark-600 hover:text-primary-600 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="btn-primary !py-2.5 !px-5 !text-sm !rounded-lg"
                >
                  Sign Up Free
                </Link>
              </div>
            )
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-dark-100 transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-2xl p-4 shadow-xl animate-slide-up">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 px-4 rounded-lg text-dark-600 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
          {!loading && (
            user ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block mt-2 text-center btn-primary !rounded-lg"
              >
                Dashboard →
              </Link>
            ) : (
              <div className="mt-2 space-y-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center py-3 px-4 rounded-lg text-dark-600 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center btn-primary !rounded-lg"
                >
                  Sign Up Free
                </Link>
              </div>
            )
          )}
        </div>
      )}
    </nav>
  );
}
