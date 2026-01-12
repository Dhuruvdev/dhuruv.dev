import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import catLiveCam from "@assets/stock_images/cat_typing_on_laptop_d2f16a9e.jpg";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tools: string[];
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "CHAIN-LABS",
    category: "Security",
    description: "Advanced network vulnerability scanner built with Python.",
    tools: ["Python", "Scapy", "Nmap"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "HARDCORE",
    category: "Development",
    description: "End-to-end encrypted messaging platform.",
    tools: ["JavaScript", "Node.js", "Socket.io"],
    image: "https://images.unsplash.com/photo-1614850523296-e8c0a97323bc?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "SECURE-VOID",
    category: "Monitoring",
    description: "Real-time security monitoring dashboard.",
    tools: ["React", "Python", "FastAPI"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0122957c3e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "QUANTUM",
    category: "Encryption",
    description: "Next-gen encryption protocol research.",
    tools: ["Rust", "Wasm"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
  }
];

export function ProjectShowcase() {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastPlayedIndex = useRef<number>(-1);

  useEffect(() => {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
    audio.volume = 0.15;
    scrollAudioRef.current = audio;
  }, []);

  const { scrollXProgress } = useScroll({
    container: targetRef,
  });

  useMotionValueEvent(scrollXProgress, "change", (latest) => {
    const totalProjects = projects.length;
    const currentIndex = Math.floor(latest * totalProjects);
    
    if (currentIndex !== lastPlayedIndex.current && currentIndex >= 0 && currentIndex < totalProjects) {
      if (scrollAudioRef.current) {
        scrollAudioRef.current.currentTime = 0;
        scrollAudioRef.current.play().catch(() => {});
      }
      lastPlayedIndex.current = currentIndex;
    }
  });

  return (
    <section className="bg-black py-20 overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full px-6 mb-12">
        <h2 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] text-white uppercase font-sans italic">
          BORN TO CODE<br />
          <span className="text-pink-300">FORCED TO SLAY</span>
        </h2>
      </div>

      {/* Horizontal Scroll Area */}
      <div 
        ref={targetRef}
        className="flex overflow-x-auto hide-scrollbar gap-4 px-[10vw] pb-20 snap-x snap-mandatory perspective-1000"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            className="flex-shrink-0 w-[75vw] md:w-[30vw] aspect-[3/4] relative rounded-2xl overflow-hidden snap-center group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <img 
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            
            <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black italic text-white/40 uppercase tracking-tighter mb-1">
                  {project.category}
                </span>
                <h3 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-none group-hover:text-pink-300 transition-colors">
                  {project.title}
                </h3>
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
