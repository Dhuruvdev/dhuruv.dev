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
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-6 mix-blend-difference text-white">
        <div className="text-2xl font-bold tracking-tighter uppercase font-sans opacity-0 pointer-events-none">
          HackFirst
        </div>
        <button className="p-2 hover:opacity-70 transition-opacity">
          <Menu className="w-8 h-8 stroke-1" />
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer / Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 text-[11px] font-mono font-medium uppercase tracking-wider mix-blend-difference text-white bg-transparent">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-white animate-pulse" />
          <div className="tabular-nums tracking-widest">
            {progressPercent}%
          </div>
        </div>
        
        <div className="tracking-widest">
          Design by .Cassari
        </div>
      </footer>
    </div>
  );
}
