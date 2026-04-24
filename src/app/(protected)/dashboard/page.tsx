import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";
import Logo from "@/components/Logo";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    user?.phone ||
    "User";

  return (
    <div className="min-h-screen bg-dark-50">
      {/* Dashboard Navbar */}
      <nav className="bg-white border-b border-dark-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo size={34} />
          </Link>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-dark-800">{displayName}</p>
              <p className="text-xs text-dark-400">{user?.email || user?.phone}</p>
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm">
              {displayName.charAt(0).toUpperCase()}
            </div>

            {/* Logout */}
            <form action={logout}>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-sm font-medium text-dark-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Card */}
        <div className="glass rounded-3xl p-8 shadow-xl border border-white/60 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1
                className="text-2xl font-bold text-dark-900"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Welcome, {displayName}! 👋
              </h1>
              <p className="text-dark-500 text-sm">
                Your EasyStay dashboard is ready
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-primary-50 border border-primary-100 p-5">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="font-semibold text-dark-800 text-sm">Saved Rooms</h3>
              <p className="text-2xl font-bold text-primary-600 mt-1">0</p>
            </div>
            <div className="rounded-2xl bg-teal-50 border border-teal-100 p-5">
              <div className="text-2xl mb-2">🔔</div>
              <h3 className="font-semibold text-dark-800 text-sm">Active Alerts</h3>
              <p className="text-2xl font-bold text-teal-600 mt-1">0</p>
            </div>
            <div className="rounded-2xl bg-coral-50 border border-coral-100 p-5">
              <div className="text-2xl mb-2">💬</div>
              <h3 className="font-semibold text-dark-800 text-sm">Messages</h3>
              <p className="text-2xl font-bold text-coral-600 mt-1">0</p>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="glass rounded-3xl p-8 shadow-xl border border-white/60">
          <h2
            className="text-lg font-bold text-dark-900 mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            🚀 Get Started
          </h2>
          <div className="space-y-3">
            {[
              { icon: "📍", text: "Set your preferred city and locality", status: "pending" },
              { icon: "💰", text: "Set your monthly budget range", status: "pending" },
              { icon: "🔔", text: "Enable WhatsApp alerts for new listings", status: "pending" },
              { icon: "🗺️", text: "Browse rooms on the interactive map", status: "coming" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-dark-50 transition-colors"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm text-dark-700 flex-1">{item.text}</span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    item.status === "coming"
                      ? "bg-dark-100 text-dark-500"
                      : "bg-primary-100 text-primary-700"
                  }`}
                >
                  {item.status === "coming" ? "Coming Soon" : "To Do"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
