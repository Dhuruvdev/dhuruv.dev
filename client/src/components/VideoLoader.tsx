import { useState, useEffect } from 'react';
import loaderVideo from '@assets/222b6ccc1f0f8ac8cd8f6aa4003e9e4c_1768205629006.mp4';

interface VideoLoaderProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { name: "HOME", href: "#home" },
  { name: "PROJECT", href: "#project" },
  { name: "CONTACT", href: "#contact" },
];

function IntroNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[60] flex items-start justify-between px-6 py-6 bg-transparent">
      <div className="text-xl font-bold tracking-tighter font-sans text-white mix-blend-difference pointer-events-auto cursor-pointer">
        dhuruv.dev
      </div>
      
      <nav className="flex flex-col items-end gap-2 text-right pointer-events-auto">
        {NAV_LINKS.map((link) => (
          <span 
            key={link.name}
            className="text-xs md:text-sm font-mono uppercase tracking-widest text-white/80 mix-blend-difference cursor-default"
          >
            {link.name}
          </span>
        ))}
      </nav>
    </header>
  );
}

function LoaderOverlay({ onComplete }: { onComplete: () => void }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const endTimer = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 6000);

    return () => {
      clearTimeout(endTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black"
      style={{
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 500ms ease-out',
      }}
    >
      <IntroNavbar />

      <video
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
        onLoadedData={() => setVideoLoaded(true)}
        data-testid="video-loader"
      >
        <source src={loaderVideo} type="video/mp4" />
      </video>

      {!videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-[55] bg-black">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <p className="text-white/70 text-sm font-mono uppercase tracking-widest">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function VideoLoader({ children }: VideoLoaderProps) {
  const [showLoader, setShowLoader] = useState(true);

  const handleComplete = () => {
    setShowLoader(false);
  };

  if (showLoader) {
    return <LoaderOverlay onComplete={handleComplete} />;
  }

  return <>{children}</>;
}
