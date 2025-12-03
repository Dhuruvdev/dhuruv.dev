import React, { useRef } from "react";
import { Layout } from "@/components/Layout";
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
        {/* Spacer for scrolling feel */}
        <div className="h-[50vh] bg-black" /> 
      </div>
    </Layout>
  );
}

function HeroSection() {
  return (
    <section className="h-screen flex flex-col relative overflow-hidden px-4 py-4">
      {/* Big Title */}
      <div className="w-full relative z-10 mt-16 md:mt-0">
        <h1 className="text-[13vw] leading-[0.8] font-bold tracking-tighter uppercase text-center md:text-left mix-blend-difference text-white">
          HackFirst
        </h1>
      </div>

      {/* Glitch Video Area - Centered */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div className="relative w-[60vw] md:w-[30vw] aspect-[3/4] overflow-hidden">
           <video 
            src={tornadoVideo} 
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale contrast-[1.2] brightness-75 scale-110"
          />
          {/* Glitch Overlays */}
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-30"></div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-auto mb-16 relative z-10 text-white mix-blend-difference">
        <h3 className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] mb-4 text-white/80">
          Cyberattack Simulations
        </h3>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-sans font-normal leading-[1.1] text-balance max-w-3xl tracking-tight">
          Most advanced cyberattack simulations: <br className="hidden md:block" />
          HackFirst™
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
