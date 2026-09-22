import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight, Compass, Home, Box, Hammer, CheckCircle2, X, Sparkles } from 'lucide-react';
import studioTeamImg from '../assets/services/studio_team.jpg';
import architectureImg from '../assets/services/architecture.jpg';
import interiorImg from '../assets/services/interior.jpg';
import design3dImg from '../assets/services/3d_design.jpg';
import constructionImg from '../assets/services/construction.jpg';
import sideAccentImg from '../assets/services/side_accent.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const centerImageRef = useRef(null);
  const studioImgParallaxRef = useRef(null);
  const floatingBadgeRef = useRef(null);
  const rightColumnRef = useRef(null);
  const statsRef = useRef(null);
  const marqueeRef = useRef(null);
  const cardsRef = useRef(null);
  const modalRef = useRef(null);

  const [activeService, setActiveService] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const servicesList = [
    {
      id: 'architecture',
      number: '01',
      title: 'Architecture',
      img: architectureImg,
      icon: Compass,
      lines: [
        'Bespoke structural planning.',
        'Sculpted cantilever façades.',
        'Passive solar & site orientation.'
      ],
      tag: 'STRUCTURE & FAÇADE',
      detail: 'From concept zoning to engineered structural elevations, we conceive modern villas defined by geometric daring, floating structural overhangs, and climate-adaptive materials.'
    },
    {
      id: 'interior',
      number: '02',
      title: 'Interior',
      img: interiorImg,
      icon: Home,
      lines: [
        'Bespoke luxury spaces.',
        'Tactile natural stone & cedar.',
        'Ambient architectural lighting.'
      ],
      tag: 'SENSORY LIVING',
      detail: 'Tailored living environments designed with spatial harmony, Italian vein-cut travertine, acoustic fluted timber, and concealed 2700K perimeter cove illumination.'
    },
    {
      id: '3d-design',
      number: '03',
      title: '3D Design',
      img: design3dImg,
      icon: Box,
      lines: [
        'Photorealistic 3D elevations.',
        'Interactive BIM walkthroughs.',
        'Millimeter-accurate details.'
      ],
      tag: 'DIGITAL TWIN & BIM',
      detail: 'High-fidelity 3D modeling and elevation matrices that bring your villa to life. Test daylight shadows, texture finishes, and spatial flow before groundbreaking.'
    },
    {
      id: 'construction',
      number: '04',
      title: 'Construction',
      img: constructionImg,
      icon: Hammer,
      lines: [
        'Turnkey master execution.',
        'Rigorous engineering tolerances.',
        'On-time flawless delivery.'
      ],
      tag: 'TURNKEY BUILD',
      detail: 'Single-source accountability from earthworks to key handover. Precision reinforced concrete, seismic design integrity, and white-glove artisan craftsmanship.'
    }
  ];

  // GSAP Animations Engine
  useGSAP(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    // 1. Kinetic Headline Stagger with overflow-hidden word reveal
    gsap.fromTo(
      '.service-word',
      { yPercent: 115, opacity: 0, rotateZ: 2 },
      {
        yPercent: 0,
        opacity: 1,
        rotateZ: 0,
        duration: 1.05,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // 1b. Headline Subtitle & Button
    gsap.fromTo(
      '.service-headline-desc',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: 0.35,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      '.service-explore-btn',
      { opacity: 0, scale: 0.9, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // 1c. Top Accent Green Lines (scaleX expansion from left)
    gsap.fromTo(
      '.accent-bar-expand',
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: 'left center',
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 84%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // 2. Studio Center Image Parallax Scrub & Entrance
    gsap.fromTo(
      centerImageRef.current,
      { opacity: 0, scale: 0.95, y: 45 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: centerImageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Parallax scrub on the inner studio image
    if (studioImgParallaxRef.current) {
      gsap.fromTo(
        studioImgParallaxRef.current,
        { yPercent: -10, scale: 1.15 },
        {
          yPercent: 10,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: centerImageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        }
      );
    }

    // Floating Editorial Badge Parallax + Floating sine wave
    if (floatingBadgeRef.current) {
      gsap.to(floatingBadgeRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: centerImageRef.current,
          start: 'top 85%',
          end: 'bottom top',
          scrub: 1.5
        }
      });

      gsap.to(floatingBadgeRef.current, {
        y: '+=6',
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // 3. Right Editorial Column Tags Cascading Reveal
    gsap.fromTo(
      '.category-tag-item',
      { opacity: 0, x: 35 },
      {
        opacity: 1,
        x: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightColumnRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      '.right-preview-box',
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightColumnRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // 4. Live Architectural BIM Stats Counter Animation
    const statEls = gsap.utils.toArray('.stat-counter-number');
    statEls.forEach((el) => {
      const targetVal = parseFloat(el.getAttribute('data-target'));
      const unit = el.getAttribute('data-unit') || '';
      const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals')) : 0;

      const counterObj = { val: 0 };
      gsap.to(counterObj, {
        val: targetVal,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
          onLeaveBack: () => {
            counterObj.val = 0;
            const numStr = decimals > 0 ? (0).toFixed(decimals) : '0';
            el.textContent = `${numStr}${unit}`;
          }
        },
        onUpdate: () => {
          const numStr = decimals > 0 ? counterObj.val.toFixed(decimals) : Math.round(counterObj.val);
          el.textContent = `${numStr}${unit}`;
        }
      });
    });

    // 5. Infinite Architectural Ticker Strip with Scroll Velocity Boost
    const tickerTrack = document.querySelector('.marquee-track');
    if (tickerTrack) {
      const tickerTween = gsap.to(tickerTrack, {
        xPercent: -50,
        duration: 28,
        repeat: -1,
        ease: 'none'
      });

      ScrollTrigger.create({
        trigger: sec,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const speed = Math.abs(self.getVelocity() / 320);
          tickerTween.timeScale(1 + Math.min(speed, 2.5));
          gsap.to(tickerTween, { timeScale: 1, duration: 0.8, ease: 'power1.out', overwrite: 'auto' });
        }
      });
    }

    // 6. Section Divider Line Expansion
    gsap.fromTo(
      '.cards-separator-line',
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // 7. Bottom 4 Service Cards Stagger & Elements Reveal
    const cards = gsap.utils.toArray('.service-card-item');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 55, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Inner thumbnail images zoom settling
    gsap.fromTo(
      '.card-thumb-img',
      { scale: 1.18, filter: 'brightness(0.92)' },
      {
        scale: 1.0,
        filter: 'brightness(1.0)',
        duration: 1.1,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Card number badges slide up
    gsap.fromTo(
      '.card-number-badge',
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        delay: 0.25,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Action arrow circles spring in
    gsap.fromTo(
      '.card-arrow-circle',
      { scale: 0, rotate: -60 },
      {
        scale: 1,
        rotate: 0,
        duration: 0.7,
        stagger: 0.12,
        delay: 0.4,
        ease: 'back.out(1.8)',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

  }, { scope: sectionRef });

  // Modal Entrance Animation
  useEffect(() => {
    if (activeService && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: 25 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power3.out' }
      );
    }
  }, [activeService]);

  return (
    <section
      id="services"
      data-section="services"
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        color: '#111215',
        padding: 'clamp(60px, 8vw, 110px) clamp(16px, 3vw, 24px) clamp(50px, 7vw, 90px)',
        overflow: 'hidden',
        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: '1380px',
          margin: '0 auto'
        }}
      >
        {/* ===================================================================
            TOP HERO GRID (Matches Reference: Left Title, Center Studio, Right Text)
           =================================================================== */}
        <div className="services-hero-grid">
          {/* Left Column: Stacked Display Headline */}
          <div
            ref={headlineRef}
            style={{
              gridColumn: 'span 4'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '18px'
              }}
            >
              <span
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  color: '#111215',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-mono, monospace)'
                }}
              >
                OUR SERVICES
              </span>
              <span
                className="accent-bar-expand"
                style={{
                  width: '36px',
                  height: '2.5px',
                  backgroundColor: '#CAB796'
                }}
              />
            </div>

            <h2
              style={{
                fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(2.8rem, 4.4vw, 4.2rem)',
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                color: '#111215',
                textTransform: 'uppercase',
                marginBottom: '20px'
              }}
            >
              <div style={{ overflow: 'hidden', paddingBottom: '4px' }}>
                <span className="service-word" style={{ display: 'block' }}>
                  DESIGN
                </span>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '4px' }}>
                <span className="service-word" style={{ display: 'block' }}>
                  STRUCTURE
                </span>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '4px' }}>
                <span className="service-word" style={{ display: 'block' }}>
                  PRECISION
                </span>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '4px' }}>
                <span
                  className="service-word"
                  style={{
                    display: 'block',
                    color: '#CAB796'
                  }}
                >
                  ELEVATION
                </span>
              </div>
            </h2>

            <p
              className="service-headline-desc"
              style={{
                color: '#555a66',
                fontSize: '1rem',
                lineHeight: 1.65,
                fontWeight: 450,
                maxWidth: '380px',
                marginBottom: '28px'
              }}
            >
              A complete suite of architectural, interior, 3D elevation, and turnkey construction services to define your signature estate.
            </p>

            <button
              className="service-explore-btn"
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '13px 28px',
                borderRadius: '50px',
                background: '#FFFFFF',
                color: '#111215',
                border: '1.5px solid #111215',
                fontSize: '0.94rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#111215';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = '#111215';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Explore Our Services</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Center Column: Team Collaboration Image with Editorial Callout & Parallax */}
          <div
            ref={centerImageRef}
            style={{
              gridColumn: 'span 5',
              position: 'relative'
            }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12)',
                backgroundColor: '#f1f3f6',
                height: 'clamp(240px, 45vw, 380px)'
              }}
            >
              <img
                ref={studioImgParallaxRef}
                src={studioTeamImg}
                alt="Architectural Studio Team Collaborating"
                style={{
                  width: '100%',
                  height: '125%',
                  objectFit: 'cover',
                  display: 'block',
                  willChange: 'transform'
                }}
              />

              {/* Floating Editorial Card overlay with parallax */}
              <div
                ref={floatingBadgeRef}
                className="floating-editorial-badge"
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  background: 'rgba(255, 255, 255, 0.94)',
                  backdropFilter: 'blur(12px)',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                  zIndex: 2
                }}
              >
                <div
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: '0.86rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#111215',
                    lineHeight: 1.2
                  }}
                >
                  BUILD HOMES
                  <br />
                  THAT MATTER
                </div>
                <div
                  className="accent-bar-expand"
                  style={{
                    width: '24px',
                    height: '2px',
                    backgroundColor: '#CAB796',
                    marginTop: '6px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text Column & Secondary Slice Photo */}
          <div
            ref={rightColumnRef}
            style={{
              gridColumn: 'span 3',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px',
              height: 'auto',
              gap: '24px'
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#717682',
                  marginBottom: '10px',
                  fontFamily: 'var(--font-mono, monospace)',
                  lineHeight: 1.4
                }}
              >
                SERVICES THAT CREATE
                <br />
                TIMELESS OUTCOMES
              </div>
              <div
                className="accent-bar-expand"
                style={{
                  width: '28px',
                  height: '2px',
                  backgroundColor: '#CAB796',
                  marginBottom: '20px'
                }}
              />

              {/* Category tags */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.12em',
                  fontWeight: 700,
                  color: '#2d3139'
                }}
              >
                {[
                  'ARCHITECTURE',
                  'INTERIORS',
                  '3D ELEVATION',
                  'CONSTRUCTION',
                  'RUSTIC ARC'
                ].map((tag, tIdx) => (
                  <div
                    key={tIdx}
                    className="category-tag-item"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'transform 0.2s ease, color 0.2s ease',
                      cursor: 'default'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.color = '#CAB796';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.color = '#2d3139';
                    }}
                  >
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#CAB796' }} />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom mini showcase preview */}
            <div
              className="right-preview-box"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px 14px',
                background: '#f7f8fa',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)'
              }}
            >
              <img
                src={sideAccentImg}
                alt="Rustic Arc Architectural Detail"
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '8px',
                  objectFit: 'cover'
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#111215',
                    lineHeight: 1.3
                  }}
                >
                  Vision today.
                  <br />
                  A timeless estate tomorrow.
                </div>
                <div
                  className="accent-bar-expand"
                  style={{
                    width: '18px',
                    height: '2px',
                    backgroundColor: '#CAB796',
                    marginTop: '4px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            ARCHITECTURAL BIM & ENGINEERING SPECIFICATIONS (Animated GSAP Counters)
            =================================================================== */}
        <div
          ref={statsRef}
          className="resp-grid-stats-4"
          style={{
            padding: 'clamp(20px, 4vw, 28px) clamp(16px, 3.5vw, 36px)',
            backgroundColor: '#0a0d14',
            borderRadius: '20px',
            color: '#FFFFFF',
            marginBottom: '32px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle architectural grid pattern overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              pointerEvents: 'none'
            }}
          />

          {[
            { target: 100, unit: '%', decimals: 0, title: 'Bespoke Façade Craft', desc: 'Custom tailored villa elevations' },
            { target: 0.02, unit: 'mm', decimals: 2, title: 'BIM 3D Precision', desc: 'Micron engineering tolerance' },
            { target: 4, unit: '', decimals: 0, title: 'Integrated Disciplines', desc: 'Single-source atelier model' },
            { target: 360, unit: '°', decimals: 0, title: 'Turnkey Handover', desc: 'Concept zoning to final key' }
          ].map((stat, sIdx) => (
            <div key={sIdx} style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 'clamp(2rem, 3vw, 2.6rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  color: '#CAB796',
                  lineHeight: 1.1,
                  marginBottom: '6px'
                }}
              >
                <span
                  className="stat-counter-number"
                  data-target={stat.target}
                  data-unit={stat.unit}
                  data-decimals={stat.decimals}
                >
                  0{stat.unit}
                </span>
              </div>
              <div
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: '#FFFFFF',
                  marginBottom: '2px'
                }}
              >
                {stat.title}
              </div>
              <div
                style={{
                  fontSize: '0.78rem',
                  color: '#8b93a4'
                }}
              >
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* ===================================================================
            CONTINUOUS ARCHITECTURAL TICKER (Dynamic GSAP Velocity Scroll)
           =================================================================== */}
        <div
          ref={marqueeRef}
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            padding: '14px 0',
            marginBottom: '36px',
            backgroundColor: '#f7f8fa',
            borderRadius: '100px',
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div
            className="marquee-track"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '36px',
              willChange: 'transform'
            }}
          >
            {[
              'Bespoke Villa Architecture',
              'Floating Cantilever Elevations',
              'Italian Vein-Cut Travertine',
              'Interactive 3D BIM Twin',
              'Acoustic Fluted Cedar',
              'Turnkey Construction Delivery',
              'Passive Biophilic Living',
              'Rustic Arc Studio'
            ].concat([
              'Bespoke Villa Architecture',
              'Floating Cantilever Elevations',
              'Italian Vein-Cut Travertine',
              'Interactive 3D BIM Twin',
              'Acoustic Fluted Cedar',
              'Turnkey Construction Delivery',
              'Passive Biophilic Living',
              'Rustic Arc Studio'
            ]).map((text, mIdx) => (
              <div
                key={mIdx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#111215',
                  fontFamily: 'var(--font-mono, monospace)'
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#CAB796'
                  }}
                />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expanding Animated Separator Line */}
        <div
          className="cards-separator-line"
          style={{
            height: '1px',
            backgroundColor: '#e5e7eb',
            marginBottom: '36px',
            transformOrigin: 'left center'
          }}
        />

        {/* ===================================================================
            BOTTOM 4 SERVICES GRID (Architecture, Interior, 3D Design, Construction)
           =================================================================== */}
        <div
          ref={cardsRef}
          className="services-cards-grid"
        >
          {servicesList.map((service, index) => {
            const isHovered = hoveredCard === service.id;

            return (
              <div
                key={service.id}
                className="service-card-item"
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setActiveService(service)}
                style={{
                  paddingRight: index < 3 ? '24px' : '0',
                  borderRight: index < 3 ? '1px solid #eef0f3' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '340px',
                  transition: 'transform 0.3s ease'
                }}
              >
                <div>
                  {/* Top Number + Accent Line */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '10px'
                    }}
                  >
                    <span
                      className="card-number-badge"
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.86rem',
                        fontWeight: 800,
                        color: isHovered ? '#CAB796' : '#717682',
                        transition: 'color 0.25s ease'
                      }}
                    >
                      {service.number}
                    </span>
                    <span
                      style={{
                        width: isHovered ? '42px' : '28px',
                        height: '2px',
                        backgroundColor: isHovered ? '#CAB796' : '#d1d5db',
                        transition: 'width 0.3s ease, background-color 0.25s ease'
                      }}
                    />
                  </div>

                  {/* Service Title */}
                  <h3
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      letterSpacing: '-0.01em',
                      color: isHovered ? '#000000' : '#111215',
                      marginBottom: '14px',
                      transition: 'color 0.25s ease'
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Thumbnail Image */}
                  <div
                    className="card-image-wrap"
                    style={{
                      width: '100%',
                      height: '140px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      marginBottom: '16px',
                      boxShadow: isHovered ? '0 12px 28px rgba(0, 0, 0, 0.14)' : '0 4px 14px rgba(0, 0, 0, 0.06)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <img
                      className="card-thumb-img"
                      src={service.img}
                      alt={service.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: isHovered ? 'scale(1.09)' : 'scale(1)',
                        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  </div>

                  {/* Little lines about the contents */}
                  <div
                    style={{
                      fontSize: '0.86rem',
                      color: '#555a66',
                      lineHeight: 1.55,
                      fontWeight: 500,
                      marginBottom: '16px'
                    }}
                  >
                    {service.lines.map((line, lIdx) => (
                      <div
                        key={lIdx}
                        className="card-line-item"
                        style={{
                          marginBottom: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span
                          style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            backgroundColor: isHovered ? '#CAB796' : '#9ca3af',
                            transition: 'background-color 0.2s ease',
                            flexShrink: 0
                          }}
                        />
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Circular Arrow Icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}
                >
                  <div
                    className="card-arrow-circle"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      border: isHovered ? '1.5px solid #CAB796' : '1.5px solid #d1d5db',
                      background: isHovered ? '#CAB796' : 'transparent',
                      color: isHovered ? '#FFFFFF' : '#111215',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isHovered ? '0 4px 14px rgba(202, 183, 150, 0.4)' : 'none',
                      transition: 'all 0.25s ease',
                      transform: isHovered ? 'translateX(5px) rotate(45deg)' : 'translateX(0) rotate(0deg)'
                    }}
                  >
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================================================================
          INTERACTIVE SERVICE DETAIL MODAL (Click any service to view)
         =================================================================== */}
      {activeService && (
        <div
          onClick={() => setActiveService(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 12, 16, 0.65)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 200,
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
              background: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '650px',
              width: '100%',
              padding: 'clamp(20px, 4vw, 36px)',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
              position: 'relative'
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveService(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#f1f3f6',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#111215',
                transition: 'background 0.2s ease, transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e5e7eb';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f1f3f6';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              <X size={18} />
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#CAB796',
                fontWeight: 800,
                fontSize: '0.82rem',
                letterSpacing: '0.14em',
                marginBottom: '8px'
              }}
            >
              <span>{activeService.number} // {activeService.tag}</span>
            </div>

            <h3
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: '#111215',
                marginBottom: '16px'
              }}
            >
              {activeService.title}
            </h3>

            <div
              style={{
                width: '100%',
                height: '240px',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '20px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
              }}
            >
              <img
                src={activeService.img}
                alt={activeService.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            <p
              style={{
                color: '#4a505e',
                fontSize: '1rem',
                lineHeight: 1.65,
                marginBottom: '20px'
              }}
            >
              {activeService.detail}
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginBottom: '28px'
              }}
            >
              {activeService.lines.map((line, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.94rem',
                    fontWeight: 600,
                    color: '#111215'
                  }}
                >
                  <CheckCircle2 size={16} color="#CAB796" />
                  <span>{line}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setActiveService(null);
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '50px',
                background: '#CAB796',
                color: '#06070a',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.96rem',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(202, 183, 150, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>View Related Elevation Portfolio</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
