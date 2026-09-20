import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Move, Sparkles, Box, RefreshCw, Layers, Compass, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const animationModes = [
  { id: 'spring', label: 'Spring Physics', desc: 'Real mass, stiffness, and damping calculations.' },
  { id: 'elastic', label: 'Elastic Bounce', desc: 'Overdamped and oscillatory elastic responses.' },
  { id: 'snappy', label: 'Kinetic Snappy', desc: 'Ultra-fast bezier curve designed for snappy UI feedback.' },
  { id: 'subtle', label: 'Subtle Fluidity', desc: 'Gentle deceleration curve for non-intrusive micro-actions.' }
];

export default function MotionPlayground() {
  const [activeTab, setActiveTab] = useState('spring');
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const dragConstraintsRef = useRef(null);

  // 3D Tilt calculation
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -16;
    const rotateY = ((x - centerX) / centerX) * 16;

    setTiltStyle({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({ rotateX: 0, rotateY: 0 });
  };

  const handleBoxDrop = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      colors: ['#00f0ff', '#7000ff']
    });
  };

  return (
    <section
      id="services"
      data-section="services"
      style={{
        position: 'relative',
        padding: '120px 24px',
        background: '#06070a',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-badge-wrap">
          <div className="badge-pulse">
            <span className="dot" />
            <span>Framer Motion Physics & Gestures</span>
          </div>
        </div>

        <h2 className="section-title">
          Declarative <span className="text-gradient-aurora">Spring & Gesture</span> Lab
        </h2>
        <p className="section-subtitle">
          Experience declarative gesture handling, layout animations, and inertia physics. Drag, throw, and interact with the elements below.
        </p>

        {/* Layout Morph Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '48px',
            flexWrap: 'wrap'
          }}
        >
          {animationModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveTab(mode.id)}
              style={{
                position: 'relative',
                background: 'transparent',
                border: 'none',
                padding: '12px 24px',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: activeTab === mode.id ? '#06070a' : 'var(--text-secondary)',
                cursor: 'pointer',
                borderRadius: '30px',
                zIndex: 1,
                transition: 'color 0.2s ease'
              }}
            >
              {activeTab === mode.id && (
                <motion.div
                  layoutId="activePill"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '30px',
                    background: 'var(--grad-cyber)',
                    zIndex: -1,
                    boxShadow: '0 4px 20px rgba(0, 240, 255, 0.4)'
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {mode.label}
            </button>
          ))}
        </div>

        {/* Interactive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '32px'
          }}
        >
          {/* Card 1: Drag-to-Throw Physics Arena */}
          <div
            className="glass-panel"
            style={{
              padding: '36px',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '440px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Move size={20} color="var(--cyan-400)" />
                <h3 style={{ fontSize: '1.3rem' }}>Drag & Throw Arena</h3>
              </div>
              <span className="glass-pill" style={{ fontSize: '0.75rem' }}>
                Inertia Physics
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '20px' }}>
              Grab the orb below and fling it. It respects boundary constraints and bounces with realistic momentum.
            </p>

            {/* Arena Bounds */}
            <div
              ref={dragConstraintsRef}
              style={{
                flex: 1,
                background: 'rgba(0, 0, 0, 0.4)',
                border: '2px dashed rgba(0, 240, 255, 0.25)',
                borderRadius: '18px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <motion.div
                drag
                dragConstraints={dragConstraintsRef}
                dragElastic={0.2}
                dragTransition={{ bounceStiffness: 400, bounceDamping: 18 }}
                whileHover={{ scale: 1.1, cursor: 'grab' }}
                whileTap={{ scale: 0.95, cursor: 'grabbing' }}
                onDragEnd={handleBoxDrop}
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '24px',
                  background: 'var(--grad-aurora)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(0, 240, 255, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.4)',
                  userSelect: 'none'
                }}
              >
                <Box size={36} color="#fff" />
              </motion.div>
            </div>
          </div>

          {/* Card 2: 3D Holographic Tilt Card */}
          <div
            className="glass-panel"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              padding: '36px',
              borderRadius: '24px',
              perspective: '1000px',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '440px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Layers size={20} color="var(--violet-400)" />
                <h3 style={{ fontSize: '1.3rem' }}>3D Parallax Tilt</h3>
              </div>
              <span className="glass-pill" style={{ fontSize: '0.75rem' }}>
                Gyroscope Specular
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '20px' }}>
              Hover and move your mouse to tilt this holographic credit in 3D space with specular dynamic sheen.
            </p>

            <motion.div
              animate={{
                rotateX: tiltStyle.rotateX,
                rotateY: tiltStyle.rotateY,
                scale: isHovered ? 1.03 : 1
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                flex: 1,
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(112,0,255,0.2) 0%, rgba(255,0,127,0.15) 100%)',
                border: '1px solid rgba(138, 43, 226, 0.4)',
                boxShadow: isHovered ? '0 25px 50px rgba(112, 0, 255, 0.35)' : '0 10px 30px rgba(0,0,0,0.5)',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Dynamic Glare Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at ${50 + tiltStyle.rotateY * 3}% ${50 - tiltStyle.rotateX * 3}%, rgba(255, 255, 255, 0.15), transparent 70%)`,
                  pointerEvents: 'none'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--pink-400)', fontWeight: 700, letterSpacing: '0.1em' }}>
                  HOLOGRAPHIC CHIP
                </span>
                <Sparkles size={20} color="var(--pink-400)" />
              </div>

              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                  Spatial React Matrix
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  Tilt X: {tiltStyle.rotateX.toFixed(1)}° | Tilt Y: {tiltStyle.rotateY.toFixed(1)}°
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={16} color="var(--lime-400)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--lime-400)' }}>Active 3D Gyroscope</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
