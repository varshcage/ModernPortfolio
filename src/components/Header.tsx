import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Shield } from "lucide-react";

interface HeaderProps {
  currentPage: "hero" | "about" | "skills" | "projects" | "contact";
  onNavigate: (page: "hero" | "about" | "skills" | "projects" | "contact") => void;
  onOpenModal: (type: "login" | "signup" | "watch" | "action") => void;
}

export default function Header({ currentPage, onNavigate, onOpenModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { label: "Home", page: "hero" as const },
    { label: "About", page: "about" as const },
    { label: "Skills", page: "skills" as const },
    { label: "Projects", page: "projects" as const },
    { label: "Contact", page: "contact" as const },
  ];

  return (
    <header id="portfolio-header" className="flex items-center justify-between w-full sticky top-0 z-50 py-4 bg-transparent flex-shrink-0">
      {/* Logo */}
      <div 
        onClick={() => onNavigate("hero")}
        className="font-display text-xl sm:text-2xl font-black tracking-wider text-white select-none cursor-pointer hover:text-rose-400 transition-colors duration-300"
      >
        S.Heshavarshaan
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 lg:gap-12 text-zinc-400 font-medium tracking-wide">
        {links.map((link) => (
          <button
            key={link.label}
            onClick={() => onNavigate(link.page)}
            className={`hover:text-white transition-colors duration-300 relative py-1 group text-sm font-semibold cursor-pointer bg-transparent border-none p-0 ${
              currentPage === link.page ? "text-white" : "text-zinc-400"
            }`}
          >
            {link.label}
            <span className={`absolute bottom-0 left-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full ${
              currentPage === link.page ? "w-full" : "w-0"
            }`} />
          </button>
        ))}
      </nav>

      {/* Login Button & Mobile Menu */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => onOpenModal("login")}
          className="relative px-5 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white border border-rose-500/60 hover:border-rose-500 bg-transparent hover:bg-rose-500/10 active:scale-95 transition-all duration-300 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] cursor-pointer"
        >
          Login
        </button>

        {/* Mobile Hamburger menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-zinc-400 hover:text-white focus:outline-none transition-colors bg-transparent border-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-16 left-0 right-0 md:hidden bg-zinc-950/95 border border-rose-500/30 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl backdrop-blur-md z-50 mt-2"
          >
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate(link.page);
                }}
                className={`text-base font-semibold py-2 border-b border-zinc-900 last:border-0 text-left bg-transparent border-t-0 border-x-0 cursor-pointer ${
                  currentPage === link.page ? "text-rose-400 font-bold" : "text-zinc-300 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
