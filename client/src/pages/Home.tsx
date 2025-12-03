import React, { useRef } from "react";
import { Layout } from "@/components/Layout";
import { SolutionSection } from "@/components/SolutionSection";
import { NewSection } from "@/components/NewSection";
import { SectionFive } from "@/components/SectionFive";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <Layout>
      <div ref={containerRef} className="relative bg-black">
        <HeroSection />
        <SkillsSection />
        <SolutionSection />
        <NewSection />
        <SectionFive />
      </div>
    </Layout>
  );
}

function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 relative overflow-hidden bg-gradient-to-b from-purple-900/20 to-black pt-32">
      
      {/* Text Content */}
      <div className="relative z-20 max-w-5xl mx-auto w-full text-center md:text-left">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-2xl font-light text-purple-200/80 mb-4"
        >
          Hello! I'm
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[12vw] leading-[0.8] font-bold tracking-tighter text-white mb-6 mix-blend-difference"
        >
          DHURUV
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl font-bold tracking-tighter text-white/50"
        >
          STUDENT & DEV
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 max-w-2xl"
        >
           <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed">
             A 17-year-old creative exploring the digital frontier. <br/>
             Cybersecurity enthusiast, Python & JS developer, and Game Designer.
           </p>
        </motion.div>
      </div>

      {/* Bottom Role Text */}
      <div className="absolute bottom-12 left-0 right-0 text-center z-20 px-6">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-purple-300/70 mb-2">
          A Creative
        </p>
        <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
          DESIGNER <span className="text-purple-500">DEVELOPER</span>
        </h3>
      </div>
    </section>
  );
}

function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.5"]
  });
  
  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [0.2, 1]);

  return (
    <section ref={ref} className="min-h-screen py-24 px-6 bg-black text-white flex flex-col justify-center border-t border-white/5">
      <div className="max-w-4xl mx-auto w-full space-y-16">
        
        {/* Header */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-purple-500 mb-8">
            Introduction
          </h3>
          
          <div className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight space-y-6">
             <motion.p style={{ opacity: opacity1 }} className="text-white">
               I'm a <span className="text-purple-400 font-normal">17-year-old</span> student in Class 12th, passionate about breaking things to make them secure.
             </motion.p>
             <p className="text-white/60 text-xl md:text-3xl">
               Exploring the "Hello World" of Cybersecurity, Python, JavaScript, and Game Design.
             </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
          <div className="space-y-4">
            <h4 className="text-sm font-mono uppercase tracking-widest text-white/40">Core Skills</h4>
            <ul className="space-y-2 text-lg">
              <li className="border-b border-white/10 py-2">Cybersecurity</li>
              <li className="border-b border-white/10 py-2">Python & JavaScript</li>
              <li className="border-b border-white/10 py-2">Game Development</li>
            </ul>
          </div>
          <div className="space-y-4">
             <h4 className="text-sm font-mono uppercase tracking-widest text-white/40">Interests</h4>
             <p className="text-white/70 leading-relaxed">
               I love diving into code, experimenting with game mechanics, and learning how systems work from the inside out. Always ready for a good vibe and a new challenge.
             </p>
          </div>
        </div>

      </div>
    </section>
  );
}
