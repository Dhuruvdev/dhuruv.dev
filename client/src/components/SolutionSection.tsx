import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import solutionVideo from "@assets/solution-03_(2)_1764779271496.mp4";

gsap.registerPlugin(ScrollTrigger);

export function SolutionSection() {
  const container = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top center",
        end: "center center",
        scrub: 1,
      },
    });

    // Video opacity transition
    tl.fromTo(
      videoRef.current,
      { opacity: 0 },
      { opacity: 0.6, duration: 1 }
    );

    // Text reveal animation
    tl.fromTo(
      [labelRef.current, headingRef.current],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1 },
      "<"
    );

    // Parallax effect for the video
    gsap.to(videoRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-screen w-full overflow-hidden bg-black text-white flex items-center justify-center py-20">
      {/* Video Background - Full Cover */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          src={solutionVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Red tint overlay to match screenshot */}
        <div className="absolute inset-0 bg-red-900/30 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />
      </div>

      {/* Content - Centered */}
      <div ref={textRef} className="relative z-10 container mx-auto px-4 text-center">
        <p 
          ref={labelRef}
          className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-gray-400 mb-6"
        >
          The Solution
        </p>
        <h2 
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-sans font-medium leading-tight tracking-tight max-w-5xl mx-auto text-balance"
        >
          Security audits give you peace of mind
        </h2>
      </div>
    </section>
  );
}
