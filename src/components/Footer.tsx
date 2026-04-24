import Logo from "@/components/Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-950 text-dark-400 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <Logo size={34} darkMode />
            </div>
            <p className="text-sm leading-relaxed">
              Find verified PGs and room rentals with clearer details, better
              shortlists, and less broker-driven chaos.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Features", href: "#features" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Why EasyStay", href: "#why-easystay" },
                { label: "Early Access", href: "#waitlist" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-primary-400 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Cities
            </h4>
            <ul className="space-y-3 text-sm">
              {["Bangalore", "Delhi NCR", "Pune", "Hyderabad", "Mumbai", "Chennai"].map((city) => (
                <li key={city}>
                  <span className="text-dark-500 cursor-default">
                    {city} {city === "Bangalore" ? "🟢" : "🔜"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:support@easystay.in" className="hover:text-primary-400 transition-colors">
                  📧 support@easystay.in
                </a>
              </li>
              <li>
                <a href="https://twitter.com/easystay_in" className="hover:text-primary-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  𝕏 @easystay_in
                </a>
              </li>
              <li>
                <a href="https://instagram.com/easystay.in" className="hover:text-primary-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  📸 @easystay.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-500">
            © {year} EasyStay.in — Helping renters find home a little faster
          </p>
          <div className="flex items-center gap-6 text-xs">
            <a href="#" className="hover:text-primary-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
