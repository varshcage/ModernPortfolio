import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Shield } from "lucide-react";

interface HeaderProps {
  currentPage: "hero" | "about" | "skills" | "projects" | "contact";
  onNavigate: (page: "hero" | "about" | "skills" | "projects" | "contact") => void;
  onOpenModal: (type: "login" | "signup" | "watch" | "action") => void;
}

export default function Header({ currentPage, onNavigate, onOpenModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  const links = [
    { label: "Home", page: "hero" as const },
    { label: "About", page: "about" as const },
    { label: "Skills", page: "skills" as const },
    { label: "Projects", page: "projects" as const },
    { label: "Contact", page: "contact" as const },
  ];

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const scrollableParent = headerEl.parentElement;
    if (!scrollableParent) return;

    const handleScroll = () => {
      const currentScrollY = scrollableParent.scrollTop;

      // Update glass backdrop scrolled state
      setIsScrolled(currentScrollY > 15);

      if (mobileMenuOpen) return;

      // Always show at the top of the container or on negative elastic rubber-band scrolls
      if (currentScrollY <= 15) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Check if near the very bottom to prevent disappearing right before footer
      const maxScrollable = scrollableParent.scrollHeight - scrollableParent.clientHeight;
      if (currentScrollY >= maxScrollable - 30) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Calculate scroll difference
      const diff = currentScrollY - lastScrollY.current;

      // Use a subtle threshold of 8 pixels to prevent touch jitter on mobile screens
      if (Math.abs(diff) > 8) {
        if (diff > 0 && currentScrollY > 60) {
          // Scrolling down - smoothly hide header
          setIsVisible(false);
        } else if (diff < 0) {
          // Scrolling up - smoothly show header
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    // Attach scroll listener
    scrollableParent.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial evaluation
    handleScroll();

    return () => {
      scrollableParent.removeEventListener("scroll", handleScroll);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      id="portfolio-header"
      className={`w-full sticky top-0 z-50 flex-shrink-0 transition-all duration-500 ease-in-out h-20 flex items-center ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <div
        className={`w-full flex items-center justify-between transition-all duration-500 ease-in-out h-14 rounded-2xl ${
          isScrolled
            ? "bg-black/50 backdrop-blur-md border border-zinc-800/60 px-5 shadow-lg"
            : "bg-transparent border-transparent px-0"
        }`}
      >
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

        {/* Contact Button & Mobile Menu */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate("contact")}
            className="relative px-5 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white border border-rose-500/60 hover:border-rose-500 bg-transparent hover:bg-rose-500/10 active:scale-95 transition-all duration-300 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] cursor-pointer"
          >
            Contact
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
      </div>
    </header>
  );
}
