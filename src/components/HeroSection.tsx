import { useState } from "react";
import { motion } from "motion/react";
import { Zap, Sparkles } from "lucide-react";
import Header from "./Header";

interface HeroSectionProps {
  onNavigate: (page: "hero" | "about" | "skills" | "projects" | "contact") => void;
  onOpenModal: (type: "login" | "signup" | "watch" | "action") => void;
}

export default function HeroSection({ onNavigate, onOpenModal }: HeroSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const heroDescription = "Front-End Developer & Graphic Designer crafting elegant digital experiences — from intuitive interfaces to robust backends.";

  const cardsData = [
    { 
      id: 1, 
      title: "Interactive UI/UX", 
      desc: "Creating seamless web experiences with fine-tuned typography, animations, and fluid responsive design." 
    },
    { 
      id: 2, 
      title: "Full-Stack Logic", 
      desc: "Developing reliable server application logic, secure communication bridges, and database solutions." 
    },
    { 
      id: 3, 
      title: "Graphic & Brand Design", 
      desc: "Harnessing professional design toolkits to forge powerful brand visuals, logos, and digital marketing materials." 
    },
    { 
      id: 4, 
      title: "Results-Driven Growth", 
      desc: "Deploying production-ready applications that capture attention, engage visitors, and convert them into clients." 
    },
  ];

  return (
    <motion.div
      key="hero-page"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-full h-full relative z-20 flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:p-16 overflow-y-auto"
    >
      {/* Reusable Header */}
      <Header 
        currentPage="hero" 
        onNavigate={onNavigate} 
        onOpenModal={onOpenModal} 
      />

      {/* Body */}
      <main className="flex-grow flex flex-col justify-center my-auto py-10 md:py-16">
        <div className="max-w-3xl">
          {/* Top Label Tag */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-rose-500" />
            <span className="text-rose-500 text-xs font-mono tracking-widest uppercase">Creative Technologist</span>
          </div>

          {/* Massive Heading */}
          <div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-8xl font-extrabold tracking-tighter leading-[0.85] text-white uppercase mt-3">
              Srishanker<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-500 to-amber-500">Heshavarshaan</span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-rose-500 to-amber-500 mt-6 mb-6" />
          </div>

          {/* Paragraph */}
          <p className="text-zinc-300/90 text-sm sm:text-base md:text-lg leading-relaxed mb-8 font-normal max-w-xl">
            {heroDescription}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <button 
              onClick={() => onOpenModal("watch")}
              className="px-6 sm:px-8 py-3.5 rounded-full text-xs font-bold tracking-widest text-white border-2 border-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 active:scale-95 cursor-pointer uppercase shrink-0"
            >
              WATCH SHOWREEL
            </button>

            <button 
              onClick={() => onNavigate("about")}
              className="px-6 sm:px-8 py-3.5 rounded-full text-xs font-bold tracking-widest text-white bg-rose-700 hover:bg-rose-600 active:scale-95 transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] cursor-pointer uppercase shrink-0 flex items-center gap-2 group border-none"
            >
              EXPLORE WORK
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer Row Cards */}
      <footer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-4">
        {cardsData.map((card) => (
          <div
            key={card.id}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className="relative p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-zinc-950/70 hover:bg-zinc-950/90 border border-zinc-900/90 hover:border-rose-500/30 transition-all duration-500 group overflow-hidden backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex items-center gap-3 mb-2 relative z-10">
              <motion.div
                animate={{ 
                  scale: hoveredCard === card.id ? [1, 1.2, 1] : 1,
                  rotate: hoveredCard === card.id ? [0, -10, 10, 0] : 0
                }}
                transition={{ duration: 0.4 }}
                className="text-rose-500 shrink-0"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-rose-500 text-rose-500" />
              </motion.div>
              <h3 className="font-semibold text-white tracking-wide text-xs sm:text-sm md:text-base">
                {card.title}
              </h3>
            </div>
            <p className="text-zinc-400 text-[11px] sm:text-xs leading-relaxed relative z-10 transition-colors duration-300 group-hover:text-zinc-300">
              {card.desc}
            </p>
          </div>
        ))}
      </footer>
    </motion.div>
  );
}
