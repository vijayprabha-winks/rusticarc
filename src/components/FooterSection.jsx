import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Building2, 
  TrendingUp, 
  Compass, 
  Star, 
  ArrowRight, 
  ArrowUp 
} from 'lucide-react';
import footerBg from '../assets/footer_bg.png';

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const footerRef = useRef(null);
  const headlineRef = useRef(null);
  const quoteRef = useRef(null);
  const statsRef = useRef(null);
  const bottomBarRef = useRef(null);

  // Smooth scroll to top of page
  const handleScrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Smooth scroll to contact section
  const handleScrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      const targetY = contactEl.getBoundingClientRect().top + window.scrollY - 30;
      if (window.__lenis) {
        window.__lenis.scrollTo(targetY, { duration: 1.2 });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    } else {
      window.open('https://wa.me/917825915899?text=Hello%20Rustic%20Arc!%20I%20would%20like%20to%20consult%20regarding%20an%20architectural%20project.', '_blank');
    }
  };

  // Smooth scroll to specific sections
  const handleNavClick = (sectionName) => {
    let targetId = 'home';
    if (sectionName === 'RESIDENTIAL' || sectionName === 'COMMERCIAL') targetId = 'projects';
    else if (sectionName === 'INTERIORS' || sectionName === 'CONSTRUCTION') targetId = 'services';
    else if (sectionName === 'CONTACT') targetId = 'contact';

    const el = document.getElementById(targetId);
    if (el) {
      const targetY = el.getBoundingClientRect().top + window.scrollY - 30;
      if (window.__lenis) {
        window.__lenis.scrollTo(targetY, { duration: 1.2 });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

  // GSAP ScrollTrigger Animations Engine
  useGSAP(() => {
    const sec = footerRef.current;
    if (!sec) return;

    // Refresh ScrollTrigger to calculate accurate layout offsets
    ScrollTrigger.refresh();

    // 1. Headline, Eyebrow & CTA Reveal
    // Triggered when the footer section enters 80% of viewport
    const headTl = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    headTl
      .fromTo(
        '.footer-eyebrow-line',
        { width: 0 },
        { width: 42, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo(
        '.footer-headline-word',
        { opacity: 0, y: 55, rotateX: 16 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        '.footer-subtitle, .footer-cta-btn',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
        '-=0.4'
      );

    // 2. Glass Statement Reveal
    if (quoteRef.current) {
      const lines = quoteRef.current.querySelectorAll('.quote-line');
      headTl.fromTo(
        lines,
        { opacity: 0, x: 25 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out'
        },
        '-=0.7'
      );
    }

    // 3. Stats Row Entrance (Triggers when stats row enters viewport)
    if (statsRef.current) {
      const statItems = statsRef.current.querySelectorAll('.footer-stat-col');
      const statIcons = statsRef.current.querySelectorAll('.footer-stat-icon');

      const statsTl = gsap.timeline({
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top bottom-=20px',
          toggleActions: 'play none none reverse'
        }
      });

      statsTl
        .fromTo(
          statItems,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out'
          }
        )
        .fromTo(
          statIcons,
          { scale: 0.3, opacity: 0, rotate: -25 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(2)'
          },
          '-=0.5'
        );
    }

    // 4. Bottom Navigation Bar Entrance
    if (bottomBarRef.current) {
      gsap.fromTo(
        bottomBarRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bottomBarRef.current,
            start: 'top bottom',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      id="footer-section"
      style={{
        position: 'relative',
        backgroundColor: '#06070a',
        color: '#ffffff',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif"
      }}
    >
      {/* ===================================================================
          HERO BANNER (Matches Reference Layout with Office Lounge Photo)
         =================================================================== */}
      <div
        style={{
          position: 'relative',
          minHeight: '620px',
          backgroundImage: `url(${footerBg})`,
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(60px, 8vw, 100px) clamp(16px, 3vw, 32px) clamp(40px, 5vw, 60px)'
        }}
      >
        {/* Layer 1: Left-to-Right Carbon Dark Fade Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, #06070a 0%, #06070a 44%, rgba(6, 7, 10, 0.9) 60%, rgba(6, 7, 10, 0.35) 100%)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* Layer 2: Subtle Ambient Vertical Shadow Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, #06070a 0%, transparent 20%, transparent 80%, #06070a 100%)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* Main Content Container */}
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
            position: 'relative',
            zIndex: 2
          }}
        >
          {/* Top Row: Left Headline & CTA | Center-Right Glass Statement */}
          <div className="footer-banner-grid">
            {/* Left Column: Eyebrow + STARTS HERE + Subtitle + Let's Talk Button */}
            <div
              ref={headlineRef}
              style={{
                gridColumn: 'span 7'
              }}
            >
              {/* Eyebrow */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  marginBottom: '18px'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    letterSpacing: '0.18em',
                    color: '#9ca3af',
                    textTransform: 'uppercase'
                  }}
                >
                  YOUR ARCHITECTURAL VISION
                </span>
                <span
                  className="footer-eyebrow-line"
                  style={{
                    display: 'inline-block',
                    width: '42px',
                    height: '2px',
                    backgroundColor: '#CAB796'
                  }}
                />
              </div>

              {/* Main Headline: STARTS HERE. */}
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 'clamp(3.2rem, 7.2vw, 6.2rem)',
                  fontWeight: 900,
                  lineHeight: 0.98,
                  letterSpacing: '-0.035em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  margin: '0 0 24px 0'
                }}
              >
                <span className="footer-headline-word" style={{ display: 'inline-block', marginRight: '14px' }}>
                  STARTS
                </span>
                <span
                  className="footer-headline-word"
                  style={{
                    display: 'inline-block',
                    color: '#CAB796',
                    textShadow: '0 0 40px rgba(202, 183, 150, 0.35)'
                  }}
                >
                  HERE.
                </span>
              </h2>

              {/* Subtitle */}
              <p
                className="footer-subtitle"
                style={{
                  fontSize: 'clamp(1.02rem, 1.4vw, 1.25rem)',
                  lineHeight: 1.65,
                  color: '#d1d5db',
                  maxWidth: '520px',
                  fontWeight: 500,
                  marginBottom: '36px'
                }}
              >
                Let's sculpt landmark spaces, bespoke luxury residences and iconic architecture — together.
              </p>

              {/* Let's Talk CTA Button */}
              <div className="footer-cta-btn">
                <button
                  type="button"
                  onClick={handleScrollToContact}
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#06070a',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: '1.02rem',
                    padding: '16px 36px',
                    borderRadius: '40px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 8px 30px rgba(255, 255, 255, 0.15)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(202, 183, 150, 0.35)';
                    e.currentTarget.style.backgroundColor = '#CAB796';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }}
                >
                  <span>Let's Talk</span>
                  <ArrowRight size={18} color="#06070a" />
                </button>
              </div>
            </div>

            {/* Center-Right Column: Stacked Editorial Statement on Glass */}
            <div
              ref={quoteRef}
              style={{
                gridColumn: 'span 5',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingLeft: '32px',
                paddingTop: '20px'
              }}
            >
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 'clamp(1.2rem, 1.9vw, 1.65rem)',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  lineHeight: 1.5,
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  textShadow: '0 2px 15px rgba(0, 0, 0, 0.8)'
                }}
              >
                <div className="quote-line">GREAT</div>
                <div className="quote-line">DESIGNS</div>
                <div className="quote-line">BRING</div>
                <div className="quote-line">SPACES</div>
                <div className="quote-line">TO LIFE.</div>
              </div>

              {/* Logo Brown Underline */}
              <div
                style={{
                  width: '42px',
                  height: '3px',
                  backgroundColor: '#CAB796',
                  marginTop: '16px',
                  borderRadius: '2px',
                  boxShadow: '0 0 15px rgba(202, 183, 150, 0.6)'
                }}
              />
            </div>
          </div>

          {/* =================================================================
              STATS ROW (4 Core Architectural Pillars)
             ================================================================= */}
          <div
            ref={statsRef}
            className="footer-stats-grid"
          >
            {/* Stat 1: 75+ */}
            <div
              className="footer-stat-col"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                borderRight: '1px solid rgba(255, 255, 255, 0.12)',
                paddingRight: '16px'
              }}
            >
              <div
                className="footer-stat-icon"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Building2 size={20} color="#CAB796" />
              </div>
              <div>
                <div style={{ fontSize: 'clamp(1.6rem, 2.3vw, 2.2rem)', fontWeight: 900, lineHeight: 1, color: '#ffffff' }}>
                  75+
                </div>
                <div style={{ fontSize: '0.84rem', color: '#9ca3af', fontWeight: 600, marginTop: '4px' }}>
                  Landmarks Completed
                </div>
              </div>
            </div>

            {/* Stat 2: 150K+ */}
            <div
              className="footer-stat-col"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                borderRight: '1px solid rgba(255, 255, 255, 0.12)',
                paddingRight: '16px'
              }}
            >
              <div
                className="footer-stat-icon"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <TrendingUp size={20} color="#CAB796" />
              </div>
              <div>
                <div style={{ fontSize: 'clamp(1.6rem, 2.3vw, 2.2rem)', fontWeight: 900, lineHeight: 1, color: '#ffffff' }}>
                  150K+
                </div>
                <div style={{ fontSize: '0.84rem', color: '#9ca3af', fontWeight: 600, marginTop: '4px' }}>
                  Sq.Ft Designed & Built
                </div>
              </div>
            </div>

            {/* Stat 3: 5+ Yrs */}
            <div
              className="footer-stat-col"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                borderRight: '1px solid rgba(255, 255, 255, 0.12)',
                paddingRight: '16px'
              }}
            >
              <div
                className="footer-stat-icon"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Compass size={20} color="#CAB796" />
              </div>
              <div>
                <div style={{ fontSize: 'clamp(1.6rem, 2.3vw, 2.2rem)', fontWeight: 900, lineHeight: 1, color: '#ffffff' }}>
                  5+ Yrs
                </div>
                <div style={{ fontSize: '0.84rem', color: '#9ca3af', fontWeight: 600, marginTop: '4px' }}>
                  Architectural Mastery
                </div>
              </div>
            </div>

            {/* Stat 4: 100% */}
            <div
              className="footer-stat-col"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <div
                className="footer-stat-icon"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Star size={20} color="#CAB796" />
              </div>
              <div>
                <div style={{ fontSize: 'clamp(1.6rem, 2.3vw, 2.2rem)', fontWeight: 900, lineHeight: 1, color: '#ffffff' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.84rem', color: '#9ca3af', fontWeight: 600, marginTop: '4px' }}>
                  Commitment to Quality
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          BOTTOM FOOTER STRIP (Logo, Navigation Pillars, Back to Top)
         =================================================================== */}
      <div
        ref={bottomBarRef}
        style={{
          backgroundColor: '#030406',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          padding: 'clamp(20px, 4vw, 28px) clamp(16px, 3vw, 32px)'
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          {/* Left: Rustic Arc Atelier Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #CAB796 0%, #8c7350 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(202, 183, 150, 0.3)'
              }}
            >
              <Compass size={20} color="#06070a" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Cinzel', 'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  letterSpacing: '0.12em',
                  color: '#ffffff',
                  textTransform: 'uppercase'
                }}
              >
                RUSTIC <span style={{ color: '#CAB796' }}>ARC</span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.66rem',
                  letterSpacing: '0.18em',
                  color: '#9ca3af',
                  textTransform: 'uppercase'
                }}
              >
                ATELIER FOR ARCHITECTURE & INTERIORS
              </div>
            </div>
          </div>

          {/* Center: Core Discipline Pillars with Line Accents */}
          <div className="footer-bottom-nav">
            <span style={{ width: '30px', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
            {['RESIDENTIAL', 'COMMERCIAL', 'INTERIORS', 'CONSTRUCTION', 'CONTACT'].map((item, idx, arr) => (
              <React.Fragment key={item}>
                <button
                  type="button"
                  onClick={() => handleNavClick(item)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#9ca3af',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    letterSpacing: 'inherit',
                    cursor: 'pointer',
                    padding: '4px 0',
                    transition: 'color 0.25s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#CAB796'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#9ca3af'; }}
                >
                  {item}
                </button>
                {idx < arr.length - 1 && <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>}
              </React.Fragment>
            ))}
            <span style={{ width: '30px', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          </div>

          {/* Right: Back to Top Button */}
          <button
            type="button"
            onClick={handleScrollToTop}
            title="Scroll back to top"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '6px 0'
            }}
            onMouseEnter={(e) => {
              const circle = e.currentTarget.querySelector('.top-arrow-circle');
              if (circle) {
                circle.style.borderColor = '#CAB796';
                circle.style.backgroundColor = '#CAB796';
                circle.style.transform = 'translateY(-3px)';
              }
              const icon = e.currentTarget.querySelector('.top-arrow-icon');
              if (icon) icon.style.color = '#06070a';
            }}
            onMouseLeave={(e) => {
              const circle = e.currentTarget.querySelector('.top-arrow-circle');
              if (circle) {
                circle.style.borderColor = 'rgba(255, 255, 255, 0.24)';
                circle.style.backgroundColor = 'transparent';
                circle.style.transform = 'translateY(0)';
              }
              const icon = e.currentTarget.querySelector('.top-arrow-icon');
              if (icon) icon.style.color = '#ffffff';
            }}
          >
            <div
              className="top-arrow-circle"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.24)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div className="top-arrow-icon" style={{ display: 'flex', color: '#ffffff', transition: 'color 0.25s ease' }}>
                <ArrowUp size={18} color="currentColor" />
              </div>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.16em',
                textTransform: 'uppercase'
              }}
            >
              BACK TO TOP
            </span>
          </button>
        </div>

        {/* Bottom Micro Copyright Bar */}
        <div
          style={{
            maxWidth: '1400px',
            margin: '20px auto 0',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.74rem',
            color: '#6b7280'
          }}
        >
          <div>
            © 2026 Rustic Arc Atelier. All rights reserved.
          </div>
          <div>
            Crafted for Visionary Architecture & Bespoke Living Spaces.
          </div>
        </div>
      </div>
    </footer>
  );
}
