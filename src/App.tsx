/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, Shield, Terminal, Sparkles } from "lucide-react";

import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"hero" | "about" | "skills" | "projects" | "contact">("hero");
  const [activeModal, setActiveModal] = useState<"login" | "signup" | "watch" | "action" | null>(null);

  return (
    <div id="cyber-root" className="h-screen w-screen bg-black text-white flex items-center justify-center font-sans selection:bg-rose-600 selection:text-white overflow-hidden p-0 m-0 relative">
      
      {/* Background Looping Video */}
      <video
        src="https://res.cloudinary.com/by1cmiq3/video/upload/v1783257310/Seamless_looping_animation_chara__202607051842_jcsvq2.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* Subtle vignette/dark overlay over video to ensure text is fully readable */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/50 to-black/80 pointer-events-none z-10" />

      {/* Hexagonal overlay pattern for futuristic cyber look */}
      <div className="absolute inset-0 bg-[radial-gradient(#f43f5e_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-10 pointer-events-none z-10" />

      {/* --- PAGE CONTAINER WITH SLIDING TRANSITIONS --- */}
      <AnimatePresence mode="wait">
        {currentPage === "hero" && (
          <HeroSection
            onNavigate={setCurrentPage}
            onOpenModal={setActiveModal}
          />
        )}
        {currentPage === "about" && (
          <AboutSection
            onNavigate={setCurrentPage}
            onOpenModal={setActiveModal}
          />
        )}
        {currentPage === "skills" && (
          <SkillsSection
            onNavigate={setCurrentPage}
            onOpenModal={setActiveModal}
          />
        )}
        {currentPage === "projects" && (
          <ProjectsSection
            onNavigate={setCurrentPage}
            onOpenModal={setActiveModal}
          />
        )}
        {currentPage === "contact" && (
          <ContactSection
            onNavigate={setCurrentPage}
            onOpenModal={setActiveModal}
          />
        )}
      </AnimatePresence>

      {/* ========================================================================= *
      /* MODALS AND INTERACTION HANDLERS                                           *
      /* ========================================================================= */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md p-6 bg-zinc-950 border border-rose-500/30 rounded-2xl shadow-[0_0_50px_rgba(244,63,94,0.15)] overflow-hidden z-50"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none"
              >
                <X className="w-5 h-5" />
              </button>

              {activeModal === "login" && (
                <div>
                  <div className="flex items-center gap-2 text-rose-500 mb-4">
                    <Shield className="w-6 h-6" />
                    <span className="font-display font-bold tracking-wider text-sm uppercase">Secure Ingress</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 font-display text-left">Welcome Cyber Agent</h2>
                  <p className="text-zinc-400 text-sm mb-6 text-left">Initialize connection to your cyber neural system.</p>
                  
                  <form onSubmit={(e) => { e.preventDefault(); setActiveModal(null); }} className="space-y-4">
                    <div className="text-left">
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Agent ID</label>
                      <input 
                        type="text" 
                        required
                        placeholder="NINJA_404" 
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-rose-500/50 text-sm"
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Access Key</label>
                      <input 
                        type="password" 
                        required
                        placeholder="••••••••••••" 
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-rose-500/50 text-sm"
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="w-full py-3 mt-2 bg-rose-700 hover:bg-rose-600 rounded-lg font-bold text-sm tracking-widest transition-colors duration-300 border-none cursor-pointer text-white"
                    >
                      ESTABLISH UPLINK
                    </button>
                  </form>
                </div>
              )}

              {activeModal === "signup" && (
                <div>
                  <div className="flex items-center gap-2 text-rose-500 mb-4">
                    <Terminal className="w-6 h-6" />
                    <span className="font-display font-bold tracking-wider text-sm uppercase">Recruitment Hub</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 font-display text-left">Join the Ninja Syndicate</h2>
                  <p className="text-zinc-400 text-sm mb-6 text-left">Sign up to receive priority access to high-risk data nodes.</p>
                  
                  <form onSubmit={(e) => { e.preventDefault(); setActiveModal(null); }} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Choose Codex Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. shadow_blade" 
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-rose-500/50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Comms Address (Email)</label>
                      <input 
                        type="email" 
                        required
                        placeholder="your@address.com" 
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-rose-500/50 text-sm"
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="w-full py-3 mt-2 bg-rose-700 hover:bg-rose-600 rounded-lg font-bold text-sm tracking-widest transition-colors duration-300 border-none cursor-pointer text-white"
                    >
                      COMMENCE PROTOCOL
                    </button>
                  </form>
                </div>
              )}

              {activeModal === "watch" && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-6 h-6 text-rose-500 fill-rose-500 ml-1" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 font-display">Initiating Live Feed</h2>
                  <p className="text-zinc-400 text-sm mb-6">Connecting to Cyber Ninja VR simulation deck...</p>
                  
                  <div className="aspect-video w-full bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col items-center justify-center p-4 mb-6">
                    <div className="relative flex items-center justify-center w-12 h-12">
                      <div className="absolute inset-0 border-2 border-rose-500 rounded-full animate-ping opacity-75" />
                      <div className="w-3 h-3 bg-rose-500 rounded-full" />
                    </div>
                    <span className="text-xs font-mono text-rose-500 tracking-widest uppercase mt-4">Connecting to core feed</span>
                  </div>

                  <button 
                    onClick={() => setActiveModal(null)}
                    className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg font-bold text-sm tracking-widest transition-colors duration-300 cursor-pointer text-white"
                  >
                    ABORT SIMULATION
                  </button>
                </div>
              )}

              {activeModal === "action" && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-rose-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 font-display">Future Frontier Engaged</h2>
                  <p className="text-zinc-400 text-sm mb-4 text-center">Survival skills initialized. Prepare to write your story in the cyber mainframe.</p>
                  <p className="text-xs font-mono text-zinc-500 bg-zinc-900 p-3 rounded-lg border border-zinc-800 leading-normal mb-6 text-center">
                    [SYSTEM_INFO]: SECURE_LINK_VERIFIED // NODE_77a // PROTOCOL_ENGAGED // ALL SYSTEMS READY.
                  </p>
                  <button 
                    onClick={() => setActiveModal(null)}
                    className="w-full py-3 bg-rose-700 hover:bg-rose-600 rounded-lg font-bold text-sm tracking-widest transition-colors duration-300 border-none cursor-pointer text-white"
                  >
                    ENTER MAIN DECK
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
