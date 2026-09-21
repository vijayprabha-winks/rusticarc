import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import houseImg from '../assets/rustic_hero_house.png';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicHeroSection({ isLoaderActive }) {
  const containerRef = useRef(null);
  const houseWrapperRef = useRef(null);
  const houseImgRef = useRef(null);
  const textBackdropRef = useRef(null);
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  // Play the signature GSAP "Jel Shake" (Jelly Bounce) entrance animation
  const triggerJelShakeAnimation = () => {
    const house = houseWrapperRef.current;
    const letters = textBackdropRef.current;
    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;

    if (!house) return;

    const tl = gsap.timeline();

    // 1. Text & UI Entrance (Dramatic staggered fade-in)
    if (letters) {
      tl.fromTo(
        letters,
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' },
        0.05
      );
    }

    if (topRow) {
      tl.fromTo(
        topRow.children,
        { opacity: 0, y: -25 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power2.out' },
        0.15
      );
    }

    if (bottomRow) {
      tl.fromTo(
        bottomRow.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
        0.25
      );
    }

    // 2. High-Impact Signature "Jel Shake" Physics for the House (Slow, Majestic Rise)
    // Origin at bottom center so squash and stretch reacts from the foundation
    gsap.set(house, { transformOrigin: '50% 100%' });

    // Slow, smooth entrance from down to up (1.8s duration)
    tl.fromTo(
      house,
      {
        y: 380,
        scaleY: 1.18,
        scaleX: 0.86,
        opacity: 0
      },
      {
        y: -14,
        scaleY: 0.92,
        scaleX: 1.08,
        opacity: 0.82,
        duration: 1.8,
        ease: 'power2.out'
      },
      0.15
    )
      // Wobble stage 1 (Rebound stretch)
      .to(
        house,
        {
          y: 7,
          scaleY: 1.06,
          scaleX: 0.95,
          duration: 0.35,
          ease: 'sine.inOut'
        }
      )
      // Wobble stage 2 (Squash return)
      .to(
        house,
        {
          y: -3,
          scaleY: 0.97,
          scaleX: 1.03,
          duration: 0.28,
          ease: 'sine.inOut'
        }
      )
      // Wobble stage 3 (Micro settle)
      .to(
        house,
        {
          y: 1,
          scaleY: 1.01,
          scaleX: 0.99,
          duration: 0.22,
          ease: 'sine.inOut'
        }
      )
      // Final lock to rest position (semi-transparent so RUSTICARC text shines through)
      .to(
        house,
        {
          y: 0,
          scaleY: 1.0,
          scaleX: 1.0,
          opacity: 0.82,
          duration: 0.22,
          ease: 'power1.out'
        }
      );
  };

  // Trigger when loader completes
  useEffect(() => {
    if (isLoaderActive) return;
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    // Small delay to ensure smooth layout render after loader unmounts
    const timer = setTimeout(() => {
      triggerJelShakeAnimation();
    }, 80);

    return () => clearTimeout(timer);
  }, [isLoaderActive]);

  // Subtle scroll parallax & hover jelly wobble interaction
  useGSAP(
    () => {
      if (!houseWrapperRef.current || !textBackdropRef.current) return;

      // Parallax effect on scroll
      gsap.to(houseWrapperRef.current, {
        y: 60,
        scale: 0.97,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6
        }
      });

      gsap.to(textBackdropRef.current, {
        y: -40,
        opacity: 0.45,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6
        }
      });
    },
    { scope: containerRef }
  );

  // Interactive house hover jelly wobble
  const handleHouseHover = () => {
    if (!houseWrapperRef.current) return;
    gsap.killTweensOf(houseWrapperRef.current);
    gsap.timeline()
      .to(houseWrapperRef.current, {
        scaleY: 0.95,
        scaleX: 1.05,
        opacity: 0.88,
        duration: 0.18,
        ease: 'power1.out'
      })
      .to(houseWrapperRef.current, {
        scaleY: 1.04,
        scaleX: 0.97,
        duration: 0.22,
        ease: 'sine.inOut'
      })
      .to(houseWrapperRef.current, {
        scaleY: 1.0,
        scaleX: 1.0,
        opacity: 0.78,
        duration: 0.25,
        ease: 'elastic.out(1.2, 0.4)'
      });
  };

  const scrollToAbout = (e) => {
    e.preventDefault();
    const target = document.getElementById('about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="cinematic-hero-section"
      data-section="home"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#09090b',
        color: '#f4f4f5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        paddingTop: 'clamp(80px, 11vh, 120px)',
        paddingBottom: 'clamp(20px, 3vh, 32px)',
        boxSizing: 'border-box'
      }}
    >
      <div id="home" style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0, pointerEvents: 'none' }} />

      {/* Subtle architectural radial lighting behind the house */}
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(350px, 70vw, 900px)',
          height: 'clamp(200px, 45vh, 500px)',
          background: 'radial-gradient(ellipse at center, rgba(217, 119, 6, 0.14) 0%, rgba(20, 20, 24, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* ===================================================================
          1. TOP ROW: Architectural Statement, Metrics & Philosophy
         =================================================================== */}
      <div
        ref={topRowRef}
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 56px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'clamp(24px, 4vw, 48px)',
          alignItems: 'start',
          boxSizing: 'border-box'
        }}
      >
        {/* Left Column: Core Design Belief & CTA */}
        <div style={{ maxWidth: '340px' }}>
          <p
            style={{
              fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(0.85rem, 1.05vw, 0.98rem)',
              lineHeight: 1.6,
              color: '#d4d4d8',
              fontWeight: 400,
              margin: '0 0 16px 0'
            }}
          >
            We believe in designing spaces that harmonize with their surroundings and reflect the unique personalities of their inhabitants.
          </p>

          <a
            href="#about"
            onClick={scrollToAbout}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(0.82rem, 1vw, 0.92rem)',
              fontWeight: 600,
              color: '#ffffff',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              borderBottom: '1px solid rgba(255, 255, 255, 0.35)',
              paddingBottom: '2px',
              transition: 'border-color 0.2s ease, color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#9cdd2e';
              e.currentTarget.style.borderColor = '#9cdd2e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
            }}
          >
            <span>Learn More</span>
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Center Column: Impact Metrics */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 'clamp(28px, 4vw, 56px)'
          }}
        >
          {/* Metric 1 */}
          <div>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: 'clamp(0.68rem, 0.8vw, 0.76rem)',
                fontWeight: 600,
                color: '#a1a1aa',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '6px'
              }}
            >
              PROJECTS DONE
            </span>
            <span
              style={{
                fontFamily: "'Outfit', 'Cinzel', sans-serif",
                fontSize: 'clamp(2.5rem, 4.2vw, 3.8rem)',
                fontWeight: 700,
                lineHeight: 1,
                color: '#ffffff',
                letterSpacing: '-0.03em'
              }}
            >
              400+
            </span>
          </div>

          {/* Metric 2 */}
          <div>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: 'clamp(0.68rem, 0.8vw, 0.76rem)',
                fontWeight: 600,
                color: '#a1a1aa',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '6px'
              }}
            >
              CUSTOMERS WORLDWIDE
            </span>
            <span
              style={{
                fontFamily: "'Outfit', 'Cinzel', sans-serif",
                fontSize: 'clamp(2.5rem, 4.2vw, 3.8rem)',
                fontWeight: 700,
                lineHeight: 1,
                color: '#ffffff',
                letterSpacing: '-0.03em'
              }}
            >
              346K
            </span>
          </div>
        </div>

        {/* Right Column: Human-Centered Design Philosophy */}
        <div style={{ maxWidth: '340px', justifySelf: 'end' }}>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: 'clamp(0.72rem, 0.85vw, 0.82rem)',
              color: '#a1a1aa',
              letterSpacing: '0.06em',
              marginBottom: '10px'
            }}
          >
            [human-centered design]
          </span>

          <p
            style={{
              fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(0.85rem, 1.05vw, 0.98rem)',
              lineHeight: 1.6,
              color: '#d4d4d8',
              fontWeight: 400,
              margin: 0
            }}
          >
            A home shaped by your rhythm. Every space is tailored to support your daily rituals, movement, and stillness.
          </p>
        </div>
      </div>

      {/* ===================================================================
          2. MAIN STAGE: Giant RUSTICARC Serif Backdrop + Jelly-Shaking House
         =================================================================== */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          minHeight: 'clamp(360px, 58vh, 680px)',
          marginTop: 'clamp(10px, 2vh, 30px)'
        }}
      >
        {/* Giant Serif Typography: RUSTICARC */}
        <div
          ref={textBackdropRef}
          style={{
            position: 'absolute',
            top: '26%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 2,
            userSelect: 'none'
          }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(4.6rem, 17.5vw, 18rem)',
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: '-0.015em',
              color: '#ffffff',
              textShadow: '0 0 50px rgba(255, 255, 255, 0.35), 0 2px 25px rgba(0, 0, 0, 0.95)',
              textTransform: 'none',
              opacity: 1
            }}
          >
            Rusticarc
          </h1>
        </div>

        {/* Photorealistic House Cutout with GSAP "Jel Shake" Entrance */}
        <div
          ref={houseWrapperRef}
          onMouseEnter={handleHouseHover}
          style={{
            position: 'relative',
            zIndex: 4,
            width: 'clamp(340px, 72vw, 1020px)',
            maxWidth: '96vw',
            lineHeight: 0,
            cursor: 'pointer',
            opacity: 0.78,
            transition: 'opacity 0.3s ease',
            willChange: 'transform, opacity'
          }}
          title="Click or hover to trigger jel shake!"
          onClick={triggerJelShakeAnimation}
        >
          <img
            ref={houseImgRef}
            src={houseImg}
            alt="Rustic Arc Architectural Scandinavian Pavilion"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.95))',
              pointerEvents: 'auto'
            }}
          />
        </div>
      </div>

      {/* ===================================================================
          3. BOTTOM ROW: Architecture Credits & Interactive Replay Button
         =================================================================== */}
      <div
        ref={bottomRowRef}
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 56px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: 'clamp(0.72rem, 0.85vw, 0.82rem)',
          color: '#71717a',
          letterSpacing: '0.08em',
          boxSizing: 'border-box'
        }}
      >
        <div>[@2026]</div>

        {/* Quick Replay Jelly Entrance Button */}
        <button
          type="button"
          onClick={triggerJelShakeAnimation}
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '4px 12px',
            color: '#a1a1aa',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.72rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#9cdd2e';
            e.currentTarget.style.borderColor = 'rgba(156, 221, 46, 0.5)';
            e.currentTarget.style.background = 'rgba(156, 221, 46, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#a1a1aa';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
          }}
          title="Replay the Jel Shake entrance animation"
        >
          <Sparkles size={12} color="#9cdd2e" />
          <span>Replay Jel Shake</span>
        </button>

        <div>[trusted architecture firm]</div>
      </div>
    </section>
  );
}
