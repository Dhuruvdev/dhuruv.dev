import React, { useRef } from "react";
import { Layout } from "@/components/Layout";
import { SolutionSection } from "@/components/SolutionSection";
import { NewSection } from "@/components/NewSection";
import { SectionFive } from "@/components/SectionFive";
import { motion, useScroll, useTransform } from "framer-motion";
import tornadoVideo from "@assets/tornado-home_1764776962349.mp4";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <Layout>
      <div ref={containerRef} className="relative">
        <HeroSection />
        <IntroductionSection />
        <SolutionSection />
        <NewSection />
        <SectionFive />
        {/* Spacer for scrolling feel */}
        <div className="h-[50vh] bg-black" /> 
      </div>
    </Layout>
  );
}

function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-between pt-24 pb-24 px-4 relative overflow-hidden">
      {/* Big Title - Positioned absolutely or just large at top */}
      <div className="w-full flex justify-center md:justify-start relative z-10">
        <h1 className="text-[12vw] md:text-[10vw] leading-[0.8] font-bold tracking-tighter uppercase text-center md:text-left mix-blend-difference">
          HackFirst
        </h1>
      </div>

      {/* Glitch Video Area */}
      <div className="flex-grow flex items-center justify-center my-8 md:my-0 relative">
        <div className="relative w-full max-w-md aspect-[4/5] md:aspect-square overflow-hidden grayscale contrast-125 brightness-90">
           <video 
            src={tornadoVideo} 
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover mix-blend-screen opacity-90"
          />
          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 animate-scan pointer-events-none"></div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="space-y-4 relative z-10">
        <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Cyberattack Simulations
        </h3>
        <h2 className="text-3xl md:text-5xl font-sans font-normal leading-tight text-balance max-w-2xl tracking-tight">
          Most advanced cyberattack simulations: HackFirst™
        </h2>
      </div>
    </section>
  );
}

function IntroductionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.5"]
  });
  
  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [0.2, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.5], [0.2, 1]);

  return (
    <section ref={ref} className="min-h-screen py-24 px-4 bg-black text-white flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full space-y-24">
        
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-8">
            Introduction
          </h3>
          
          <div className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight space-y-2">
             <motion.p style={{ opacity: opacity1 }} className="text-white">
               Modern threats require more than standard checks.
             </motion.p>
             <motion.p style={{ opacity: opacity2 }} className="text-white/40 transition-colors duration-500 hover:text-white/90">
               Audits and pentests based on compliance requirements are not enough to protect against real attacks
             </motion.p>
          </div>
        </div>

        {/* Secondary Text */}
        <div className="max-w-2xl ml-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
          <p>
            Compliance-based audits and pentests identify only superficial vulnerabilities. They do not simulate attacks by real hackers and do not emulate complex hacking methods such as{" "}
            <span className="text-white border-b border-white/30 hover:border-white transition-colors cursor-default">phishing</span>,{" "}
            <span className="text-white border-b border-white/30 hover:border-white transition-colors cursor-default">lateral movement</span>,{" "}
            <span className="text-white border-b border-white/30 hover:border-white transition-colors cursor-default">privilege escalation</span> and{" "}
            <span className="text-white border-b border-white/30 hover:border-white transition-colors cursor-default">persistent presence</span> in the system.
          </p>
        </div>

      </div>
    </section>
  );
}
