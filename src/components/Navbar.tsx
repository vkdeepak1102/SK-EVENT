import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

const darkStyle = {
  background: "var(--gradient-navbar)",
  backdropFilter: "blur(16px)",
  border: "1px solid oklch(0.78 0.13 85 / 0.5)",
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useRouterState({ select: (s) => s.location.pathname });
  const isHome = location === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Show dark gold navbar if: scrolled OR not on homepage
  const isDark = scrolled || !isHome;

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${isDark ? "py-2" : "py-5"}`}>
      <div
        className={`mx-auto max-w-7xl px-6 transition-all duration-500 ${isDark ? "rounded-full shadow-gold" : ""}`}
        style={isDark ? darkStyle : {}}
      >
        <nav className="flex items-center justify-between py-2">
          <Link to="/" className="flex items-center"><Logo size={42} /></Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-9">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`relative text-[12px] font-bold tracking-[0.3em] uppercase transition-colors ${
                  isDark
                    ? "text-gold hover:text-yellow-300"
                    : "text-white hover:text-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                }`}
                activeProps={{ className: "text-yellow-300 font-bold underline underline-offset-4" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact" className="shimmer rounded-full bg-gradient-gold px-5 py-2.5 text-[11px] tracking-[0.3em] uppercase text-background shadow-gold font-bold">
              Plan Event
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className={`lg:hidden p-2 font-bold ${isDark ? "text-gold" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"}`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </nav>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="lg:hidden mt-2 mx-4 rounded-2xl p-6 shadow-gold animate-fade-up" style={darkStyle}>
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-sm font-bold tracking-[0.25em] uppercase text-gold hover:text-yellow-300">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
