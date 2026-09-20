import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import heroVideo from '../assets/Cinematic_Hero_Video_Prompt_.mp4';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicHeroSection({ isLoaderActive }) {
  const containerRef = useRef(null);
  const pinTriggerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoElementRef = useRef(null);

  // Stage content container references (3 Core Disciplines)
  const stage1Ref = useRef(null); // Overview: Residential Atelier (0%)
  const stage2Ref = useRef(null); // Discipline 01: Architecture (50%)
  const stage3Ref = useRef(null); // Discipline 02: Interior (100% & Finish)

  const hasAnimatedEntrance = useRef(false);

  // Target time for smooth scroll scrubbing
  const targetTimeRef = useRef(0);

  // Active scroll stage: 0, 50, or 100
  const [activeStage, setActiveStage] = useState(0);

  // Jump to specific scroll stage (0%, 50%, or 100%)
  const handleScrollToStage = (stageVal) => {
    const heroST = ScrollTrigger.getById ? ScrollTrigger.getById('hero-trigger') : null;
    if (!heroST) return;
    const start = heroST.start;
    const distance = heroST.end - heroST.start;
    const targetY = start + (stageVal / 100) * distance;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  // 1. Initial Entrance Animation:
  // Once the loader finishes, the full-screen cinematic video slides in from the right edge.
  useEffect(() => {
    if (isLoaderActive) return;
    if (hasAnimatedEntrance.current) return;
    hasAnimatedEntrance.current = true;

    const ctx = gsap.context(() => {
      // Full-screen video container slides in from right side
      gsap.fromTo(
        videoWrapperRef.current,
        {
          x: '100vw',
          opacity: 0
        },
        {
          x: '0vw',
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          delay: 0.1
        }
      );

      // Stage 1 typography slides in from left into free space
      gsap.fromTo(
        stage1Ref.current,
        {
          x: -70,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaderActive]);

  // 2. High-Performance Hardware-Accelerated Video Scrubbing Engine
  // Eliminates infinite seek loop and subpixel rasterization jitter during scroll
  useEffect(() => {
    const vid = videoElementRef.current;
    if (!vid) return;

    vid.pause();
    vid.currentTime = 0;

    let isSeeking = false;
    let lastSoughtTime = 0;
    let pendingTime = null;
    let rafId = null;

    const performSeek = (time) => {
      if (!vid.duration) return;
      const clamped = Math.max(0, Math.min(time, vid.duration - 0.03));
      // Only seek if target has shifted by at least ~1 frame (0.025s) to eliminate jitter
      if (Math.abs(clamped - lastSoughtTime) < 0.025) return;

      if (isSeeking || vid.seeking) {
        pendingTime = clamped;
        return;
      }

      isSeeking = true;
      lastSoughtTime = clamped;
      vid.currentTime = clamped;
    };

    const handleSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const next = pendingTime;
        pendingTime = null;
        if (Math.abs(next - lastSoughtTime) >= 0.025) {
          isSeeking = true;
          lastSoughtTime = next;
          vid.currentTime = next;
        }
      }
    };

    vid.addEventListener('seeked', handleSeeked);

    const renderLoop = () => {
      if (vid.readyState >= 2) {
        performSeek(targetTimeRef.current);
      }
      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(rafId);
      vid.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  const handleLoadedMetadata = () => {
    const video = videoElementRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      ScrollTrigger.refresh();
    }
  };

  // 3. GSAP ScrollTrigger 3-Stage Orchestration (0: Overview -> 50: Architecture -> 100: Interior & Video Finish)
  useGSAP(() => {
    if (!pinTriggerRef.current) return;

    const s1 = stage1Ref.current;
    const s2 = stage2Ref.current;
    const s3 = stage3Ref.current;
    const vid = videoElementRef.current;

    // Master Scroll Timeline pinned for exactly 3 scrolls (+=1500px: 0 -> 50 -> 100)
    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'hero-trigger',
        trigger: pinTriggerRef.current,
        pin: true,
        start: 'top top',
        end: '+=1500',
        scrub: 0.5,
        anticipatePin: 0
      },
      onUpdate: () => {
        const p = tl.progress();
        const dur = (vid && vid.duration) ? vid.duration : 0;

        // Smoothly map scrubbed timeline progress to video playback time
        // At 100% progress (p >= 0.99), video completes to the final frame
        if (dur > 0) {
          const target = p >= 0.99 ? Math.max(0, dur - 0.02) : Math.min(p * dur, Math.max(0, dur - 0.02));
          targetTimeRef.current = target;
        }

        // Active stage tracking for 0, 50, 100
        if (p < 0.35) {
          setActiveStage(0);
        } else if (p < 0.75) {
          setActiveStage(50);
        } else {
          setActiveStage(100);
        }
      }
    });

    // Total duration: 10.0s mapped across 3 scrolls (+=1500px)
    // =========================================================================
    // STAGE 1 (0%): Overview (0.0s - 2.4s)
    // Visible at scroll 0, then smoothly exits to the left
    // =========================================================================
    tl.to(s1, { opacity: 0, x: -70, duration: 1.4, ease: 'power2.inOut' }, 2.4);

    // =========================================================================
    // STAGE 2 (50%): Architecture (enters 3.6s, centered at 5.0s = 50%, exits 5.8s)
    // Peak alignment and visibility at 50% scroll
    // =========================================================================
    tl.fromTo(
      s2,
      { opacity: 0, x: 70 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out' },
      3.6
    );
    tl.to(s2, { opacity: 0, x: 70, duration: 1.2, ease: 'power2.inOut' }, 5.8);

    // =========================================================================
    // STAGE 3 (100%): Interior (enters 7.0s, locked and fully visible through 10.0s)
    // At 100% scroll: Video completes and finishes
    // =========================================================================
    tl.fromTo(
      s3,
      { opacity: 0, x: -70 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out' },
      7.0
    );

    // Dummy spacer tween to guarantee timeline duration stays at 10.0s
    tl.to({}, { duration: 1.8 }, 8.2);

  }, { scope: containerRef });

  // Enhanced multi-layer high-contrast shadow (micro-outline + deep ambient diffusion)
  const textGlow = '0 1px 2px #000, 0 2px 8px rgba(0, 0, 0, 0.98), 0 4px 24px rgba(0, 0, 0, 0.95), 0 0 50px rgba(0, 0, 0, 0.9)';

  return (
    <section
      ref={containerRef}
      id="cinematic-hero-section"
      data-section="home"
      style={{ position: 'relative', background: '#06070a' }}
    >
      <div id="home" style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0, pointerEvents: 'none' }} />
      <div id="cinematic-hero" style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0, pointerEvents: 'none' }} />
      
      {/* ScrollTrigger Pin Target */}
      <div
        ref={pinTriggerRef}
        style={{
          height: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* ===================================================================
            FULL SCREEN CINEMATIC VIDEO (Plays strictly on scroll via scrub)
           =================================================================== */}
        <div
          ref={videoWrapperRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            zIndex: 1
          }}
        >
          <video
            ref={videoElementRef}
            src={heroVideo}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              pointerEvents: 'none'
            }}
          />

          {/* Directional Vignettes ensuring text clarity while maximizing video vibrancy */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, rgba(3, 4, 7, 0.78) 0%, rgba(3, 4, 7, 0.42) 36%, transparent 52%, rgba(3, 4, 7, 0.42) 68%, rgba(3, 4, 7, 0.8) 100%), linear-gradient(180deg, rgba(3, 4, 7, 0.6) 0%, transparent 22%, transparent 72%, rgba(3, 4, 7, 0.85) 100%)',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* ===================================================================
            STAGE 1 (0.0s - 2.2s): "RUSTIC ARC" (Overview)
           =================================================================== */}
        <div
          ref={stage1Ref}
          style={{
            position: 'absolute',
            left: 'clamp(16px, 3.5vw, max(36px, calc((100vw - 1380px) / 2)))',
            width: 'clamp(280px, 90vw, 620px)',
            maxWidth: 'calc(100vw - 32px)',
            zIndex: 10,
            opacity: 1,
            pointerEvents: 'auto'
          }}
        >
          {/* Architectural Index Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.72rem, 1.1vw, 0.8rem)',
              letterSpacing: '0.16em',
              color: '#9cdd2e',
              textShadow: textGlow
            }}
          >
            <span style={{ fontWeight: 800 }}>// 01</span>
            <span style={{ width: '32px', height: '1px', background: '#9cdd2e' }} />
            <span style={{ fontWeight: 700 }}>RESIDENTIAL ARCHITECTURAL ATELIER</span>
          </div>

          {/* Grand Brand Headline */}
          <h1
            style={{
              fontFamily: "'Cinzel', 'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.4rem, 6.4vw, 5.4rem)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: 'clamp(0.04em, 1.2vw, 0.14em)',
              color: '#ffffff',
              marginBottom: '14px',
              textShadow: textGlow
            }}
          >
            RUSTIC <span style={{ color: '#9cdd2e', textShadow: '0 0 35px rgba(156,221,46,0.7)' }}>ARC</span>
          </h1>

          {/* Editorial Italic Subtitle */}
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.15rem, 2.4vw, 1.85rem)',
              color: '#ffffff',
              fontWeight: 600,
              letterSpacing: '0.04em',
              lineHeight: 1.3,
              marginBottom: '14px',
              textShadow: textGlow
            }}
          >
            Architecture · Interior · Construction
          </div>

          {/* Editorial Intro Line */}
          <p
            style={{
              color: '#ffffff',
              fontSize: 'clamp(0.9rem, 1.3vw, 1.04rem)',
              fontWeight: 500,
              lineHeight: 1.7,
              maxWidth: '520px',
              marginBottom: '24px',
              textShadow: textGlow
            }}
          >
            End-to-end design and build excellence — harmonizing structural vision, bespoke interior artistry, and meticulous turnkey construction.
          </p>

          {/* Scroll Down Indicator */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              borderLeft: '2px solid #9cdd2e',
              padding: '4px 0 4px 10px',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.7rem, 1vw, 0.8rem)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textShadow: textGlow
            }}
          >
            <ChevronDown size={15} color="#9cdd2e" />
            <span>Three scrolls (0 · 50 · 100) to complete film</span>
          </div>
        </div>

        {/* ===================================================================
            STAGE 2 (3.2s - 6.2s): ARCHITECTURE (Right Side)
           =================================================================== */}
        <div
          ref={stage2Ref}
          style={{
            position: 'absolute',
            right: 'clamp(16px, 3.5vw, max(36px, calc((100vw - 1380px) / 2)))',
            width: 'clamp(280px, 90vw, 580px)',
            maxWidth: 'calc(100vw - 32px)',
            zIndex: 10,
            opacity: 0,
            pointerEvents: 'auto'
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '14px',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.72rem, 1.1vw, 0.8rem)',
              letterSpacing: '0.16em',
              color: '#9cdd2e',
              textShadow: textGlow
            }}
          >
            <span style={{ fontWeight: 800 }}>// 01 · WHAT WE DO</span>
            <span style={{ width: '32px', height: '1px', background: '#9cdd2e' }} />
            <span style={{ fontWeight: 700 }}>SPATIAL & FAÇADE VISION</span>
          </div>

          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '0.08em',
              color: '#ffffff',
              marginBottom: '10px',
              textShadow: textGlow
            }}
          >
            ARCHITECTURE
          </h2>

          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
              color: '#9cdd2e',
              fontWeight: 600,
              marginBottom: '14px',
              textShadow: textGlow,
              lineHeight: 1.4
            }}
          >
            Visionary structural design, sculptural façades, and precision spatial planning.
          </div>

          <p
            style={{
              color: '#ffffff',
              fontSize: 'clamp(0.9rem, 1.2vw, 1.02rem)',
              fontWeight: 500,
              lineHeight: 1.65,
              marginBottom: '20px',
              textShadow: textGlow
            }}
          >
            We sculpt landmark modern residences featuring iconic cantilevered overhangs, climate-responsive solar louvers, and photorealistic 3D visualization.
          </p>

          {/* Architectural Capabilities */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '6px',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, color: '#9cdd2e', letterSpacing: '0.12em', textShadow: textGlow }}>
                [ 01 ] FORM & FAÇADE
              </span>
              <span style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.94rem)', color: '#ffffff', fontWeight: 600, textShadow: textGlow }}>
                Sculptural Cantilevers & Parametric Façades
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '6px',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, color: '#9cdd2e', letterSpacing: '0.12em', textShadow: textGlow }}>
                [ 02 ] SPATIAL DYNAMICS
              </span>
              <span style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.94rem)', color: '#ffffff', fontWeight: 600, textShadow: textGlow }}>
                Solar Orientation & Volumetric Zoning
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '6px',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, color: '#9cdd2e', letterSpacing: '0.12em', textShadow: textGlow }}>
                [ 03 ] 3D BIM MODELING
              </span>
              <span style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.94rem)', color: '#ffffff', fontWeight: 600, textShadow: textGlow }}>
                Photorealistic Elevation & Millimeter Drafting
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            STAGE 3 (7.2s - 10.0s): INTERIOR (Left Side)
           =================================================================== */}
        <div
          ref={stage3Ref}
          style={{
            position: 'absolute',
            left: 'clamp(16px, 3.5vw, max(36px, calc((100vw - 1380px) / 2)))',
            width: 'clamp(280px, 90vw, 580px)',
            maxWidth: 'calc(100vw - 32px)',
            zIndex: 10,
            opacity: 0,
            pointerEvents: 'auto'
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '14px',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.72rem, 1.1vw, 0.8rem)',
              letterSpacing: '0.16em',
              color: '#00f0ff',
              textShadow: textGlow
            }}
          >
            <span style={{ fontWeight: 800 }}>// 02 · WHAT WE DO</span>
            <span style={{ width: '32px', height: '1px', background: '#00f0ff' }} />
            <span style={{ fontWeight: 700 }}>BESPOKE LIVING ENVIRONMENTS</span>
          </div>

          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '0.08em',
              color: '#ffffff',
              marginBottom: '10px',
              textShadow: textGlow
            }}
          >
            INTERIOR
          </h2>

          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
              color: '#00f0ff',
              fontWeight: 600,
              marginBottom: '14px',
              textShadow: textGlow,
              lineHeight: 1.4
            }}
          >
            Bespoke luxury interiors curated with refined materials, custom millwork, and ambient light.
          </div>

          <p
            style={{
              color: '#ffffff',
              fontSize: 'clamp(0.9rem, 1.2vw, 1.02rem)',
              fontWeight: 500,
              lineHeight: 1.65,
              marginBottom: '20px',
              textShadow: textGlow
            }}
          >
            Every interior volume is tailored with tactile finishes, seamless architectural cabinetry, and acoustic tranquility designed for refined modern lifestyle.
          </p>

          {/* Interior Capabilities */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '6px',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.12em', textShadow: textGlow }}>
                [ 01 ] MATERIAL CURATION
              </span>
              <span style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.94rem)', color: '#ffffff', fontWeight: 600, textShadow: textGlow }}>
                Italian Travertine & Fluted Carbon Timber
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '6px',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.12em', textShadow: textGlow }}>
                [ 02 ] ARTISAN MILLWORK
              </span>
              <span style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.94rem)', color: '#ffffff', fontWeight: 600, textShadow: textGlow }}>
                Concealed Architecture & Bespoke Joinery
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '6px',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.12em', textShadow: textGlow }}>
                [ 03 ] LIGHT & HARMONY
              </span>
              <span style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.94rem)', color: '#ffffff', fontWeight: 600, textShadow: textGlow }}>
                Concealed 2700K Perimeter Cove Ambiance
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            3-SCROLL STAGE INDICATOR: 0 · 50 · 100 (Video Finish)
           =================================================================== */}
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(14px, 3vh, 32px)',
            right: 'clamp(14px, 3vw, max(36px, calc((100vw - 1380px) / 2)))',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(6, 7, 10, 0.78)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '6px 14px',
            borderRadius: '40px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)'
          }}
        >
          {[
            { val: 0, label: '0' },
            { val: 50, label: '50' },
            { val: 100, label: '100' }
          ].map((item, idx) => {
            const isActive = activeStage === item.val;
            return (
              <React.Fragment key={item.val}>
                <button
                  type="button"
                  onClick={() => handleScrollToStage(item.val)}
                  title={`Jump to ${item.val}% (${item.val === 100 ? 'Video Finish' : item.val === 50 ? 'Architecture' : 'Overview'})`}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    padding: '4px 6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: isActive ? '#9cdd2e' : '#9ca3af',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.78rem',
                    fontWeight: isActive ? 800 : 600,
                    letterSpacing: '0.12em',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: isActive ? '#9cdd2e' : 'rgba(255, 255, 255, 0.3)',
                      boxShadow: isActive ? '0 0 10px #9cdd2e' : 'none',
                      transition: 'all 0.25s ease'
                    }}
                  />
                  <span>{item.label}</span>
                </button>
                {idx < 2 && (
                  <span
                    style={{
                      width: '14px',
                      height: '1px',
                      backgroundColor: 'rgba(255, 255, 255, 0.18)'
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
