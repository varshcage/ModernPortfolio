import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Folder, ArrowRight, Layers, Layout, Globe, Sparkles } from "lucide-react";
import Header from "./Header";

interface ProjectsSectionProps {
  onNavigate: (page: "hero" | "about" | "skills" | "projects" | "contact") => void;
  onOpenModal: (type: "login" | "signup" | "watch" | "action") => void;
}

interface Project {
  id: number;
  title: string;
  category: string;
  tagline: string;
  description: string;
  impact: string;
  timeline: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export default function ProjectsSection({ onNavigate, onOpenModal }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<"all" | "featured" | "development" | "design">("all");
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "AgroTech",
      category: "AI-Powered Full-Stack Platform",
      tagline: "Agriculture Learning Platform",
      description: "An agriculture learning platform built for students, combining crop guidance, educational content, and data-backed recommendations in a modern web experience.",
      impact: "Guided product direction across UI, frontend architecture, and API integration.",
      timeline: "Featured build",
      featured: true,
      tags: ["React", "TypeScript", "Python", "Flask"],
      image: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
      githubUrl: "https://github.com/varshcage/AgriProject",
      liveUrl: "#"
    },
    {
      id: 2,
      title: "Hotel Management System",
      category: "Operations Dashboard",
      tagline: "Hotel Administration Interface",
      description: "A polished hotel administration interface handling reservations, guest records, room availability, and daily operational workflows through a structured dashboard.",
      impact: "Focused on responsive frontend delivery and clear admin-side usability.",
      timeline: "Featured build",
      featured: true,
      tags: ["React", "TypeScript", "Tailwind CSS", "GitHub"],
      image: "linear-gradient(135deg, #f43f5e 0%, #be185d 100%)",

    },
    {
      id: 3,
      title: "Gallery Cafe",
      category: "Full-Stack Business Website",
      tagline: "Cafe Website with Interactive Menus",
      description: "A cafe website with interactive menus, visual gallery sections, and a PHP/MySQL backend supporting dynamic content and service updates.",
      impact: "Brought together presentation design and full-stack implementation for a small business workflow.",
      timeline: "Web application",
      featured: false,
      tags: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      image: "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)",

    },
    {
      id: 4,
      title: "PahanaEdu",
      category: "Education Management Platform",
      tagline: "Student-Focused Web Application",
      description: "A student-focused web application with a responsive interface, structured academic workflows, and a MySQL-backed system for education management.",
      impact: "Balanced frontend clarity with dependable server-side structure.",
      timeline: "Academic system",
      featured: false,
      tags: ["Java", "MySQL", "Tailwind CSS", "Git"],
      image: "linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)",
      githubUrl: "https://github.com/varshcage/CSEProj",
      liveUrl: "#"
    },
    {
      id: 5,
      title: "Employee Management System",
      category: "Desktop Administration Tool",
      tagline: "Java Swing Desktop Application",
      description: "A Java Swing desktop application for employee records, payroll handling, and internal reporting inside a single management workflow.",
      impact: "Delivered a structured desktop experience around reliability, forms, and reporting flow.",
      timeline: "Desktop application",
      featured: false,
      tags: ["Java", "GitHub"],
      image: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    },
    {
      id: 6,
      title: "Polek E-Market",
      category: "Marketplace UI/UX Design",
      tagline: "Commerce-Focused Interface Concept",
      description: "A commerce-focused interface concept shaped around product browsing, conversion flow, and a clearer shopping experience for end users.",
      impact: "Led interface hierarchy, visual direction, and purchase-flow clarity.",
      timeline: "Design project",
      featured: false,
      tags: ["Figma", "Illustrator", "Photoshop", "Canva"],
      image: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
      liveUrl: "https://www.polekemarket.com/"
    },
        {
      id: 7,
      title: "MediCare",
      category: "Full-Stack Hospital Management Website",
      tagline: "Healthcare-Focused Web Application",
      description: "A healthcare-focused web application for managing hospital operations, patient records, and medical workflows.",
      impact: "Integrated frontend design with backend functionality for a seamless healthcare management experience.",
      timeline: "Web application",
      featured: false,
      tags: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      image: "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)",
      githubUrl: "https://github.com/varshcage/MedicCare"
    },
    
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "featured") return p.featured;
    if (filter === "development") return p.tags.some(tag => ["React", "TypeScript", "Python", "Flask", "Java", "PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "Git", "GitHub"].includes(tag));
    if (filter === "design") return p.tags.some(tag => ["Figma", "Illustrator", "Photoshop", "Canva"].includes(tag));
    return true;
  });

  const featuredProjects = projects.filter(p => p.featured);
  const projectCount = projects.length;

  return (
    <motion.div
      key="projects-page"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-full h-full relative z-20 flex flex-col p-6 sm:p-8 md:p-12 lg:p-16 overflow-y-auto"
    >
      <Header 
        currentPage="projects" 
        onNavigate={onNavigate} 
        onOpenModal={onOpenModal} 
      />

      <main className="flex-grow py-6 sm:py-10 max-w-7xl mx-auto w-full">
        <section className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mt-4 mb-10">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-rose-500" />
              <span className="font-mono text-rose-500 text-xs uppercase tracking-widest">03 — Projects</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white uppercase leading-none">
              Selected <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-500 to-amber-500 italic">Work</span>
            </h2>
            <div className="mt-5 h-0.5 w-16 bg-gradient-to-r from-rose-500 to-amber-500" />
            <p className="mt-6 text-zinc-400 text-sm leading-relaxed max-w-xl font-body">
              A more structured view of product, system, and interface work across frontend engineering, full-stack delivery, and visual design.
            </p>
          </div>

          <div className="flex items-center gap-2 border border-zinc-900 bg-zinc-950/80 p-1.5 rounded-full backdrop-blur-sm self-start">
            {[
              { id: "all", label: "All Works" },
              { id: "featured", label: "Featured" },
              { id: "development", label: "Engineering" },
              { id: "design", label: "Design" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border-none ${
                  filter === tab.id
                    ? "bg-rose-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                    : "text-zinc-500 hover:text-white bg-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="rounded-2xl border border-zinc-900 bg-zinc-950/70 px-4 py-4 text-center">
            <div className="font-display text-2xl font-semibold text-white">{projectCount}</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">Projects</div>
          </div>
          <div className="rounded-2xl border border-zinc-900 bg-zinc-950/70 px-4 py-4 text-center">
            <div className="font-display text-2xl font-semibold text-white">{featuredProjects.length}</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">Featured</div>
          </div>
          <div className="rounded-2xl border border-zinc-900 bg-zinc-950/70 px-4 py-4 text-center">
            <div className="font-display text-2xl font-semibold text-white">SVG</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">Stack Marks</div>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isHovered = hoveredProjectId === project.id;

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  className={`rounded-3xl border border-zinc-900 bg-zinc-950/70 overflow-hidden flex flex-col group/project hover:border-rose-500/30 transition-all duration-500 relative ${
                    project.featured ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-30 bg-rose-600/90 border border-rose-500 rounded-full px-3 py-1 backdrop-blur-md">
                      <span className="text-[9px] font-mono font-bold text-white uppercase tracking-widest">Featured</span>
                    </div>
                  )}

                  <div className="absolute top-4 right-4 z-30 bg-black/60 border border-zinc-800 rounded-full px-3 py-1 flex items-center gap-1.5 backdrop-blur-md">
                    {project.tags.some(tag => ["Figma", "Illustrator", "Photoshop", "Canva"].includes(tag)) ? (
                      <>
                        <Layout className="w-3 h-3 text-rose-400" />
                        <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Design</span>
                      </>
                    ) : (
                      <>
                        <Globe className="w-3 h-3 text-emerald-400" />
                        <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Engineering</span>
                      </>
                    )}
                  </div>

                  <div 
                    className="h-44 sm:h-48 relative overflow-hidden flex items-center justify-center p-6"
                    style={{ background: project.image }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
                    
                    <Folder className="w-12 h-12 text-white/40 group-hover/project:scale-110 group-hover/project:text-white/80 transition-all duration-500 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-rose-400 text-[10px] font-mono uppercase tracking-widest font-bold">
                        {project.category}
                      </span>
                      <span className="text-zinc-500 text-[9px] font-mono uppercase tracking-widest">
                        {project.timeline}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mt-1 group-hover/project:text-rose-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed flex-grow font-body">
                      {project.description}
                    </p>
                    
                    <div className="mt-3 border-l-2 border-rose-500 pl-4">
                      <p className="text-zinc-500 text-[11px] leading-relaxed italic">
                        {project.impact}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 my-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] px-2.5 py-1 rounded-md font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="w-full h-px bg-zinc-900 mb-4" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 border border-zinc-900 hover:border-rose-500/40 hover:bg-rose-500/5 rounded-full transition-all duration-300 text-zinc-500 hover:text-white"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            className="p-2 border border-zinc-900 hover:border-rose-500/40 hover:bg-rose-500/5 rounded-full transition-all duration-300 text-zinc-500 hover:text-white"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => onNavigate("contact")}
                        className="bg-transparent border-none p-0 flex items-center gap-1.5 text-[10px] font-mono font-black tracking-widest text-zinc-500 hover:text-white uppercase transition-colors cursor-pointer group-hover/project:text-rose-400"
                      >
                        INQUIRE <ArrowRight className="w-3.5 h-3.5 group-hover/project:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </section>
      </main>

      <footer className="mt-auto pt-6 border-t border-zinc-900 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
        <div>© 2026 S.HESHAVARSHAAN. WORK REGISTER LOCKED.</div>
        <button
          onClick={() => onNavigate("contact")}
          className="bg-transparent border-none p-0 flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-rose-400 hover:text-white transition-colors cursor-pointer uppercase"
        >
          CONTACT <Sparkles className="w-3.5 h-3.5" />
        </button>
      </footer>
    </motion.div>
  );
}