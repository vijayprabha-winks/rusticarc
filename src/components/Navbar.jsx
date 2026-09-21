import React, { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, MessageSquare, ArrowRight } from 'lucide-react';

export default function Navbar({ onReplayLoader }) {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isHeroSection, setIsHeroSection] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', num: '01' },
    { id: 'about', label: 'About', num: '02' },
    { id: 'services', label: 'Services', num: '03' },
    { id: 'projects', label: 'Projects', num: '04' },
    { id: 'contact', label: 'Contact', num: '05' }
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Track active section and hero section boundary reliably during GSAP pinned scrolling
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      const heroST = ScrollTrigger.getById ? ScrollTrigger.getById('hero-trigger') : null;
      const heroStart = heroST ? heroST.start : 0;
      const heroEnd = heroST && typeof heroST.end === 'number' ? heroST.end : 1700;

      const aboutEl = document.getElementById('about');
      const servicesEl = document.getElementById('services');
      const heroEl = document.getElementById('cinematic-hero-section') || document.getElementById('home');

      // Determine if navbar is currently over the cinematic hero section or outside of it
      let outsideHero = false;
      if (aboutEl) {
        const aRect = aboutEl.getBoundingClientRect();
        outsideHero = aRect.top <= 75;
      } else if (servicesEl) {
        const sRect = servicesEl.getBoundingClientRect();
        outsideHero = sRect.top <= 75;
      } else if (heroEl) {
        const hRect = heroEl.getBoundingClientRect();
        outsideHero = hRect.bottom <= 75;
      } else {
        outsideHero = y >= (heroEnd + 200);
      }

      setIsHeroSection(!outsideHero);

      const totalHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // 1. Bottom of page -> Contact
      if (y + windowHeight >= totalHeight - 150) {
        setActiveSection('contact');
        return;
      }

      // If we are outside the cinematic hero section:
      if (outsideHero) {
        const contactEl = document.getElementById('contact');
        if (contactEl) {
          const cRect = contactEl.getBoundingClientRect();
          if (cRect.top <= windowHeight * 0.45) {
            setActiveSection('contact');
            return;
          }
        }
        const projectsEl = document.getElementById('projects');
        if (projectsEl) {
          const pRect = projectsEl.getBoundingClientRect();
          if (pRect.top <= windowHeight * 0.45) {
            setActiveSection('projects');
            return;
          }
        }
        if (servicesEl) {
          const sRect = servicesEl.getBoundingClientRect();
          if (sRect.top <= windowHeight * 0.45) {
            setActiveSection('services');
            return;
          }
        }
        setActiveSection('about');
        return;
      }

      // Inside the cinematic hero section:
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    ScrollTrigger.addEventListener?.('refresh', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      ScrollTrigger.removeEventListener?.('refresh', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const heroST = ScrollTrigger.getById ? ScrollTrigger.getById('hero-trigger') : null;
    const heroStart = heroST ? heroST.start : 0;
    const heroEnd = heroST && typeof heroST.end === 'number' ? heroST.end : 1700;

    if (sectionId === 'about') {
      const aboutEl = document.getElementById('about');
      if (aboutEl) {
        const targetY = aboutEl.getBoundingClientRect().top + window.scrollY - 30;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
        return;
      }
      const targetY = heroStart + 850;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'services') {
      const servEl = document.getElementById('services');
      if (servEl) {
        const targetY = servEl.getBoundingClientRect().top + window.scrollY - 30;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
        return;
      }
      window.scrollTo({ top: heroEnd + 20, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'projects') {
      const projEl = document.getElementById('projects');
      if (projEl) {
        const targetY = projEl.getBoundingClientRect().top + window.scrollY - 30;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
        return;
      }
      window.scrollTo({ top: heroEnd + 1200, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'contact') {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        const targetY = contactEl.getBoundingClientRect().top + window.scrollY - 30;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
        return;
      }
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      return;
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: isHeroSection ? 'transparent' : 'rgba(255, 255, 255, 0.88)',
          backdropFilter: isHeroSection ? 'none' : 'blur(16px)',
          WebkitBackdropFilter: isHeroSection ? 'none' : 'blur(16px)',
          boxShadow: isHeroSection ? 'none' : '0 4px 24px rgba(0, 0, 0, 0.05)',
          borderBottom: isHeroSection ? '1px solid transparent' : '1px solid rgba(0, 0, 0, 0.06)',
          padding: isHeroSection
            ? 'clamp(14px, 2.5vw, 24px) max(18px, calc((100vw - 1400px) / 2))'
            : 'clamp(12px, 2vw, 16px) max(18px, calc((100vw - 1400px) / 2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: isHeroSection ? 'none' : 'auto',
          transition: 'background-color 0.35s ease, padding 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease'
        }}
      >
        {/* Starting left side: rustic Arc brand title */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          style={{
            pointerEvents: 'auto',
            color: isHeroSection ? '#FFFFFF' : '#111215',
            textDecoration: 'none',
            fontFamily: "'Cinzel', 'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textShadow: isHeroSection
              ? '0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 14px rgba(0, 0, 0, 0.85)'
              : 'none',
            cursor: 'pointer',
            display: 'inline-block',
            transition: 'color 0.35s ease, text-shadow 0.35s ease, opacity 0.2s ease'
          }}
        >
          rustic Arc
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="desktop-only"
          style={{
            pointerEvents: 'auto',
            alignItems: 'center',
            gap: 'clamp(16px, 2.5vw, 36px)'
          }}
        >
          {navItems.map((item) => {
            const isCurrent = activeSection === item.id;
            const isHovered = hoveredSection === item.id;

            let itemColor;
            if (isHeroSection) {
              itemColor = isHovered ? '#9cdd2e' : '#FFFFFF';
            } else {
              itemColor = isCurrent ? '#111215' : (isHovered ? '#8ac926' : '#374151');
            }

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredSection(item.id)}
                onMouseLeave={() => setHoveredSection(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '6px 2px 10px',
                  color: itemColor,
                  fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
                  fontSize: 'clamp(0.92rem, 1.3vw, 1.05rem)',
                  fontWeight: isCurrent ? 700 : 500,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  position: 'relative',
                  textShadow: isHeroSection
                    ? '0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 14px rgba(0, 0, 0, 0.85)'
                    : 'none',
                  transition: 'color 0.25s ease, text-shadow 0.25s ease',
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <span>{item.label}</span>

                {/* Lime accent underline for current section */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2.5px',
                    backgroundColor: isHeroSection ? '#9cdd2e' : '#8ac926',
                    boxShadow: isCurrent
                      ? (isHeroSection
                          ? '0 0 12px #9cdd2e, 0 0 24px rgba(156, 221, 46, 0.6)'
                          : '0 2px 8px rgba(138, 201, 38, 0.4)')
                      : 'none',
                    borderRadius: '2px',
                    transform: isCurrent ? 'scaleX(1)' : isHovered ? 'scaleX(0.5)' : 'scaleX(0)',
                    opacity: isCurrent ? 1 : isHovered ? 0.6 : 0,
                    transformOrigin: 'center',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease'
                  }}
                />
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <div className="mobile-only" style={{ pointerEvents: 'auto' }}>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            style={{
              background: isHeroSection
                ? 'rgba(6, 7, 10, 0.6)'
                : 'rgba(240, 242, 246, 0.9)',
              border: isHeroSection
                ? '1px solid rgba(255, 255, 255, 0.2)'
                : '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              padding: '8px 10px',
              color: isHeroSection ? '#FFFFFF' : '#111215',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              transition: 'all 0.25s ease'
            }}
          >
            {isMobileMenuOpen ? (
              <X size={22} color={isHeroSection ? '#9cdd2e' : '#8ac926'} />
            ) : (
              <Menu size={22} color={isHeroSection ? '#FFFFFF' : '#111215'} />
            )}
          </button>
        </div>
      </header>

      {/* Luxury Mobile Navigation Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            backgroundColor: 'rgba(6, 7, 10, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '90px 24px 36px',
            animation: 'fadeInMenu 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Top Subtle Brand Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <span style={{ width: '28px', height: '2px', backgroundColor: '#9cdd2e' }} />
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.74rem',
                letterSpacing: '0.18em',
                color: '#9cdd2e',
                textTransform: 'uppercase',
                fontWeight: 700
              }}
            >
              NAVIGATION DIRECTORY
            </span>
          </div>

          {/* Links List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {navItems.map((item) => {
              const isCurrent = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    padding: '10px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: isCurrent ? '#9cdd2e' : '#6b7280'
                      }}
                    >
                      {item.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '1.85rem',
                        fontWeight: 800,
                        color: isCurrent ? '#9cdd2e' : '#FFFFFF',
                        letterSpacing: '-0.02em',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      {item.label}
                    </span>
                  </div>

                  {isCurrent && (
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#9cdd2e',
                        boxShadow: '0 0 12px #9cdd2e'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Direct Action & WhatsApp Contact */}
          <div style={{ marginTop: 'auto', paddingTop: '28px' }}>
            <a
              href="https://wa.me/917825915899?text=Hello%20Rustic%20Arc!%20I%20would%20like%20to%20consult%20regarding%20an%20architectural%20project."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                backgroundColor: '#9cdd2e',
                color: '#06070a',
                padding: '14px 20px',
                borderRadius: '14px',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: '0.96rem',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                boxShadow: '0 8px 25px rgba(156, 221, 46, 0.35)'
              }}
            >
              <MessageSquare size={18} />
              <span>Direct WhatsApp Inquiry</span>
              <ArrowRight size={16} />
            </a>

            <div
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.72rem',
                color: '#6b7280',
                letterSpacing: '0.12em',
                marginTop: '14px'
              }}
            >
              +91 96008 15917 • CHENNAI & HYDERABAD
            </div>
          </div>
        </div>
      )}
    </>
  );
}

