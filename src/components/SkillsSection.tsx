import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Code2, Database, Layers, Palette, Star, ArrowUpRight } from "lucide-react";
import Header from "./Header";

interface SkillsSectionProps {
  onNavigate: (page: "hero" | "about" | "skills" | "projects" | "contact") => void;
  onOpenModal: (type: "login" | "signup" | "watch" | "action") => void;
}

type TechItem = {
  name: string;
  slug: string;
  note: string;
  proficiency: number; // Percentage
  invertInDark?: boolean;
};

type TechGroup = {
  title: string;
  summary: string;
  icon: any;
  items: TechItem[];
};

const techGroups: TechGroup[] = [
  {
    title: 'Frontend Engineering',
    summary: 'Core UI stack for crafting highly animated, production-facing responsive web apps.',
    icon: Code2,
    items: [
      { name: 'React', slug: 'react', note: 'Component architecture', proficiency: 92 },
      { name: 'TypeScript', slug: 'typescript', note: 'Strictly typed applications', proficiency: 90 },
      { name: 'JavaScript', slug: 'javascript', note: 'High performance script logic', proficiency:75 },
      { name: 'HTML5', slug: 'html5', note: 'Semantic accessibility structures', proficiency: 98 },
      { name: 'CSS3', slug: 'css', note: 'Custom grids & layouts', proficiency: 95 },
      { name: 'Tailwind CSS', slug: 'tailwind-css', note: 'Utility-first utility libraries', proficiency: 96 },
    ],
  },
  {
    title: 'Backend & App Logic',
    summary: 'Languages and framework runtimes used to construct custom backend servers, APIs, and microservices.',
    icon: Layers,
    items: [
      { name: 'Java', slug: 'java', note: 'Object-oriented core logic', proficiency: 50 },
      { name: 'Python', slug: 'python', note: 'Script automation & ML tooling', proficiency: 48 },
      { name: 'PHP', slug: 'php', note: 'Dynamic server site delivery', proficiency: 50 },
      { name: 'Flask', slug: 'flask', note: 'Micro-API service routes', proficiency: 30, invertInDark: true },
      { name: 'C++', slug: 'cplusplus', note: 'Performance computing fundamentals', proficiency:88 },
    ],
  },
  {
    title: 'Data & Platform Tools',
    summary: 'Data models, standard database clusters, pipeline systems, and collaborative development tools.',
    icon: Database,
    items: [
      { name: 'MongoDB', slug: 'mongodb', note: 'Document model structures', proficiency: 85 },
      { name: 'MySQL', slug: 'mysql', note: 'Relational schema structures', proficiency: 88 },
      { name: 'Git', slug: 'git', note: 'Version state control tracking', proficiency: 92 },
      { name: 'GitHub', slug: 'github', note: 'Cloud continuous integration', proficiency: 94, invertInDark: true },
      { name: 'Postman', slug: 'postman', note: 'API communication unit testing', proficiency: 90 },
      { name: 'Swagger', slug: 'swagger', note: 'API documentation & testing', proficiency: 98},
    ],
  },
  {
    title: 'Design & Creative Suite',
    summary: 'Imaging editors, branding tools, vector vector graphics software, and prototype designers.',
    icon: Palette,
    items: [
      { name: 'Figma', slug: 'figma', note: 'High fidelity interface testing', proficiency: 94 },
      { name: 'Photoshop', slug: 'photoshop', note: 'Precision design & layer adjustment', proficiency: 95 },
      { name: 'Illustrator', slug: 'illustrator', note: 'Scalable emblem & branding systems', proficiency: 92 },
      { name: 'Canva', slug: 'canva', note: 'Accelerated creative media assets', proficiency: 90 },
      { name: 'Affinity Designer', slug: 'affinity-designer', note: 'Vector curves and typography grids', proficiency: 88 },
    ],
  },
];

function getTechIcon(slug: string) {
  return `https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${slug}/default.svg`;
}

function getFallbackLabel(name: string) {
  return name
    .split(/[\s+/.-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function TechLogo({ item }: { item: TechItem }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-850 text-[10px] font-bold tracking-wide text-rose-400">
        {getFallbackLabel(item.name)}
      </div>
    );
  }

  return (
    <img
      src={getTechIcon(item.slug)}
      alt={`${item.name} logo`}
      className={`h-7 w-7 object-contain ${item.invertInDark ? 'dark:invert dark:brightness-200' : ''}`}
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
      referrerPolicy="no-referrer"
    />
  );
}

export default function SkillsSection({ onNavigate, onOpenModal }: SkillsSectionProps) {
  const [activeGroupIndex, setActiveGroupIndex] = useState<number | null>(null);

  const totalTechs = techGroups.reduce((acc, group) => acc + group.items.length, 0);

  return (
    <motion.div
      key="skills-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-full h-full relative z-20 flex flex-col p-6 sm:p-8 md:p-12 lg:p-16 overflow-y-auto"
    >
      {/* Reusable Header */}
      <Header 
        currentPage="skills" 
        onNavigate={onNavigate} 
        onOpenModal={onOpenModal} 
      />

      {/* Main Content */}
      <main className="flex-grow py-6 sm:py-10 max-w-7xl mx-auto w-full">
        {/* Intro Banner */}
        <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mt-4 mb-10">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-rose-500" />
              <span className="font-mono text-rose-500 text-xs uppercase tracking-widest">02 — My Skills</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white uppercase leading-none">
              Tech Stack &amp;<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-amber-500 italic">Professional Toolbox</span>
            </h2>
            <div className="mt-5 h-0.5 w-16 bg-gradient-to-r from-rose-500 to-amber-500" />
            <p className="mt-6 text-zinc-400 text-sm leading-relaxed max-w-xl font-body">
              A comprehensive directory of my multi-disciplinary expertise. I balance deep code engineering logic with sophisticated visual design system software.
            </p>
          </div>

          {/* Quick Counter Bento Cards */}
          <div className="grid grid-cols-3 gap-3 sm:min-w-[340px] w-full lg:w-auto">
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/80 p-4 text-center backdrop-blur-sm">
              <div className="font-display text-2xl font-black text-rose-500">{totalTechs}</div>
              <div className="mt-1 text-[9px] uppercase tracking-wider text-zinc-500">Technologies</div>
            </div>
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/80 p-4 text-center backdrop-blur-sm">
              <div className="font-display text-2xl font-black text-rose-500">{techGroups.length}</div>
              <div className="mt-1 text-[9px] uppercase tracking-wider text-zinc-500">Domains</div>
            </div>
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/80 p-4 text-center backdrop-blur-sm">
              <div className="font-display text-2xl font-black text-rose-500">SVG</div>
              <div className="mt-1 text-[9px] uppercase tracking-wider text-zinc-500">Brand Icons</div>
            </div>
          </div>
        </section>

        {/* Dynamic Skills Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          {techGroups.map((group, groupIndex) => {
            const GroupIcon = group.icon;
            const isHovered = activeGroupIndex === groupIndex;

            return (
              <motion.article
                key={group.title}
                onMouseEnter={() => setActiveGroupIndex(groupIndex)}
                onMouseLeave={() => setActiveGroupIndex(null)}
                className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-sm transition-all duration-500 relative overflow-hidden flex flex-col ${
                  isHovered 
                    ? "border-rose-500/40 bg-zinc-950/95 shadow-[0_0_30px_rgba(244,63,94,0.08)]" 
                    : "border-zinc-900 bg-zinc-950/70"
                }`}
              >
                {/* Decorative glow bar on hover */}
                <div className={`absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-rose-500 to-transparent transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`} />

                {/* Card Title & Info */}
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="text-left">
                    <div className="flex items-center gap-2.5 text-rose-400 mb-1">
                      <GroupIcon className="w-5 h-5 text-rose-400" />
                      <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-500">Domain {groupIndex + 1}</span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-rose-400 transition-colors">
                      {group.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400 max-w-sm">
                      {group.summary}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full border border-zinc-900 bg-black/40 px-3 py-1 text-[9px] font-mono uppercase tracking-[0.15em] text-zinc-500">
                    {group.items.length} Skills
                  </span>
                </div>

                {/* Sub-divider line */}
                <div className="w-full h-px bg-zinc-900 mb-6" />

                {/* Grid List with percentage sliders */}
                <ul className="grid grid-cols-1 gap-5 flex-grow">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex flex-col gap-2 group/item"
                    >
                      <div className="flex items-center justify-between gap-3">
                        {/* Logo & Name */}
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800/60 group-hover/item:border-rose-500/20 transition-all duration-300">
                            <TechLogo item={item} />
                          </div>
                          <div className="text-left min-w-0">
                            <p className="truncate text-sm font-semibold text-white group-hover/item:text-rose-400 transition-colors">
                              {item.name}
                            </p>
                            <p className="truncate text-[10px] text-zinc-500 font-normal">
                              {item.note}
                            </p>
                          </div>
                        </div>

                        {/* Star + percentage */}
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span className="text-[11px] font-mono font-bold text-zinc-300">{item.proficiency}%</span>
                        </div>
                      </div>

                      {/* Animated slide bar */}
                      <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden mt-1">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                          className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-full"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto pt-6 border-t border-zinc-900 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
        <div>SYSTEM STATUS: 100% OPERATIONAL // ALL NODES SECURE.</div>
        <button
          onClick={() => onNavigate("projects")}
          className="bg-transparent border-none p-0 flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-rose-400 hover:text-white transition-colors cursor-pointer uppercase"
        >
          EXPLORE PROJECTS <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </footer>
    </motion.div>
  );
}
