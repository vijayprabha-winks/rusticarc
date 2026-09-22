import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X, ArrowRight, Compass, Building2, HardHat, Box } from 'lucide-react';
import barathanImg from '../assets/Barathan.jpeg';
import heroVideo from '../assets/Cinematic_Hero_Video_Prompt_.mp4';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const photoRef = useRef(null);
  const rightQuoteRef = useRef(null);
  const bottomGroupRef = useRef(null);
  const cardsGridRef = useRef(null);
  const modalRef = useRef(null);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  // 4 Multi-Position Cards representing Barathan's roles: Architect, Civil Engineer, Site Supervisor, 3D & BIM Specialist
  const ventureCards = [
    {
      id: 'architect',
      isWhite: false,
      tag: 'DESIGN & CONCEPT',
      title: 'ARCHITECT',
      logoText: 'BARATHAN',
      logoSub: 'ARCHITECT',
      iconType: 'architect',
      descList: ['Master Site Planning', 'Cantilever Façades', 'Concept Zoning', 'Biophilic Living'],
      themeColor: '#CAB796'
    },
    {
      id: 'engineer',
      isWhite: false,
      tag: 'STRUCTURAL INTEGRITY',
      title: 'CIVIL ENGINEER',
      logoText: 'BARATHAN',
      logoSub: 'CIVIL ENGINEER',
      iconType: 'engineer',
      descList: ['Reinforced Concrete (RCC)', 'Seismic Foundation Design', 'Load-Bearing Analysis', 'Structural Safety'],
      themeColor: '#00f0ff'
    },
    {
      id: 'supervisor',
      isWhite: false, // Unified dark card matching the sleek aesthetic
      tag: 'ON-SITE QUALITY',
      title: 'SITE SUPERVISOR',
      logoText: 'BARATHAN',
      logoSub: 'SITE SUPERVISOR',
      iconType: 'supervisor',
      descList: ['Daily On-Site Inspection', 'Artisan Quality Control', 'Zero-Defect Tolerances', 'Safety & Material Audit'],
      themeColor: '#ffb800'
    },
    {
      id: 'bim',
      isWhite: false,
      tag: 'DIGITAL TWIN & BIM',
      title: '3D & BIM MODELER',
      logoText: 'BARATHAN',
      logoSub: '3D & BIM MODELER',
      iconType: 'bim',
      descList: ['Photorealistic 3D Renders', 'Interactive BIM Walkthroughs', 'Elevation Matrices', '0.02mm Digital Precision'],
      themeColor: '#c084fc'
    }
  ];

  // GSAP Animations Engine
  useGSAP(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    // 1. Top Section - Left Headline & Content Stagger
    gsap.fromTo(
      '.about-tag-badge',
      { opacity: 0, x: -25 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      '.about-founder-name-line',
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.14,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      '.about-role-sub',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.25,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      '.about-desc-para',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.38,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      '.about-watch-btn',
      { scale: 0.7, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        delay: 0.5,
        ease: 'back.out(1.8)',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // 2. Center Column - Founder Portrait Parallax & Reveal
    gsap.fromTo(
      photoRef.current,
      { opacity: 0, scale: 0.95, y: 35 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: photoRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Gentle scroll parallax for the portrait photo
    gsap.to('.about-parallax-img', {
      yPercent: -6,
      ease: 'none',
      scrollTrigger: {
        trigger: photoRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });

    // "Ideas Create Impact" script note floating & draw
    gsap.fromTo(
      '.ideas-script-note',
      { opacity: 0, scale: 0.6, rotate: -14 },
      {
        opacity: 1,
        scale: 1,
        rotate: -6,
        duration: 1.0,
        delay: 0.35,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: photoRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Continuous subtle breathing on the script note
    gsap.to('.ideas-script-note', {
      y: '+=5',
      duration: 2.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // 3. Right Column - Quote, Signature & Vertical Stats
    gsap.fromTo(
      '.about-quote-mark',
      { scale: 0, rotate: -25 },
      {
        scale: 1,
        rotate: 0,
        duration: 0.8,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: rightQuoteRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      '.about-quote-body',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightQuoteRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      '.about-signature-block',
      { opacity: 0, scale: 0.9, x: -15 },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 0.85,
        delay: 0.35,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rightQuoteRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      '.about-vertical-line',
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top center',
        duration: 0.9,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightQuoteRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      '.about-pillar-word',
      { opacity: 0, x: 15 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rightQuoteRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Number counters that re-run on scroll back into view
    const counterEls = gsap.utils.toArray('.about-stat-counter');
    counterEls.forEach((el) => {
      const target = parseFloat(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
          onLeaveBack: () => {
            obj.val = 0;
            el.textContent = `0${suffix}`;
          }
        },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.val)}${suffix}`;
        }
      });
    });

    // 4. Bottom Zone - Multi-Industries ("ONE FOUNDER. MULTIPLE INDUSTRIES.")
    gsap.fromTo(
      '.about-group-word',
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.05,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: bottomGroupRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      '.about-group-sub',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        delay: 0.25,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bottomGroupRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // 4 Venture Cards Stagger
    const cards = gsap.utils.toArray('.about-venture-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 55, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsGridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

  }, { scope: sectionRef });

  // Modal Animation on open
  useEffect(() => {
    if (isVideoModalOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power3.out' }
      );
    }
  }, [isVideoModalOpen]);

  return (
    <section
      id="about"
      data-section="about"
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        color: '#111215',
        overflow: 'hidden',
        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif"
      }}
    >
      {/* ===================================================================
          ZONE 1: FOUNDER SHOWCASE (Top Area with Portrait, Quote & Stats)
         =================================================================== */}
      <div
        style={{
          position: 'relative',
          padding: 'clamp(60px, 8vw, 110px) clamp(16px, 3vw, 24px) clamp(40px, 6vw, 70px)',
          maxWidth: '1440px',
          margin: '0 auto'
        }}
      >
        <div className="about-founder-grid">
          {/* -------------------------------------------------------------
              LEFT COLUMN: THE FOUNDER • NAME • TITLES • STORY CTA
             ------------------------------------------------------------- */}
          <div ref={headlineRef}>
            {/* Top Micro-Tag */}
            <div
              className="about-tag-badge"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '18px'
              }}
            >
              <span
                style={{
                  width: '32px',
                  height: '2.5px',
                  backgroundColor: '#CAB796'
                }}
              />
              <span
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#717682',
                  fontFamily: 'var(--font-mono, monospace)'
                }}
              >
                THE FOUNDER
              </span>
            </div>

            {/* Display Headline Name: Barathan */}
            <h2
              style={{
                fontFamily: "'Playfair Display', 'Cinzel', Georgia, serif",
                fontSize: 'clamp(3.2rem, 5.2vw, 5.2rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: '16px'
              }}
            >
              <div style={{ overflow: 'hidden', paddingBottom: '6px' }}>
                <span className="about-founder-name-line" style={{ display: 'block', color: '#111215' }}>
                  Barathan
                </span>
              </div>
            </h2>

            {/* Sub-Roles Line */}
            <div
              className="about-role-sub"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 'clamp(1.05rem, 1.45vw, 1.25rem)',
                fontWeight: 700,
                color: '#111215',
                marginBottom: '20px',
                letterSpacing: '-0.01em'
              }}
            >
              Architectural Designer. Founder. Civil Engineer.
            </div>

            {/* Narrative Paragraph */}
            <div
              className="about-desc-para"
              style={{
                color: '#555a66',
                fontSize: '1rem',
                lineHeight: 1.65,
                fontWeight: 450,
                maxWidth: '420px',
                marginBottom: '36px'
              }}
            >
              <p style={{ marginBottom: '8px' }}>
                A bigger vision. A bolder tomorrow.
              </p>
              <p>
                Sculpting signature estates at the intersection of architectural daring, structural engineering, and timeless craftsmanship.
              </p>
            </div>

            {/* "Watch My Story" Circular Play CTA */}
            <div
              className="about-watch-btn"
              onClick={() => setIsVideoModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '16px',
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '2px solid #CAB796',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 20px rgba(202, 183, 150, 0.25)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.backgroundColor = '#CAB796';
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) icon.style.fill = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) icon.style.fill = '#111215';
                }}
              >
                <Play size={20} color="#111215" style={{ fill: '#111215', marginLeft: '3px', transition: 'fill 0.2s ease' }} />
              </div>

              <div>
                <div style={{ fontWeight: 800, fontSize: '0.96rem', color: '#111215', lineHeight: 1.2 }}>
                  Watch
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.96rem', color: '#111215', lineHeight: 1.2 }}>
                  My Story
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------
              CENTER COLUMN: FOUNDER PORTRAIT & SCRIPT ANNOTATION
             ------------------------------------------------------------- */}
          <div
            ref={photoRef}
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* Soft Ambient Radial Warmth Glow behind person */}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '24px',
                background: 'radial-gradient(circle at 50% 40%, rgba(202, 183, 150, 0.12), transparent 70%)',
                pointerEvents: 'none'
              }}
            />

            {/* Handwritten "Ideas Create Impact" Note with curved arrow/underline */}
            <div
              className="ideas-script-note"
              style={{
                position: 'absolute',
                top: '-8px',
                right: '12px',
                zIndex: 3,
                pointerEvents: 'none'
              }}
            >
              <div
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: 'clamp(1.8rem, 2.4vw, 2.3rem)',
                  fontWeight: 700,
                  color: '#CAB796',
                  lineHeight: 1.05,
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  letterSpacing: '0.02em',
                  transform: 'rotate(-6deg)'
                }}
              >
                Ideas
                <br />
                Create
                <br />
                Impact
              </div>
              <svg width="70" height="24" viewBox="0 0 70 24" fill="none" style={{ marginTop: '-4px', transform: 'rotate(-4deg)' }}>
                <path
                  d="M4 14C22 6 48 8 66 18M54 22C59 20 66 18 66 18M66 18C64 12 62 7 60 4"
                  stroke="#CAB796"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Portrait Frame with Soft Left Gradient Mask */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 'min(430px, 90vw)',
                height: 'clamp(360px, 55vw, 520px)',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.22), 0 10px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
            >
              <img
                className="about-parallax-img"
                src={barathanImg}
                alt="Barathan - Founder & Visionary"
                style={{
                  width: '100%',
                  height: '112%',
                  objectFit: 'cover',
                  objectPosition: 'center 18%',
                  display: 'block',
                  willChange: 'transform'
                }}
              />

              {/* Edge Gradient Blend (matches reference blending) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, rgba(255, 255, 255, 0.35) 0%, transparent 18%, transparent 85%, rgba(10, 13, 20, 0.15) 100%)',
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>

          {/* -------------------------------------------------------------
              RIGHT COLUMN: QUOTE BLOCK • SIGNATURE • VERTICAL PILLARS & STATS
             ------------------------------------------------------------- */}
          <div
            ref={rightQuoteRef}
            className="about-quote-stats-wrap"
          >
            {/* Quote Block & Signature */}
            <div style={{ flex: 1 }}>
              {/* Giant Neon Quote Symbol */}
              <div
                className="about-quote-mark"
                style={{
                  fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
                  fontSize: '3.6rem',
                  fontWeight: 900,
                  color: '#CAB796',
                  lineHeight: 0.8,
                  marginBottom: '14px'
                }}
              >
                “
              </div>

              {/* Quote Body in Editorial Italic */}
              <blockquote
                className="about-quote-body"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.18rem, 1.6vw, 1.4rem)',
                  lineHeight: 1.45,
                  fontWeight: 600,
                  color: '#111215',
                  marginBottom: '26px'
                }}
              >
                Don't just build a brand people see. Build a brand people remember — and a business that grows.
              </blockquote>

              {/* Founder Cursive Signature matching reference */}
              <div
                className="about-signature-block"
                style={{
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(202, 183, 150, 0.35)'
                }}
              >
                <div
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    color: '#111215',
                    lineHeight: 1.1,
                    transform: 'rotate(-4deg)',
                    display: 'inline-block',
                    marginBottom: '4px'
                  }}
                >
                  Barathan
                </div>
                <div
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#717682',
                    fontFamily: 'var(--font-mono, monospace)'
                  }}
                >
                  FOUNDER
                </div>
              </div>
            </div>

            {/* Rightmost Vertical Pillar Keywords & Numeric Stats (Exact match to reference) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                paddingLeft: '12px'
              }}
            >
              {/* Stacked Vertical Keywords */}
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  lineHeight: 1.85,
                  color: '#717682',
                  textTransform: 'uppercase',
                  marginBottom: '18px'
                }}
              >
                {['PEOPLE', 'IDEAS', 'STRATEGY', 'EXECUTION', 'GROWTH'].map((word, idx) => (
                  <div key={idx} className="about-pillar-word">
                    {word}
                  </div>
                ))}
              </div>

              {/* Vertical Neon Line */}
              <div
                className="about-vertical-line"
                style={{
                  width: '2px',
                  height: '38px',
                  backgroundColor: '#CAB796',
                  marginBottom: '20px'
                }}
              />

              {/* Metrics */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Stat 1: 4+ Businesses */}
                <div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '1.65rem',
                      fontWeight: 900,
                      color: '#111215',
                      lineHeight: 1
                    }}
                  >
                    <span className="about-stat-counter" data-target="4" data-suffix="+">
                      4+
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      color: '#717682',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-mono, monospace)',
                      marginTop: '2px'
                    }}
                  >
                    POSITIONS
                  </div>
                </div>

                {/* Stat 2: 10+ Years Experience */}
                <div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '1.65rem',
                      fontWeight: 900,
                      color: '#111215',
                      lineHeight: 1
                    }}
                  >
                    <span className="about-stat-counter" data-target="10" data-suffix="+">
                      5+
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      color: '#717682',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-mono, monospace)',
                      marginTop: '2px'
                    }}
                  >
                    YEARS EXPERIENCE
                  </div>
                </div>

                {/* Stat 3: Infinity Bigger Tomorrows */}
                <div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '1.9rem',
                      fontWeight: 900,
                      color: '#111215',
                      lineHeight: 1
                    }}
                  >
                    ∞
                  </div>
                  <div
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      color: '#717682',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-mono, monospace)',
                      marginTop: '2px'
                    }}
                  >
                    BIGGER TOMORROWS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          ZONE 2: THE GROUP • MULTI-INDUSTRIES CAROUSEL / GRID (Dark Background)
         =================================================================== */}
      <div
        style={{
          backgroundColor: '#06080e',
          color: '#FFFFFF',
          padding: 'clamp(50px, 7vw, 80px) clamp(16px, 3vw, 24px) clamp(60px, 8vw, 90px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="about-group-grid">
          {/* Left Header for One Man Multiple Positions */}
          <div ref={bottomGroupRef}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}
            >
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#8b93a4',
                  fontFamily: 'var(--font-mono, monospace)'
                }}
              >
                ONE VISION • MULTIPLE ROLES
              </span>
              <span
                style={{
                  width: '32px',
                  height: '2px',
                  backgroundColor: '#CAB796'
                }}
              />
            </div>

            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 'clamp(2.2rem, 3.4vw, 3rem)',
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                marginBottom: '18px'
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <span className="about-group-word" style={{ display: 'block', color: '#FFFFFF' }}>
                  ONE MAN.
                </span>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <span
                  className="about-group-word"
                  style={{
                    display: 'block',
                    color: '#CAB796'
                  }}
                >
                  MULTIPLE POSITIONS.
                </span>
              </div>
            </h3>

            <p
              className="about-group-sub"
              style={{
                color: '#9aa4b8',
                fontSize: '1rem',
                lineHeight: 1.6,
                maxWidth: '340px'
              }}
            >
              Direct, hands-on mastery across every phase — architect, civil engineer, site supervisor, and 3D BIM modeler.
            </p>
          </div>

          {/* Right 4 Positions Cards Grid */}
          <div
            ref={cardsGridRef}
            className="about-venture-cards-grid"
          >
            {ventureCards.map((card) => {
              const isHovered = hoveredCard === card.id;

              return (
                <div
                  key={card.id}
                  className="about-venture-card"
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    backgroundColor: '#0e111a',
                    color: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '24px 20px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '260px',
                    border: isHovered
                      ? `1px solid ${card.themeColor}`
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: isHovered
                      ? `0 12px 32px rgba(0, 0, 0, 0.5), 0 0 20px ${card.themeColor}33`
                      : '0 4px 16px rgba(0, 0, 0, 0.25)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                    cursor: 'pointer'
                  }}
                >
                  {/* Top Logo / Emblem Area */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '62px',
                        marginBottom: '18px',
                        textAlign: 'center'
                      }}
                    >
                      {card.iconType === 'architect' && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <Compass size={20} color="#CAB796" />
                            <span style={{ fontWeight: 900, fontSize: '0.96rem', letterSpacing: '0.08em', color: '#FFFFFF', fontFamily: "'Outfit', sans-serif" }}>
                              BARATHAN
                            </span>
                          </div>
                          <span style={{ fontSize: '0.66rem', fontWeight: 800, color: '#CAB796', letterSpacing: '0.16em', fontFamily: 'var(--font-mono, monospace)' }}>
                            ARCHITECT
                          </span>
                        </div>
                      )}

                      {card.iconType === 'engineer' && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <Building2 size={20} color="#00f0ff" />
                            <span style={{ fontWeight: 900, fontSize: '0.96rem', letterSpacing: '0.08em', color: '#FFFFFF', fontFamily: "'Outfit', sans-serif" }}>
                              BARATHAN
                            </span>
                          </div>
                          <span style={{ fontSize: '0.66rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.16em', fontFamily: 'var(--font-mono, monospace)' }}>
                            CIVIL ENGINEER
                          </span>
                        </div>
                      )}

                      {card.iconType === 'supervisor' && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <HardHat size={20} color="#ffb800" />
                            <span style={{ fontWeight: 900, fontSize: '0.96rem', letterSpacing: '0.08em', color: '#FFFFFF', fontFamily: "'Outfit', sans-serif" }}>
                              BARATHAN
                            </span>
                          </div>
                          <span style={{ fontSize: '0.66rem', fontWeight: 800, color: '#ffb800', letterSpacing: '0.16em', fontFamily: 'var(--font-mono, monospace)' }}>
                            SITE SUPERVISOR
                          </span>
                        </div>
                      )}

                      {card.iconType === 'bim' && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <Box size={20} color="#c084fc" />
                            <span style={{ fontWeight: 900, fontSize: '0.96rem', letterSpacing: '0.08em', color: '#FFFFFF', fontFamily: "'Outfit', sans-serif" }}>
                              BARATHAN
                            </span>
                          </div>
                          <span style={{ fontSize: '0.66rem', fontWeight: 800, color: '#c084fc', letterSpacing: '0.16em', fontFamily: 'var(--font-mono, monospace)' }}>
                            3D & BIM MODELER
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bullet List of Responsibilities */}
                    <div
                      style={{
                        fontSize: '0.78rem',
                        lineHeight: 1.55,
                        color: '#8e97a8',
                        fontWeight: 500,
                        textAlign: 'left'
                      }}
                    >
                      {card.descList.join(' • ')}
                    </div>
                  </div>

                  {/* Bottom Circular Arrow Button */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '16px'
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: isHovered ? card.themeColor : 'rgba(255, 255, 255, 0.08)',
                        color: isHovered ? '#0a0d14' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.25s ease',
                        transform: isHovered ? 'rotate(-45deg) scale(1.1)' : 'rotate(0deg) scale(1)',
                        boxShadow: isHovered ? `0 4px 12px ${card.themeColor}66` : 'none'
                      }}
                    >
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===================================================================
          INTERACTIVE STORY VIDEO LIGHTBOX MODAL
         =================================================================== */}
      {isVideoModalOpen && (
        <div
          onClick={() => setIsVideoModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: 'rgba(6, 8, 14, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '900px',
              backgroundColor: '#000000',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVideoModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#CAB796';
                e.currentTarget.style.color = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              <X size={20} />
            </button>

            {/* Video Player */}
            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
              <video
                src={heroVideo}
                controls
                autoPlay
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Video Caption Bar */}
            <div
              style={{
                padding: '20px 24px',
                backgroundColor: '#0a0d14',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#FFFFFF' }}>
                  Barathan — Founder Story
                </div>
                <div style={{ color: '#CAB796', fontSize: '0.84rem', fontWeight: 600 }}>
                  Architectural Vision. Engineered Precision.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
