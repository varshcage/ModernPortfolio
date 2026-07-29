import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Mail, Phone, Linkedin, Palette, ChevronLeft, ChevronRight, Plus, ExternalLink, GraduationCap, Award, BrainCircuit } from "lucide-react";
import Header from "./Header";

interface AboutSectionProps {
  onNavigate: (page: "hero" | "about" | "skills" | "projects" | "contact") => void;
  onOpenModal: (type: "login" | "signup" | "watch" | "action") => void;
}

export default function AboutSection({ onNavigate, onOpenModal }: AboutSectionProps) {
  const [activeCarouselIdx, setActiveCarouselIdx] = useState(0);

  const aboutInfo = [
    { icon: MapPin, label: "Base Location", value: "Badulla, Sri Lanka" },
    { icon: Mail, label: "Direct Email", value: "heshavarshan@gmail.com", href: "mailto:heshavarshan@gmail.com" },
    { icon: Phone, label: "Direct Phone", value: "+94 740 464 926", href: "tel:+94740464926" },
    { icon: Linkedin, label: "Professional LinkedIn", value: "Srishanker Heshavarshaan", href: "https://www.linkedin.com" },
    { icon: Palette, label: "Creative Portfolio", value: "Varshcage on Behance", href: "#" },
  ];

  const languages = ['English', 'Sinhala', 'Tamil'];

  const stats = [
    { value: "98%", label: "Client Satisfaction" },
    { value: "4+", label: "Years in Design" },
    { value: "25+", label: "Completed Projects" },
  ];

  const handleNextCarousel = () => {
    setActiveCarouselIdx((prev) => (prev + 1) % aboutInfo.length);
  };

  const handlePrevCarousel = () => {
    setActiveCarouselIdx((prev) => (prev - 1 + aboutInfo.length) % aboutInfo.length);
  };

  return (
    <motion.div
      key="about-page"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-full h-full relative z-20 flex flex-col p-6 sm:p-8 md:p-12 lg:p-16 overflow-y-auto"
    >
      {/* Reusable Header */}
      <Header 
        currentPage="about" 
        onNavigate={onNavigate} 
        onOpenModal={onOpenModal} 
      />

      {/* Main Content */}
      <main className="flex-grow py-6 sm:py-10 max-w-7xl mx-auto w-full">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4">
          
          {/* Left Column - Detailed Professional Bio */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-start text-left">
            {/* Header and title */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-rose-500" />
                <span className="text-rose-500 text-xs font-mono tracking-[0.3em] uppercase">01 — About Me</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tighter leading-[0.85] text-white uppercase mt-3">
                Developer<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-500 to-rose-600">by Logic</span>
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-rose-500 to-amber-500 mt-6" />
            </div>

            {/* Headline Card */}
            <div className="flex flex-col mb-6">
              <p className="text-rose-400 text-sm sm:text-base leading-relaxed mb-6 font-mono tracking-wide border-l-2 border-rose-500/80 pl-4 bg-rose-950/20 py-3 pr-3 rounded-r-xl">
                "Designer by heart. Engineering products that are as gorgeous as they are functionally robust."
              </p>

              <button
                onClick={() => onNavigate("contact")}
                className="flex items-center gap-4 self-start px-6 py-3 rounded-full border border-white hover:border-rose-500/80 hover:bg-rose-500/10 transition-all duration-300 active:scale-95 group cursor-pointer bg-transparent"
              >
                <div className="w-7 h-7 rounded-full bg-rose-600 group-hover:bg-rose-500 flex items-center justify-center shrink-0 transition-colors shadow-[0_0_10px_rgba(244,63,94,0.5)]">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-extrabold tracking-wider text-white uppercase font-display group-hover:text-rose-400 transition-colors">
                  CONNECT NOW
                </span>
              </button>
            </div>

            {/* Paragraph Bio */}
            <div className="space-y-5 text-zinc-300 text-sm sm:text-base leading-relaxed font-body">
              <p>
                I am a passionate <span className="text-white font-semibold">Software Engineering student</span> with a deep-seated love for programming and graphic design. Specializing in building modular, secure, and blazing-fast web interfaces using <span className="text-rose-400 font-semibold font-mono">React, TypeScript, and modern styling tools</span>.
              </p>
              <p>
                My dual nature as an engineer and creative allows me to bridge the gap between design mockups and live, interactive applications. I harness a full suite of vector and imaging software (<span className="text-white">Figma, Photoshop, Illustrator, and Affinity Designer</span>) to perfect the visual balance of every interface before a single line of code is compiled.
              </p>
              <p>
                Based in the mountainous city of <span className="text-rose-400">Badulla, Sri Lanka</span>, I look forward to partnering with local and global clients to bring interactive concepts, customized dashboards, and user-centric brand systems to life.
              </p>
            </div>

            {/* Multi-Cards layout for Experience/Education */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950/60 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-rose-500 mb-3">
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Education</span>
                </div>
                <h4 className="text-white font-bold text-sm">BSc (Hons) in Software Engineering</h4>
                <p className="text-zinc-500 text-xs mt-1">Specializing in Web Technologies & User Experience</p>
              </div>

              <div className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950/60 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-amber-500 mb-3">
                  <Award className="w-5 h-5" />
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Freelance Focus</span>
                </div>
                <h4 className="text-white font-bold text-sm">Full-Stack Dev & Brand Design</h4>
                <p className="text-zinc-500 text-xs mt-1">Providing remote software engineering & graphic assets</p>
              </div>
            </div>

            {/* Languages */}
            <div className="mt-8">
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono mb-3">Language Proficiencies</p>
              <div className="flex gap-2 flex-wrap">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="border border-zinc-800 text-zinc-400 text-xs px-4 py-1.5 rounded-full font-body hover:border-rose-500/50 hover:text-white transition-colors"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Carousel + Stats Panel */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-6 lg:pl-8">
            
            {/* Stats Panel */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, idx) => (
                <div key={idx} className="rounded-2xl border border-zinc-900 bg-zinc-950/80 px-4 py-5 text-center shadow-lg backdrop-blur-md">
                  <div className="font-display text-2xl sm:text-3xl font-black text-rose-500">{stat.value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-zinc-500 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Contact Interactive Carousel */}
            <div className="p-6 rounded-3xl border border-zinc-800 bg-zinc-950/90 shadow-2xl relative overflow-hidden flex flex-col group">
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
              
              <div className="mb-4">
                <span className="text-rose-500 text-xs font-mono tracking-[0.3em] uppercase">Identity Ledger</span>
                <h3 className="text-white font-display text-xl font-bold mt-1">Touchpoint Registry</h3>
                <div className="w-12 h-0.5 bg-rose-500 mt-2" />
              </div>

              <div className="flex items-center gap-4 w-full my-4">
                <button
                  onClick={handlePrevCarousel}
                  className="p-3 border border-zinc-800 hover:border-rose-500/50 hover:bg-rose-500/5 rounded-full transition-all duration-300 text-zinc-400 hover:text-white shrink-0 cursor-pointer bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="relative w-full min-h-[160px] rounded-2xl overflow-hidden border border-zinc-900 bg-black/40 flex">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCarouselIdx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0">
                          {(() => {
                            const Icon = aboutInfo[activeCarouselIdx].icon;
                            return <Icon className="w-5 h-5 text-rose-400" />;
                          })()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-zinc-500 uppercase tracking-wider font-mono">
                            {aboutInfo[activeCarouselIdx].label}
                          </p>
                          {aboutInfo[activeCarouselIdx].href && aboutInfo[activeCarouselIdx].href !== "#" ? (
                            <a
                              href={aboutInfo[activeCarouselIdx].href}
                              target="_blank"
                              rel="noreferrer"
                              className="text-white text-sm sm:text-base font-medium hover:text-rose-400 transition-colors truncate block mt-1 flex items-center gap-1.5"
                            >
                              {aboutInfo[activeCarouselIdx].value}
                              <ExternalLink className="w-3.5 h-3.5 opacity-50 inline" />
                            </a>
                          ) : (
                            <p className="text-white text-sm sm:text-base font-medium mt-1 truncate">
                              {aboutInfo[activeCarouselIdx].value}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-3 border-t border-zinc-900">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                          <span className="text-[10px] text-zinc-500 font-mono uppercase">Node • {activeCarouselIdx + 1}/{aboutInfo.length}</span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button
                  onClick={handleNextCarousel}
                  className="p-3 border border-zinc-800 hover:border-rose-500/50 hover:bg-rose-500/5 rounded-full transition-all duration-300 text-zinc-400 hover:text-white shrink-0 cursor-pointer bg-transparent"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 mt-2">
                {aboutInfo.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCarouselIdx(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 border-none cursor-pointer ${
                      activeCarouselIdx === idx ? "bg-rose-500 w-4" : "bg-zinc-800 hover:bg-zinc-600"
                    }`}
                    aria-label={`Carousel index ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Core Values Card */}
            <div className="p-6 rounded-3xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-sm shadow-xl flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 shrink-0">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wide">Design Engineering Hybrid</h4>
                <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed">
                  Combining precision coding logic with vector creative systems results in highly refined interfaces that are beautiful, intuitive, and extremely performant.
                </p>
              </div>
            </div>

          </div>

        </section>
      </main>

      {/* Footer block */}
      <footer className="mt-auto pt-6 border-t border-zinc-900 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
        <div>© 2026 S.HESHAVARSHAAN. ALL RIGS RUNNING.</div>
        <div className="flex gap-4">
          <span className="hover:text-rose-400 cursor-pointer" onClick={() => onNavigate("hero")}>BACK HOME &rarr;</span>
        </div>
      </footer>
    </motion.div>
  );
}
