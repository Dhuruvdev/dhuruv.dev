import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tools: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Network Scanner",
    category: "Cybersecurity Tool",
    description: "Advanced network vulnerability scanner built with Python.",
    tools: ["Python", "Scapy", "Nmap"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Secure Chat App",
    category: "Web Application",
    description: "End-to-end encrypted messaging platform.",
    tools: ["JavaScript", "Node.js", "Socket.io"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Threat Monitor",
    category: "Monitoring Dashboard",
    description: "Real-time security monitoring dashboard.",
    tools: ["React", "Python", "FastAPI"],
    image: "https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=800"
  },
];

export function ProjectShowcase() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    target: targetRef,
  });

  return (
    <section className="bg-black py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex justify-between items-start">
          <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none text-white uppercase">
            I BUILT IT<br />
            <span className="text-pink-300">NO CAP</span>
          </h2>
          
          <div className="flex flex-col items-end">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-white/20 hover-elevate group bg-zinc-900">
               <img 
                 src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400" 
                 alt="Profile" 
                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
               />
            </div>
            <span className="mt-2 text-[10px] font-mono tracking-widest text-white/50 uppercase">MY-LIVE-CAM</span>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div 
        ref={targetRef}
        className="flex overflow-x-auto hide-scrollbar gap-6 px-6 pb-12 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            className="flex-shrink-0 w-[85vw] md:w-[45vw] aspect-[4/5] relative rounded-3xl overflow-hidden snap-center group hover-elevate"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
            <img 
              src={project.image || `https://images.unsplash.com/photo-${1550745165 + index}-9bc122957c3e?auto=format&fit=crop&q=80&w=800`}
              alt={project.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-20">
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-black italic text-white/40 uppercase tracking-tighter mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter leading-none group-hover:text-pink-300 transition-colors">
                    {project.title}
                  </h3>
                </div>
                
                <div className="pt-4 flex items-center justify-between border-t border-white/10">
                   <span className="text-2xl md:text-4xl font-black italic text-white/20 tracking-tighter uppercase">
                     {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.')}
                   </span>
                   <div className="text-xs font-mono tracking-[0.3em] text-white/50 uppercase group-hover:text-white transition-colors">
                     HARDIK BHANSALI
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
