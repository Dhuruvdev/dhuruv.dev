import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import Lenis from "lenis";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { name: "ABOUT", href: "#about" },
  { name: "WORK", href: "#work" },
  { name: "CONTACT", href: "#contact" },
];

export function Layout({ children }: LayoutProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [progressPercent, setProgressPercent] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setProgressPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-white selection:text-black">
      {/* Header */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-start justify-between px-6 py-6 transition-all duration-500 ease-in-out",
          isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent mix-blend-difference"
        )}
      >
        <div className="text-xl font-bold tracking-tighter font-sans text-white">
          dhuruv.dev
        </div>
        
        {/* Nav Links - Top Right, Stacked on Mobile/Tablet to match screenshot, or list */}
        <nav className="flex flex-col items-end gap-2 text-right">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-xs md:text-sm font-mono uppercase tracking-widest text-white/80 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <Footer progressPercent={progressPercent} scaleX={scaleX} />
    </div>
  );
}

function Footer({ progressPercent, scaleX }: { progressPercent: number, scaleX: any }) {
  return (
    <footer className="relative bg-black text-white pt-20 pb-4 px-6 overflow-hidden border-t border-white/10">
      {/* Top Small Text */}
      <div className="w-full text-center mb-16">
         <p className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/50">
           DHURUV IS A PROUD MEMBER OF THE FEARSOFF ALLIANCE
         </p>
      </div>

      {/* Big Title */}
      <div className="w-full mb-20">
        <h1 className="text-[15vw] leading-[0.8] font-bold tracking-tighter uppercase text-center mix-blend-difference">
          DHURUV
        </h1>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 max-w-7xl mx-auto mb-24">
        
        {/* About Column */}
        <div className="md:col-span-6 space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-white/50">
            ABOUT
          </h3>
          <p className="text-xl md:text-2xl font-sans font-light leading-relaxed text-white/80 uppercase max-w-md">
            DHURUV: OUTSMARTING BUGS. SECURING TOMORROW. AT DHURUV, WE DON'T JUST CODE—WE CREATE.
          </p>
        </div>

        {/* Spacers */}
        <div className="hidden md:block md:col-span-2"></div>

        {/* Socials Column */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-white/50">
            SOCIALS
          </h3>
          <ul className="space-y-4">
            {['FACEBOOK', 'LINKEDIN', 'X'].map((social) => (
              <li key={social} className="flex items-center gap-3 group cursor-pointer">
                <span className="w-1.5 h-1.5 bg-white transition-colors group-hover:bg-white"></span>
                <span className="text-sm font-mono tracking-wider group-hover:text-white transition-colors">{social}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Column */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-white/50">
            NAVIGATION
          </h3>
          <ul className="space-y-4">
            {['HOME', 'SERVICES', 'ABOUT', 'CONTACT'].map((item) => (
              <li key={item} className="flex items-center gap-3 group cursor-pointer">
                <span className="w-1.5 h-1.5 bg-white transition-colors group-hover:bg-white"></span>
                <span className="text-sm font-mono tracking-wider group-hover:text-white transition-colors">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-12 tabular-nums text-xs font-mono text-white/50">
            {progressPercent}%
          </div>
           {/* Progress Bar Visual */}
           <div className="w-20 h-[2px] bg-white/10 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-white"
              style={{ scaleX, transformOrigin: "0%" }} 
            />
          </div>
        </div>
        
        <div className="text-[10px] font-mono uppercase tracking-widest text-white/30">
          DESIGN BY .CASSARI
        </div>
      </div>
    </footer>
  );
}
