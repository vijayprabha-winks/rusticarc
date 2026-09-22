import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import RusticArcLoader from './components/RusticArcLoader';
import CinematicHeroSection from './components/CinematicHeroSection';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
import FloatingActions from './components/FloatingActions';
import BuildingEstimatorPage from './components/BuildingEstimatorPage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [loaderKey, setLoaderKey] = useState(0);
  const [isGlowActive] = useState(true);
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash.includes('estimate') ? 'estimation' : 'home';
  });

  const lenisRef = useRef(null);

  // Sync currentView with hash changes (browser back/forward button support)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.includes('estimate')) {
        setCurrentView('estimation');
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Initialize Lenis smooth scroll and synchronize with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };

    // Prioritize Lenis RAF so scroll position updates before GSAP evaluates
    gsap.ticker.add(tickerCb, false, true);
    gsap.ticker.lagSmoothing(0);

    const onWindowLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', onWindowLoad);

    return () => {
      window.removeEventListener('load', onWindowLoad);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, []);

  // Handle scroll reset and refresh when changing views
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [currentView]);

  // Lock scroll during intro loader
  useEffect(() => {
    if (showLoader) {
      if (lenisRef.current) lenisRef.current.stop();
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
      if (lenisRef.current) {
        lenisRef.current.start();
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 600);
    }
  }, [showLoader]);

  const handleReplayLoader = () => {
    setShowLoader(true);
    setLoaderKey((k) => k + 1);
  };

  const handleOpenEstimator = () => {
    window.location.hash = 'estimate';
    setCurrentView('estimation');
  };

  const handleBackToHome = () => {
    if (window.location.hash.includes('estimate')) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    setCurrentView('home');
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#06070a',
        color: '#f5f7fa',
        overflowX: 'hidden'
      }}
    >
      {/* 5-Second Cinematic Brand Intro Loader (#FFFFFF Background) */}
      {showLoader && (
        <RusticArcLoader
          key={loaderKey}
          onComplete={() => {
            setShowLoader(false);
          }}
        />
      )}

      {/* Background Matrix Ambient Glow */}
      {isGlowActive && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: 0,
            background:
              'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 240, 255, 0.15), transparent 70%), radial-gradient(ellipse 60% 40% at 90% 80%, rgba(112, 0, 255, 0.12), transparent 70%)',
            transition: 'opacity 0.6s ease'
          }}
        />
      )}

      {/* View Routing */}
      {currentView === 'estimation' ? (
        /* Standalone Building Estimation Calculator Page (NO NAVBAR / HEADER - BACK BUTTON ONLY) */
        <BuildingEstimatorPage onBack={handleBackToHome} />
      ) : (
        /* Main Landing Page */
        <>
          {/* Main Navigation Bar */}
          <Navbar onReplayLoader={handleReplayLoader} />

          {/* Main Content */}
          <main>
            {/* Cinematic Video Hero */}
            <CinematicHeroSection isLoaderActive={showLoader} />

            {/* Dedicated About Section (Founder Showcase & The Group) */}
            <AboutSection />

            {/* Dedicated White Service Section (Architecture, Interior, 3D Design, Construction) */}
            <ServicesSection />

            {/* Dedicated 4. PROJECTS Section (Residential & Commercial with Horizontal Photo Gallery) */}
            <ProjectsSection />

            {/* Dedicated 5. CONTACT Section (Dual-card layout & direct WhatsApp integration to 7825915899) */}
            <ContactSection />

            {/* 6. Cinematic Architectural FOOTER Section */}
            <FooterSection />
          </main>

          {/* Floating Actions: Authentic WhatsApp & Building Estimation Calculator */}
          <FloatingActions onOpenEstimator={handleOpenEstimator} />
        </>
      )}
    </div>
  );
}

