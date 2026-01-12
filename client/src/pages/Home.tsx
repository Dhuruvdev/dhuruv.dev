import React, { useRef } from "react";
import { Layout } from "@/components/Layout";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { SolutionSection } from "@/components/SolutionSection";
import { NewSection } from "@/components/NewSection";
import { SectionFive } from "@/components/SectionFive";
import { motion, useScroll, useTransform } from "framer-motion";
import spideyImage from "@assets/IMG_20251224_180917_704_1768208180081.webp";
import normalImageAsset from "@assets/IMG_20260110_232559_1768208210506.jpg";
import tornadoVideo from "@assets/ff910602e43e722ff30b731491bbbdf0_t4_1768137492567.mp4";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Layout>
      <div ref={containerRef} className="relative bg-black">
        <div id="home">
          <HeroSection />
        </div>
        <div id="project">
          <RizzySection />
          <ProjectShowcase />
          <SolutionSection />
          <NewSection />
          <SectionFive />
        </div>
      </div>
    </Layout>
  );
}

function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const perspective = useTransform(scrollYProgress, [0, 1], [1000, 1500]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch (error) {
        console.log('Video autoplay failed, retrying...', error);
        video.muted = true;
        video.play().catch(() => {});
      }
    };

    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener('canplay', playVideo, { once: true });
    }

    return () => {
      video.removeEventListener('canplay', playVideo);
    };
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-center relative overflow-hidden perspective-1000">
       {/* Full Screen Video Background */}
       <motion.div 
         style={{ 
           rotateX, 
           perspective,
           scale,
           y,
           opacity,
           transformOrigin: "center top"
         }}
         className="absolute inset-0 w-full h-full z-0"
       >
           <video 
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src={tornadoVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none"></div>
        </motion.div>
    </section>
  );
}

function RizzySection() {
  const [isGoofy, setIsGoofy] = React.useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const perspective = useTransform(scrollYProgress, [0, 0.5, 1], [1000, 1000, 1000]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const goofyImage = spideyImage; 
  const normalImage = normalImageAsset;

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden px-6 border-t border-white/5 perspective-1000">
      <motion.div 
        style={{ rotateX, perspective, scale, opacity }}
        className="w-full max-w-5xl flex flex-col items-center"
      >
        <div className="w-full flex justify-between items-start mb-12">
          <div className="space-y-0">
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-none text-pink-300 uppercase">
              I'M A
            </h2>
            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-none text-white uppercase">
              RIZZY GUY
            </h2>
          </div>
        </div>

        <div className="relative group cursor-pointer" onClick={() => setIsGoofy(!isGoofy)}>
          <motion.div
            animate={{
              borderRadius: isGoofy ? ["20% 80% 30% 70% / 60% 30% 70% 40%", "70% 30% 50% 50% / 30% 60% 40% 70%"] : "24px"
            }}
            transition={{
              duration: 2,
              repeat: isGoofy ? Infinity : 0,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="w-[80vw] md:w-[35vw] aspect-[3/4] overflow-hidden relative border border-white/10"
          >
            <motion.img
              key={isGoofy ? "goofy" : "normal"}
              initial={{ filter: "blur(20px) contrast(200%)", opacity: 0 }}
              animate={{ filter: "blur(0px) contrast(100%)", opacity: 1 }}
              src={isGoofy ? goofyImage : normalImage}
              className="w-full h-full object-cover grayscale brightness-75 group-hover:brightness-100 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
          </motion.div>
          
          <div className="flex justify-between mt-4 w-full text-white/30 font-mono text-[10px] uppercase tracking-widest italic">
            <span>CLICK ME</span>
            <span>-10000 RIZZ</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}


function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const perspective = useTransform(scrollYProgress, [0, 1], [1000, 1500]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch (error) {
        console.log('Video autoplay failed, retrying...', error);
        video.muted = true;
        video.play().catch(() => {});
      }
    };

    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener('canplay', playVideo, { once: true });
    }

    return () => {
      video.removeEventListener('canplay', playVideo);
    };
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-center relative overflow-hidden perspective-1000">
       {/* Full Screen Video Background */}
       <motion.div 
         style={{ 
           rotateX, 
           perspective,
           scale,
           y,
           opacity,
           transformOrigin: "center top"
         }}
         className="absolute inset-0 w-full h-full z-0"
       >
           <video 
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src={tornadoVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none"></div>
        </motion.div>
    </section>
  );
}

function RizzySection() {
  const [isGoofy, setIsGoofy] = React.useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const perspective = useTransform(scrollYProgress, [0, 0.5, 1], [1000, 1000, 1000]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const goofyImage = spideyImage; 
  const normalImage = normalImageAsset;

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden px-6 border-t border-white/5 perspective-1000">
      <motion.div 
        style={{ rotateX, perspective, scale, opacity }}
        className="w-full max-w-5xl flex flex-col items-center"
      >
        <div className="w-full flex justify-between items-start mb-12">
          <div className="space-y-0">
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-none text-pink-300 uppercase">
              I'M A
            </h2>
            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-none text-white uppercase">
              RIZZY GUY
            </h2>
          </div>
        </div>

        <div className="relative group cursor-pointer" onClick={() => setIsGoofy(!isGoofy)}>
          <motion.div
            animate={{
              borderRadius: isGoofy ? ["20% 80% 30% 70% / 60% 30% 70% 40%", "70% 30% 50% 50% / 30% 60% 40% 70%"] : "24px"
            }}
            transition={{
              duration: 2,
              repeat: isGoofy ? Infinity : 0,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="w-[80vw] md:w-[35vw] aspect-[3/4] overflow-hidden relative border border-white/10"
          >
            <motion.img
              key={isGoofy ? "goofy" : "normal"}
              initial={{ filter: "blur(20px) contrast(200%)", opacity: 0 }}
              animate={{ filter: "blur(0px) contrast(100%)", opacity: 1 }}
              src={isGoofy ? goofyImage : normalImage}
              className="w-full h-full object-cover grayscale brightness-75 group-hover:brightness-100 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
          </motion.div>
          
          <div className="flex justify-between mt-4 w-full text-white/30 font-mono text-[10px] uppercase tracking-widest italic">
            <span>CLICK ME</span>
            <span>-10000 RIZZ</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
