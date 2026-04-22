interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  darkMode?: boolean;
}

export default function Logo({
  size = 36,
  className = "",
  showText = true,
  darkMode = false,
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* SVG Logo Mark — House + Location Pin */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="EasyStay logo"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
          <linearGradient id="logoGradLight" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>

        {/* Rounded square background */}
        <rect width="48" height="48" rx="12" fill="url(#logoGrad)" />

        {/* House roof */}
        <path
          d="M24 12L10 23h4v11h8v-7h4v7h8V23h4L24 12z"
          fill="white"
          opacity="0.95"
        />

        {/* Location pin dot */}
        <circle cx="24" cy="24" r="3.5" fill="url(#logoGrad)" />
      </svg>

      {/* Wordmark */}
      {showText && (
        <span
          className="font-bold text-xl tracking-tight"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          <span className={darkMode ? "text-white" : "text-dark-900"}>
            Easy
          </span>
          <span
            style={{
              background: "linear-gradient(135deg, #22c55e, #0d9488)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Stay
          </span>
          <span className={darkMode ? "text-coral-400" : "text-coral-500"}>
            .in
          </span>
        </span>
      )}
    </div>
  );
}
