import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Menu } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setProgressPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-white selection:text-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 mix-blend-difference">
        <div className="text-2xl font-bold tracking-tighter uppercase font-sans">
          HackFirst
        </div>
        <button className="p-2 hover:opacity-70 transition-opacity">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer / Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 text-[10px] font-mono uppercase tracking-widest mix-blend-difference text-white/70 bg-background/0 backdrop-blur-[2px]">
        <div className="flex items-center gap-2">
          <div className="w-12 tabular-nums">
            {progressPercent}%
          </div>
          {/* Progress Bar Visual */}
          <div className="w-20 h-[2px] bg-white/20 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-white"
              style={{ scaleX, transformOrigin: "0%" }} 
            />
          </div>
        </div>
        
        <div className="opacity-70">
          Design by .Cassari
        </div>
      </footer>
    </div>
  );
}
