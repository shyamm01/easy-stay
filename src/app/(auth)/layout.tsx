import Logo from "@/components/Logo";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary-200/30 blur-3xl" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-teal-200/30 blur-3xl" />

      {/* Header */}
      <header className="relative z-10 py-6 px-6">
        <Link href="/" className="inline-block">
          <Logo size={36} />
        </Link>
      </header>

      {/* Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 pb-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-xs text-dark-400">
        © {new Date().getFullYear()} EasyStay.in — Built with ❤️ in India
      </footer>
    </div>
  );
}
