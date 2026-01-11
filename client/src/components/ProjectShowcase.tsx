import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tools: string[];
  image?: string;
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Network Scanner",
    category: "Cybersecurity Tool",
    description: "Advanced network vulnerability scanner built with Python. Detects open ports, services, and potential security risks.",
    tools: ["Python", "Scapy", "Nmap"],
  },
  {
    id: 2,
    title: "Secure Chat App",
    category: "Web Application",
    description: "End-to-end encrypted messaging platform with real-time communication and secure key exchange.",
    tools: ["JavaScript", "Node.js", "Socket.io", "Crypto"],
  },
  {
    id: 3,
    title: "Password Manager",
    category: "Security Tool",
    description: "Local-first password manager with AES-256 encryption and secure vault storage.",
    tools: ["Python", "SQLite", "Cryptography"],
  },
  {
    id: 4,
    title: "Threat Monitor",
    category: "Monitoring Dashboard",
    description: "Real-time security monitoring dashboard for tracking potential threats and system vulnerabilities.",
    tools: ["React", "Python", "FastAPI", "WebSocket"],
  },
];

export function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 px-6 bg-black" id="projects">
      <div className="max-w-7xl mx-auto">
        {/* Header from Screenshot */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
          <div className="space-y-2">
            <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none text-white uppercase">
              I BUILT IT<br />
              <span className="text-pink-300">NO CAP</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border-2 border-white/20 hover-elevate group">
               <img 
                 src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400" 
                 alt="Profile" 
                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
               />
            </div>
            <span className="mt-2 text-[10px] font-mono tracking-widest text-white/50 uppercase">MY-LIVE-CAM</span>
          </div>
        </div>

        {/* Projects Grid with Large Cards like the Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {projects.map((project, index) => (
            <div key={project.id} className="relative aspect-[3/4] group overflow-hidden rounded-2xl hover-elevate">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img 
                src={`https://images.unsplash.com/photo-${1550745165 + index}-9bc122957c3e?auto=format&fit=crop&q=80&w=800`}
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                <span className="text-xs font-mono tracking-widest text-white/60 mb-2 uppercase">{project.category}</span>
                <h3 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter group-hover:text-pink-300 transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-4 mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="px-4 py-2 border border-white/20 rounded-full text-[10px] font-mono tracking-widest text-white uppercase">VIEW PROJECT</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="group relative"
      data-testid={`project-card-${project.id}`}
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-6 border border-white/10 rounded-md hover-elevate transition-all duration-300">
        {/* Number */}
        <div className="flex-shrink-0">
          <span className="text-5xl md:text-7xl font-bold text-white/10 group-hover:text-cyan-500/30 transition-colors duration-300">
            {String(project.id).padStart(2, '0')}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300" data-testid={`project-title-${project.id}`}>
                {project.title}
              </h3>
              <p className="text-sm text-white/50 uppercase tracking-wider">{project.category}</p>
            </div>
            
            {/* Links */}
            <div className="flex items-center gap-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 text-white/50 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 text-white/50 hover:text-white transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl" data-testid={`project-desc-${project.id}`}>
            {project.description}
          </p>

          {/* Tools */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="text-[10px] md:text-xs px-2 py-1 bg-white/5 border border-white/10 text-white/70 rounded"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Preview Image Placeholder */}
        <div className="hidden lg:block flex-shrink-0 w-48 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent border border-white/10 rounded-md overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-white/20">
            <span className="text-xs font-mono">Preview</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
