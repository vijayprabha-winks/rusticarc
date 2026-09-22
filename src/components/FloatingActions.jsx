import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

// Official Authentic WhatsApp Vector Icon (Speech Bubble with Telephone Handset)
function AuthenticWhatsAppIcon({ size = 28, color = '#FFFFFF' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: 'block' }}
    >
      {/* Outer speech bubble shape */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.04 2C6.54 2 2.08 6.46 2.08 11.96c0 1.8.48 3.51 1.33 5.01L2 22l5.17-1.36a9.92 9.92 0 0 0 4.87 1.27h.01c5.5 0 9.96-4.46 9.96-9.96A9.92 9.92 0 0 0 12.04 2zm0 18.06h-.01c-1.57 0-3.1-.42-4.43-1.22l-.32-.19-3.29.86.88-3.21-.21-.33a8.1 8.1 0 0 1-1.25-4.21c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.77 2.39a8.1 8.1 0 0 1 2.39 5.77c0 4.51-3.66 8.16-8.16 8.16z"
        fill={color}
      />
      {/* Inner telephone handset */}
      <path
        d="M17.472 14.382c-.301-.15-1.782-.88-2.059-.98-.276-.101-.477-.15-.678.15-.2.3-.777.98-.953 1.18-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.502.101-.2.05-.376-.025-.526-.076-.151-.678-1.633-.929-2.236-.244-.588-.493-.508-.678-.518l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.079 2.912 1.23 3.113c.15.201 2.124 3.243 5.145 4.549.719.31 1.28.496 1.718.636.722.23 1.378.197 1.9-.12.58-.352 1.782-1.28 2.033-1.933.251-.653.251-1.21.176-1.325-.076-.115-.276-.19-.577-.34z"
        fill={color}
      />
    </svg>
  );
}

export default function FloatingActions({ onOpenEstimator }) {
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const WHATSAPP_URL =
    'https://wa.me/917825915899?text=Hello%20Rustic%20Arc!%20I%20would%20like%20to%20consult%20regarding%20an%20architectural%20project.';

  return (
    <aside
      aria-label="Quick Actions"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '14px',
        pointerEvents: 'none'
      }}
    >
      {/* 1. Building Estimation Calculator Floating Action Button */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'auto'
        }}
      >
        {/* Continuous Glowing Radar Ripple Waves */}
        <span
          className="cost-ripple-wave cost-ripple-1"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            pointerEvents: 'none',
            border: '2px solid rgba(202, 183, 150, 0.75)',
            boxShadow: '0 0 18px rgba(202, 183, 150, 0.5)',
            animation: 'costPulseWave 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite'
          }}
        />
        <span
          className="cost-ripple-wave cost-ripple-2"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            pointerEvents: 'none',
            border: '1.5px solid rgba(247, 231, 206, 0.65)',
            boxShadow: '0 0 24px rgba(202, 183, 150, 0.4)',
            animation: 'costPulseWave 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite 1.2s'
          }}
        />

        {/* Hover Tooltip Pill */}
        <span
          style={{
            position: 'absolute',
            right: '66px',
            backgroundColor: 'rgba(10, 13, 20, 0.94)',
            color: '#CAB796',
            border: '1px solid rgba(202, 183, 150, 0.35)',
            padding: '7px 14px',
            borderRadius: '24px',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.74rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 14px rgba(202, 183, 150, 0.25)',
            pointerEvents: 'none',
            opacity: hoveredBtn === 'estimator' ? 1 : 0,
            transform: hoveredBtn === 'estimator' ? 'translateX(0)' : 'translateX(8px)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          CALCULATE BUILDING ESTIMATE
        </span>

        <button
          type="button"
          onClick={onOpenEstimator}
          onMouseEnter={() => setHoveredBtn('estimator')}
          onMouseLeave={() => setHoveredBtn(null)}
          aria-label="Calculate Building Estimation"
          className="cost-glowing-btn"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#0e1118',
            border: '2px solid #CAB796',
            color: '#CAB796',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            zIndex: 2,
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: hoveredBtn === 'estimator' ? 'scale(1.14) translateY(-2px)' : 'scale(1) translateY(0)',
            animation: 'continuousCostGlow 2.2s ease-in-out infinite'
          }}
        >
          <span
            className="cost-icon-glow"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'continuousCostIconGlow 2.2s ease-in-out infinite'
            }}
          >
            <Calculator size={22} color="#CAB796" strokeWidth={2.3} />
          </span>

          <span
            className="cost-text-glow"
            style={{
              fontSize: '0.54rem',
              fontWeight: 900,
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.08em',
              lineHeight: 1,
              marginTop: '2px',
              color: '#CAB796',
              textTransform: 'uppercase',
              animation: 'continuousCostTextGlow 2.2s ease-in-out infinite'
            }}
          >
            COST
          </span>

          {/* Pulse notification badge */}
          <span
            style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#f5deb3',
              border: '2px solid #06070a',
              boxShadow: '0 0 10px #CAB796, 0 0 16px rgba(202, 183, 150, 0.8)',
              animation: 'costBadgePing 1.8s ease-in-out infinite'
            }}
          />
        </button>
      </div>

      {/* Global Embedded Styles for Continuous Glow Keyframes */}
      <style>{`
        @keyframes continuousCostGlow {
          0%, 100% {
            box-shadow: 0 0 12px rgba(202, 183, 150, 0.4), 0 0 24px rgba(202, 183, 150, 0.2), 0 8px 24px rgba(0, 0, 0, 0.6);
            border-color: rgba(202, 183, 150, 0.85);
          }
          50% {
            box-shadow: 0 0 28px rgba(202, 183, 150, 0.95), 0 0 54px rgba(202, 183, 150, 0.6), 0 0 80px rgba(202, 183, 150, 0.35), 0 10px 30px rgba(0, 0, 0, 0.8);
            border-color: #fff1d6;
          }
        }

        @keyframes continuousCostIconGlow {
          0%, 100% {
            filter: drop-shadow(0 0 2px rgba(202, 183, 150, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(255, 241, 214, 0.95)) drop-shadow(0 0 14px rgba(202, 183, 150, 0.8));
          }
        }

        @keyframes continuousCostTextGlow {
          0%, 100% {
            color: #CAB796;
            text-shadow: 0 0 4px rgba(202, 183, 150, 0.5);
          }
          50% {
            color: #ffffff;
            text-shadow: 0 0 10px rgba(255, 241, 214, 1), 0 0 18px rgba(202, 183, 150, 0.9);
          }
        }

        @keyframes costPulseWave {
          0% {
            transform: scale(0.95);
            opacity: 0.9;
          }
          60% {
            opacity: 0.35;
          }
          100% {
            transform: scale(1.68);
            opacity: 0;
          }
        }

        @keyframes costBadgePing {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 8px #CAB796;
          }
          50% {
            transform: scale(1.3);
            box-shadow: 0 0 16px #f7e7ce, 0 0 24px rgba(202, 183, 150, 0.9);
          }
        }
      `}</style>

      {/* 2. Authentic WhatsApp Floating Action Button */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'auto'
        }}
      >
        {/* Hover Tooltip Pill */}
        <span
          style={{
            position: 'absolute',
            right: '66px',
            backgroundColor: 'rgba(10, 13, 20, 0.94)',
            color: '#25D366',
            border: '1px solid rgba(37, 211, 102, 0.3)',
            padding: '7px 14px',
            borderRadius: '24px',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.74rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            pointerEvents: 'none',
            opacity: hoveredBtn === 'whatsapp' ? 1 : 0,
            transform: hoveredBtn === 'whatsapp' ? 'translateX(0)' : 'translateX(8px)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          CHAT ON WHATSAPP (+91 78259 15899)
        </span>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredBtn('whatsapp')}
          onMouseLeave={() => setHoveredBtn(null)}
          aria-label="Direct Chat on WhatsApp"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#25D366',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            textDecoration: 'none',
            boxShadow: '0 8px 28px rgba(37, 211, 102, 0.5), 0 0 12px rgba(37, 211, 102, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: hoveredBtn === 'whatsapp' ? 'scale(1.12) translateY(-2px)' : 'scale(1) translateY(0)'
          }}
        >
          <AuthenticWhatsAppIcon size={30} color="#FFFFFF" />
        </a>
      </div>
    </aside>
  );
}
