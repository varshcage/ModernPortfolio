import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Send, 
  CheckCircle2, 
  Sparkles,
  Mail,
  Linkedin,
  Phone,
  Palette,
  ArrowRight as ArrowRightIcon
} from "lucide-react";
import Header from "./Header";

interface ContactSectionProps {
  onNavigate: (page: "hero" | "about" | "skills" | "projects" | "contact") => void;
  onOpenModal: (type: "login" | "signup" | "watch" | "action") => void;
}

const contactLinks = [
  { icon: Mail, label: 'Email', value: 'heshavarshan@gmail.com', href: 'mailto:heshavarshan@gmail.com' },
  { icon: Linkedin, label: 'LinkedIn', value: 'Srishanker Heshavarshaan', href: 'https://linkedin.com' },
  { icon: Phone, label: 'Phone', value: '0740 464 926', href: 'tel:0740464926' },
  { icon: Palette, label: 'Portfolio', value: 'Varshcage', href: '#' },
];

export default function ContactSection({ onNavigate, onOpenModal }: ContactSectionProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate secure transmission
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 1200);
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
      <main className="flex-grow max-w-4xl mx-auto w-full mt-8 pb-12">
        
        {/* Header Section - Matching the reference design */}
        <div className="text-center mb-16">
          <span className="text-rose-500 text-xs font-mono tracking-widest uppercase">06 — Contact</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mt-3 leading-tight">
            Let's Build<br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500">Something Great</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-rose-500 to-amber-400 mx-auto mt-6" />
          <p className="text-zinc-400 mt-6 max-w-md mx-auto leading-relaxed font-body">
            Whether you have a project in mind, a role to fill, or just want to connect — I'd love to hear from you.
          </p>
        </div>

        {/* Contact Links Grid - Matching the reference design */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {contactLinks.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group flex items-center gap-4 rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-5 hover:bg-gradient-to-r hover:from-rose-500 hover:to-amber-500 hover:border-transparent transition-all duration-200 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 group-hover:bg-white/20 group-hover:border-white/30 transition-all">
                <c.icon className="w-5 h-5 text-rose-400 group-hover:text-white transition-colors" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-zinc-500 group-hover:text-white/70 uppercase tracking-wider font-mono transition-colors">
                  {c.label}
                </p>
                <p className="text-zinc-300 group-hover:text-white font-medium text-sm truncate transition-colors">
                  {c.value}
                </p>
              </div>
              <ArrowRightIcon className="w-4 h-4 text-zinc-600 group-hover:text-white/70 ml-auto transition-colors" />
            </motion.a>
          ))}
        </div>

        {/* Big CTA Button - Matching the reference design */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <a
            href="mailto:heshavarshan@gmail.com"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-10 py-4 rounded-full font-semibold text-base hover:shadow-[0_0_30px_rgba(244,63,94,0.3)] transition-all duration-200 hover:scale-105"
          >
            <Send className="w-4 h-4" />
            Send me a Message
          </a>
        </motion.div>

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