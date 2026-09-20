import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function RusticArcLoader({ onComplete, autoExit = true }) {
  const containerRef = useRef(null);
  const rusticWordRef = useRef(null);
  const arcWordRef = useRef(null);
  const brandContainerRef = useRef(null);
  const progressBarRef = useRef(null);
  const skipBtnRef = useRef(null);
  const [phaseText, setPhaseText] = useState('EXTERIOR ARCHITECTURE & 3D FACADES');

  const rusticChars = ['R', 'U', 'S', 'T', 'I', 'C'];
  const arcChars = ['A', 'R', 'C'];

  const rusticRefs = useRef([]);
  const arcRefs = useRef([]);
  const timelineRef = useRef(null);

  useGSAP(() => {
    // Master 5-Second Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        if (autoExit) {
          // Smooth curtain reveal of the main portfolio
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.85,
            ease: 'power4.inOut',
            onComplete: () => {
              if (onComplete) onComplete();
            }
          });
        }
      }
    });

    timelineRef.current = tl;

    // 0.0s - 0.4s: Clean White Screen, Progress Bar Starts
    tl.to(progressBarRef.current, {
      width: '100%',
      duration: 5.0,
      ease: 'none'
    }, 0);

    // Subtle fade in of brand container
    tl.set(brandContainerRef.current, { opacity: 1 }, 0.2);

    // =========================================================================
    // STEP 1: (0.4s - 2.0s) "RUSTIC" drops individually with 3D X/Z slant & weight bounce
    // =========================================================================
    tl.call(() => setPhaseText('STRUCTURAL FACADE • RUSTIC'), [], 0.4);

    rusticChars.forEach((char, i) => {
      const el = rusticRefs.current[i];
      if (!el) return;

      // 3D Slant parameters across X and Z axis
      const slantZ = (i - 2.5) * 6; // Angled fan on Z axis
      const slantX = 25 - Math.abs(i - 2.5) * 4; // Tilted back on X axis
      const slantY = (i - 2.5) * 4;

      tl.fromTo(
        el,
        {
          y: -280,
          opacity: 0,
          rotateX: slantX + 35,
          rotateZ: slantZ - 15,
          rotateY: slantY,
          scale: 0.85
        },
        {
          y: 0,
          opacity: 1,
          rotateX: slantX * 0.4,
          rotateZ: slantZ * 0.5,
          rotateY: 0,
          scale: 1,
          duration: 0.82,
          ease: 'bounce.out'
        },
        0.4 + i * 0.16 // Staggered drop
      );
    });

    // =========================================================================
    // STEP 2: (2.0s - 3.5s) "ARC" jumps upward one-by-one and lands on RUSTIC
    // =========================================================================
    tl.call(() => setPhaseText('ELEVATION GEOMETRY • ARC'), [], 2.0);

    // Target corresponding letters of RUSTIC for landing collision (e.g. T, I, C -> indices 3, 4, 5)
    const collisionTargetIndices = [3, 4, 5];

    arcChars.forEach((char, i) => {
      const arcEl = arcRefs.current[i];
      const rusticTargetEl = rusticRefs.current[collisionTargetIndices[i]];
      if (!arcEl) return;

      const startTime = 2.05 + i * 0.38;

      // 1) Arc letter jumps upward with energetic spring
      tl.fromTo(
        arcEl,
        {
          y: 140,
          opacity: 0,
          scale: 0.6,
          rotateX: -40,
          rotateZ: -10
        },
        {
          y: -110, // Apex of upward jump
          opacity: 1,
          scale: 1.25,
          rotateX: 10,
          rotateZ: (i - 1) * 8,
          duration: 0.36,
          ease: 'power2.out'
        },
        startTime
      );

      // 2) Lands on top of the corresponding letter of RUSTIC with physical impact
      tl.to(
        arcEl,
        {
          y: -42, // Resting on top of RUSTIC letterhead
          scale: 1.05,
          rotateX: 0,
          duration: 0.22,
          ease: 'power3.in'
        },
        startTime + 0.36
      );

      // 3) Recoil & compression on the RUSTIC letter being hit
      if (rusticTargetEl) {
        tl.to(
          rusticTargetEl,
          {
            y: 12,
            scaleY: 0.84,
            duration: 0.12,
            ease: 'power2.out'
          },
          startTime + 0.36
        );

        tl.to(
          rusticTargetEl,
          {
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease: 'elastic.out(1.2, 0.3)'
          },
          startTime + 0.48
        );
      }

      // 4) "ARC" bounces off and hops into its final horizontal alignment slot
      tl.to(
        arcEl,
        {
          y: 0,
          scale: 1,
          duration: 0.42,
          ease: 'bounce.out'
        },
        startTime + 0.58
      );
    });

    // =========================================================================
    // STEP 3: (3.6s - 4.4s) Final visual alignment as RUSTICARC with micro-bounce settle
    // =========================================================================
    tl.call(() => setPhaseText('SIGNATURE ELEVATION • RUSTICARC'), [], 3.65);

    // All letters stabilize, align straight, and execute synchronized settle bounce
    const allLetters = [...rusticRefs.current, ...arcRefs.current].filter(Boolean);

    tl.to(
      allLetters,
      {
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        y: -12,
        duration: 0.3,
        ease: 'power2.out'
      },
      3.7
    );

    tl.to(
      allLetters,
      {
        y: 0,
        duration: 0.65,
        ease: 'elastic.out(1.15, 0.35)',
        stagger: 0.02
      },
      4.0
    );

    // Subtle scale flourish on the completed logo
    tl.to(
      brandContainerRef.current,
      {
        scale: 1.04,
        duration: 0.3,
        ease: 'power1.out'
      },
      4.1
    );

    tl.to(
      brandContainerRef.current,
      {
        scale: 1.0,
        duration: 0.5,
        ease: 'power2.inOut'
      },
      4.4
    );

    // 4.4s - 5.0s: Hold final frame for viewer appreciation before curtain wipe
    tl.call(() => setPhaseText('HOUSE ELEVATIONS READY'), [], 4.6);

  }, { scope: containerRef });

  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    gsap.to(containerRef.current, {
      yPercent: -100,
      duration: 0.5,
      ease: 'power4.inOut',
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#FFFFFF',
        color: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        userSelect: 'none',
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      {/* Subtle high-key radial background glow to enhance 3D depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 48%, rgba(245, 247, 250, 0.9) 0%, #FFFFFF 75%)',
          pointerEvents: 'none'
        }}
      />

      {/* Top Header Controls */}
      <div
        style={{
          position: 'absolute',
          top: '32px',
          left: '36px',
          right: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#9cdd2e',
                boxShadow: '0 0 8px #9cdd2e'
              }}
            />
            <span
              style={{
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#111111'
              }}
            >
              MODERN HOUSE ELEVATIONS
            </span>
          </div>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#666666',
              paddingLeft: '16px'
            }}
          >
            {phaseText}
          </span>
        </div>

        {/* Skip Button (Commented out per request) */}
        {/*
        <button
          ref={skipBtnRef}
          onClick={handleSkip}
          style={{
            background: 'rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            padding: '8px 18px',
            borderRadius: '24px',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            color: '#222',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#000000';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
            e.currentTarget.style.color = '#222';
          }}
        >
          Skip Intro →
        </button>
        */}
      </div>

      {/* Main 3D Brand Arena */}
      <div
        ref={brandContainerRef}
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          padding: '20px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            fontWeight: 900,
            fontSize: 'clamp(2.4rem, 8vw, 7.8rem)',
            letterSpacing: '-0.035em',
            lineHeight: 1,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Word: RUSTIC (Black #000000) */}
          <div
            ref={rusticWordRef}
            style={{
              display: 'inline-flex',
              color: '#000000',
              transformStyle: 'preserve-3d'
            }}
          >
            {rusticChars.map((char, index) => (
              <span
                key={`rustic-${index}`}
                ref={(el) => (rusticRefs.current[index] = el)}
                style={{
                  display: 'inline-block',
                  transformOrigin: 'bottom center',
                  willChange: 'transform, opacity',
                  textShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
                }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Word: ARC (Green #9cdd2e) */}
          <div
            ref={arcWordRef}
            style={{
              display: 'inline-flex',
              color: '#9cdd2e',
              transformStyle: 'preserve-3d',
              marginLeft: '0.04em'
            }}
          >
            {arcChars.map((char, index) => (
              <span
                key={`arc-${index}`}
                ref={(el) => (arcRefs.current[index] = el)}
                style={{
                  display: 'inline-block',
                  transformOrigin: 'bottom center',
                  willChange: 'transform, opacity',
                  textShadow: '0 8px 25px rgba(156, 221, 46, 0.25)'
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Subtitle / Tagline revealed gently in final frame */}
      <div
        style={{
          marginTop: '22px',
          fontSize: 'clamp(0.72rem, 1.3vw, 1.15rem)',
          fontWeight: 700,
          letterSpacing: 'clamp(0.08em, 0.2vw, 0.26em)',
          textTransform: 'uppercase',
          color: '#555',
          opacity: 0.95,
          textAlign: 'center',
          padding: '0 16px',
          maxWidth: '92vw'
        }}
      >
        Modern House Elevations & Façade Architecture Studio
      </div>

      {/* 5-Second Linear Progress Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          backgroundColor: 'rgba(0, 0, 0, 0.06)'
        }}
      >
        <div
          ref={progressBarRef}
          style={{
            height: '100%',
            width: '0%',
            backgroundColor: '#9cdd2e',
            boxShadow: '0 0 10px rgba(156, 221, 46, 0.6)'
          }}
        />
      </div>
    </div>
  );
}
