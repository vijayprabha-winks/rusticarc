import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Play, Cpu, ShieldCheck, Gauge } from 'lucide-react';

export default function HeroSection({ onReplayReady }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const badgeRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const visualRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const timelineInstance = useRef(null);

  useGSAP(() => {
    // Ambient floating orbs animation
    gsap.to(orb1Ref.current, {
      x: 60,
      y: 40,
      scale: 1.15,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(orb2Ref.current, {
      x: -50,
      y: -60,
      scale: 1.2,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1
    });

    // Master Hero Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    timelineInstance.current = tl;

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.3 }
    )
    .fromTo(
      '.hero-word',
      { opacity: 0, y: 60, rotateX: 45 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.08 },
      '-=0.4'
    )
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9 },
      '-=0.6'
    )
    .fromTo(
      ctaRef.current?.children || [],
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15 },
      '-=0.6'
    )
    .fromTo(
      statsRef.current?.children || [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
      '-=0.5'
    )
    .fromTo(
      visualRef.current,
      { opacity: 0, scale: 0.85, rotateY: -15 },
      { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: 'back.out(1.4)' },
      '-=0.9'
    );

    if (onReplayReady) {
      onReplayReady(() => tl.restart());
    }
  }, { scope: containerRef });

  const handleConfetti = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 80,
      angle: 60,
      spread: 80,
      origin: { x, y },
      colors: ['#00f0ff', '#7000ff', '#00ff88', '#ff007f', '#ffffff']
    });

    confetti({
      particleCount: 80,
      angle: 120,
      spread: 80,
      origin: { x, y },
      colors: ['#00f0ff', '#7000ff', '#00ff88', '#ff007f', '#ffffff']
    });
  };

  const scrollToScrollTrigger = () => {
    const target = document.getElementById('scroll-showcase');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleWords = ['Modern', 'House', 'Elevations', '&', 'Façades'];

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '140px 24px 80px',
        overflow: 'hidden'
      }}
    >
      {/* Background Ambient Orbs */}
      <div
        ref={orb1Ref}
        className="ambient-glow glow-cyan"
        style={{ top: '15%', left: '10%' }}
      />
      <div
        ref={orb2Ref}
        className="ambient-glow glow-violet"
        style={{ top: '30%', right: '12%' }}
      />
      <div
        className="ambient-glow glow-pink"
        style={{ bottom: '10%', left: '40%' }}
      />

      <div className="container" style={{ textAlign: 'center', maxWidth: '1040px' }}>
        {/* Neon Badge */}
        <div style={{ display: 'inline-block', marginBottom: '24px' }}>
          <div ref={badgeRef} className="badge-pulse">
            <span className="dot" />
            <span>3D House Elevation & Façade Architecture Studio</span>
          </div>
        </div>

        {/* Staggered Kinetic Headline */}
        <h1
          ref={titleRef}
          style={{
            fontSize: 'clamp(2.5rem, 6.5vw, 5.2rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            marginBottom: '24px',
            perspective: '1000px'
          }}
        >
          {titleWords.map((word, i) => (
            <span
              key={i}
              className={`hero-word ${
                word === 'Elevations'
                  ? 'text-gradient-aurora'
                  : word === 'Façades'
                  ? 'text-gradient-cyan'
                  : ''
              }`}
              style={{
                display: 'inline-block',
                marginRight: '0.3em',
                transformOrigin: 'bottom center'
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            color: 'var(--text-secondary)',
            maxWidth: '740px',
            margin: '0 auto 40px',
            lineHeight: 1.6
          }}
        >
          Experience bespoke residential house elevations, exterior architectural detailing, and dynamic 3D façade visualization tailored for luxury modern homes.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '18px',
            flexWrap: 'wrap',
            marginBottom: '64px'
          }}
        >
          <button onClick={scrollToScrollTrigger} className="btn-primary">
            <span>Explore Elevation Designs</span>
            <ArrowRight size={18} />
          </button>

          <button onClick={handleConfetti} className="btn-secondary">
            <Sparkles size={18} color="var(--cyan-400)" />
            <span>Explode Confetti</span>
          </button>
        </div>

        {/* Interactive Holographic GSAP Monitor Card */}
        <div
          ref={visualRef}
          className="glass-panel"
          style={{
            maxWidth: '820px',
            margin: '0 auto 60px',
            padding: '24px',
            background: 'rgba(12, 16, 26, 0.7)',
            borderRadius: '24px',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginLeft: '12px', fontFamily: 'var(--font-mono)' }}>
                GSAP.timeline().play()
              </span>
            </div>
            <span className="glass-pill" style={{ fontSize: '0.75rem', color: 'var(--cyan-400)' }}>
              Live Interpolation Engine
            </span>
          </div>

          {/* Timeline Visual Track */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', width: '130px', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>
                Track 01: Front Façade
              </span>
              <div style={{ flex: 1, height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    background: 'var(--grad-aurora)',
                    animation: 'timelineSweep 3s infinite ease-in-out'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', width: '130px', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>
                Track 02: 3D Cantilever
              </span>
              <div style={{ flex: 1, height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '15%',
                    bottom: 0,
                    width: '70%',
                    background: 'var(--grad-cyber)',
                    animation: 'timelineSweep 3s infinite ease-in-out 0.4s'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', width: '130px', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>
                Track 03: Modern Villa
              </span>
              <div style={{ flex: 1, height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '30%',
                    bottom: 0,
                    width: '60%',
                    background: 'var(--grad-sunset)',
                    animation: 'timelineSweep 3s infinite ease-in-out 0.8s'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            maxWidth: '880px',
            margin: '0 auto'
          }}
        >
          <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
            <Gauge size={28} color="var(--cyan-400)" style={{ marginBottom: '10px' }} />
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>
              500+
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Modern Elevations Delivered</div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
            <Cpu size={28} color="var(--violet-400)" style={{ marginBottom: '10px' }} />
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>
              100%
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>3D Architectural Accuracy</div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
            <ShieldCheck size={28} color="var(--lime-400)" style={{ marginBottom: '10px' }} />
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>
              4K Ultra
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Photorealistic Façade Renders</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes timelineSweep {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
