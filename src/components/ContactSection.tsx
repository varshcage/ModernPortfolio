import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowUpRight, Send, CheckCircle2, Sparkles } from "lucide-react";
import Header from "./Header";

interface ContactSectionProps {
  onNavigate: (page: "hero" | "about" | "skills" | "projects" | "contact") => void;
  onOpenModal: (type: "login" | "signup" | "watch" | "action") => void;
}

export default function ContactSection({ onNavigate, onOpenModal }: ContactSectionProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUsingMailtoFallback, setIsUsingMailtoFallback] = useState(false);

  const getMailtoLink = () => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name || "Visitor"}`);
    const body = encodeURIComponent(
      `Hello Srishanker Heshavarshaan,\n\nYou have received a new contact message from your portfolio website:\n\n` +
      `Name: ${formState.name}\n` +
      `Email: ${formState.email}\n\n` +
      `Message:\n${formState.message}\n\n` +
      `Best regards,\n${formState.name}`
    );
    return `mailto:heshavarshan@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setIsUsingMailtoFallback(false);

    const accessKey = (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      // If no Web3Forms access key is configured, transition to mailto fallback so user can send email directly
      setIsUsingMailtoFallback(true);
      setLoading(false);
      setFormSubmitted(true);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `Portfolio Message from ${formState.name}`,
          from_name: "Developer Portfolio Network",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setFormSubmitted(true);
      } else {
        setErrorMessage(data.message || "Failed to transmit message securely.");
      }
    } catch (error) {
      setErrorMessage("Network error occurred while connecting to email dispatcher.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      key="contact-page"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-full h-full relative z-20 flex flex-col p-6 sm:p-8 md:p-12 lg:p-16 overflow-y-auto"
    >
      {/* Reusable Header */}
      <Header 
        currentPage="contact" 
        onNavigate={onNavigate} 
        onOpenModal={onOpenModal} 
      />

      {/* Main Grid Content */}
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-7xl mx-auto w-full mt-8 pb-12">
        
        {/* Left Column - Large Headings (Inspired directly by the reference image) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center text-left">
          {/* Top Label Tag */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-rose-500" />
            <span className="text-rose-500 text-xs font-mono tracking-widest uppercase">04 — Contact & Collaborate</span>
          </div>

          {/* Reference Headline styled perfectly */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[0.9] text-white uppercase mt-2">
            BUILDING INTERFACES<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500">
              THAT ATTRACT.
            </span><br />
            ENGAGE. CONVERT.
          </h1>

          {/* Divider */}
          <div className="w-20 h-0.5 bg-gradient-to-r from-rose-500 to-amber-400 mt-6 mb-6" />

          {/* Supporting Text */}
          <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-normal text-zinc-300/95">
            I create modern, high-performing websites and user experiences that build trust, tell your story, and help your brand grow and convert visitors into loyal clients.
          </p>

          {/* Action Buttons styled precisely as in the Reference Image */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 sm:mt-10">
            {/* Red pill button with white circle arrow */}
            <button
              onClick={() => {
                const el = document.getElementById("contact-form-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-4 px-6 py-3.5 sm:px-7 rounded-full bg-rose-600 hover:bg-rose-500 active:scale-95 transition-all duration-300 group hover:shadow-[0_0_25px_rgba(244,63,94,0.4)] border-none cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 text-black shadow-sm group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 text-rose-600 stroke-[3]" />
              </div>
              <span className="text-xs sm:text-sm font-extrabold tracking-wider text-white uppercase font-display">
                LET'S WORK TOGETHER
              </span>
            </button>

            {/* Outline circle icon with text */}
            <button
              onClick={() => onNavigate("projects")}
              className="inline-flex items-center gap-3 bg-transparent border-none p-0 group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-full border border-zinc-700 hover:border-rose-500/50 flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-105">
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-rose-400 transition-colors" />
              </div>
              <span className="text-xs sm:text-sm font-extrabold tracking-widest text-zinc-400 group-hover:text-white transition-colors uppercase font-display">
                VIEW MY PROJECTS
              </span>
            </button>
          </div>
        </div>

        {/* Right Column - Bento Stat Card & Interactive Contact Console */}
        <div id="contact-form-section" className="col-span-1 lg:col-span-5 flex flex-col gap-6 w-full max-w-lg mx-auto">
          
          {/* Floating Bento Stat Card */}
          <div className="relative w-full rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6 sm:p-8 backdrop-blur-md shadow-[0_0_50px_rgba(244,63,94,0.06)] hover:border-rose-500/20 transition-all duration-500 group">
            {/* Decorative Top glow */}
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-rose-500 to-transparent rounded-full" />
            
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Interactive Hub</span>
              {/* Vibrant Rose Circle with Arrow */}
              <div className="w-10 h-10 rounded-full bg-rose-600/10 border border-rose-500/30 flex items-center justify-center text-rose-500 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            <h3 className="font-display text-base sm:text-lg font-bold tracking-wide text-zinc-300 mb-3 group-hover:text-white transition-colors text-left">
              RESULTS THAT DRIVE GROWTH
            </h3>

            {/* Red accent divider line */}
            <div className="w-full h-px bg-rose-500/40 mb-5" />

            <div className="flex items-baseline gap-4">
              <div className="font-display text-4xl sm:text-5xl font-black bg-gradient-to-r from-white via-white to-zinc-500 bg-clip-text text-transparent">
                98%
              </div>
              <div className="text-xs text-zinc-400 uppercase tracking-widest font-body text-left">
                Client satisfaction / 2026
              </div>
            </div>
          </div>

          {/* Interactive Form Box - Clean, Futuristic Console Form */}
          <div className="w-full rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6 sm:p-8 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.div
                  key="form-fields"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2 text-left">
                    <Sparkles className="w-4 h-4 text-rose-500" />
                    SEND SECURE MESSAGE
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono mb-6 uppercase tracking-wider text-left">
                    Establishing live bridge protocol to agent...
                  </p>                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-left">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
                        Your Identity / Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Agent Skywalker"
                        className="w-full px-4 py-3 bg-black/60 border border-zinc-800/80 hover:border-zinc-700 focus:border-rose-500/50 rounded-xl text-white placeholder-zinc-700 focus:outline-none text-xs sm:text-sm transition-colors font-sans"
                      />
                    </div>

                    <div className="text-left">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
                        Uplink Address / Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="skywalker@frontier.net"
                        className="w-full px-4 py-3 bg-black/60 border border-zinc-800/80 hover:border-zinc-700 focus:border-rose-500/50 rounded-xl text-white placeholder-zinc-700 focus:outline-none text-xs sm:text-sm transition-colors font-sans"
                      />
                    </div>

                    <div className="text-left">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
                        Codex / Your Message
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Describe your blueprint, timeline, and launch parameters..."
                        className="w-full px-4 py-3 bg-black/60 border border-zinc-800/80 hover:border-zinc-700 focus:border-rose-500/50 rounded-xl text-white placeholder-zinc-700 focus:outline-none text-xs sm:text-sm transition-colors font-sans resize-none leading-relaxed"
                      />
                    </div>

                    {errorMessage && (
                      <p className="text-xs text-rose-500 font-mono text-left bg-rose-950/20 p-2.5 rounded-lg border border-rose-500/30 animate-pulse">
                        ⚠️ [ERROR]: {errorMessage}
                      </p>
                    )}

                    <div className="flex flex-col gap-2.5 pt-1">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 disabled:opacity-50 text-white font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] cursor-pointer active:scale-[0.98] border-none font-display"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2 font-mono">
                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            LAUNCHING BEACON...
                          </span>
                        ) : (
                          <>
                            TRANSMIT SIGNAL
                            <Send className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </button>

                      <a
                        href={getMailtoLink()}
                        className="w-full py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white bg-transparent text-center font-bold text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:bg-zinc-900/50 decoration-none font-display"
                      >
                        Or Open Direct Mail Client
                      </a>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle2 className="w-8 h-8 text-rose-500" />
                  </div>

                  {isUsingMailtoFallback ? (
                    <>
                      <h3 className="font-display text-xl font-bold text-white mb-2">
                        READY TO TRANSMIT
                      </h3>
                      <p className="text-xs font-mono text-rose-400 bg-rose-950/20 p-3 rounded-lg border border-rose-500/20 leading-normal mb-6 max-w-sm mx-auto">
                        [SYSTEM]: BLUEPRINT_COMPILED // SENDER: {formState.name}
                      </p>
                      <p className="text-zinc-400 text-xs sm:text-sm max-w-sm mx-auto mb-6 leading-relaxed">
                        To deliver this message securely to <strong className="text-white">heshavarshan@gmail.com</strong>, click the dispatch button below to open your native email app.
                      </p>

                      <div className="flex flex-col gap-3 max-w-sm mx-auto">
                        <a
                          href={getMailtoLink()}
                          onClick={() => {
                            setTimeout(() => {
                              setFormSubmitted(false);
                              setFormState({ name: "", email: "", message: "" });
                              setIsUsingMailtoFallback(false);
                            }, 100);
                          }}
                          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] cursor-pointer decoration-none font-display"
                        >
                          OPEN IN MAIL APP
                          <Send className="w-4 h-4" />
                        </a>

                        <button
                          onClick={() => {
                            setFormSubmitted(false);
                            setIsUsingMailtoFallback(false);
                          }}
                          className="text-[10px] text-zinc-500 hover:text-zinc-300 font-mono uppercase tracking-widest cursor-pointer mt-2 bg-transparent border-none"
                        >
                          ← EDIT TRANSMISSION
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="font-display text-xl font-bold text-white mb-2">
                        SIGNAL DISPATCHED
                      </h3>
                      <p className="text-xs font-mono text-emerald-400 bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/20 leading-normal mb-6 max-w-sm mx-auto">
                        [SUCCESS]: SECURE_BRIDGE_VERIFIED // DISPATCHED TO HESHAVARSHAN
                      </p>
                      <p className="text-zinc-400 text-xs sm:text-sm max-w-sm mx-auto mb-6 leading-relaxed">
                        Thank you for initiating contact! Your message has been sent directly to <strong className="text-white">heshavarshan@gmail.com</strong>. S.Heshavarshaan will connect with you shortly.
                      </p>
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormState({ name: "", email: "", message: "" });
                          setIsUsingMailtoFallback(false);
                        }}
                        className="px-6 py-2.5 rounded-full border border-rose-500/50 hover:border-rose-500 text-rose-400 hover:text-white bg-transparent text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer font-display"
                      >
                        SEND NEW BEACON
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </main>

      {/* Futuristic footer row of credentials */}
      <footer className="mt-auto pt-8 border-t border-zinc-900 flex-shrink-0 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
        <div>© 2026 S.HESHAVARSHAAN. ALL CHANNELS SECURED.</div>
        <div className="flex gap-4">
          <a href="mailto:heshavarshan@gmail.com" className="hover:text-rose-400 transition-colors">heshavarshan@gmail.com</a>
          <span>·</span>
          <span>0740 464 926</span>
        </div>
      </footer>

    </motion.div>
  );
}
