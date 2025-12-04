import { useState, useEffect } from 'react';
import loaderGif from '@assets/From_KlickPin_CF_Quadri_Moderni_Dipinti_e_Maschere_Eleganti____1764843579231.gif';

interface VideoLoaderProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { name: "ABOUT", href: "#about" },
  { name: "WORK", href: "#work" },
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

export function VideoLoader({ children }: VideoLoaderProps) {
  const [introEnded, setIntroEnded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const endTimer = setTimeout(() => {
      handleIntroEnd();
    }, 6000);

    return () => {
      clearTimeout(endTimer);
    };
  }, []);

  const handleIntroEnd = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIntroEnded(true);
    }, 500);
  };

  const handleSkip = () => {
    handleIntroEnd();
  };

  if (introEnded) {
    return <>{children}</>;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black"
      style={{
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 500ms ease-out',
      }}
    >
      <IntroNavbar />

      <img
        src={loaderGif}
        alt="Loading"
        className="w-full h-full object-cover"
        onLoad={() => setImageLoaded(true)}
        data-testid="gif-loader"
      />


      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-[55] bg-black">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <p className="text-white/70 text-sm font-mono uppercase tracking-widest">Loading...</p>
          </div>
        </div>
      )}

      <div className="hidden">
        {children}
      </div>
    </div>
  );
}
