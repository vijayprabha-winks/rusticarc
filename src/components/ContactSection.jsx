import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Send, 
  MessageSquare,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Authentic WhatsApp Vector Icon (Official speech bubble with 45° angled telephone handset)
function WhatsAppIcon({ size = 20, color = 'currentColor', style = {} }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 448 512" 
      fill={color} 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const formCardRef = useRef(null);
  const contactCardRef = useRef(null);
  const scriptTextRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential Villa',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // WhatsApp number specified by user
  const WHATSAPP_NUMBER = '7825915899';

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Direct WhatsApp Message Submission
  const handleSendMessage = (e) => {
    e.preventDefault();

    const nameText = formData.name.trim() || 'Client';
    const emailText = formData.email.trim() || 'Not specified';
    const phoneText = formData.phone.trim() || 'Not specified';
    const typeText = formData.projectType || 'Architectural Project';
    const msgText = formData.message.trim() || 'I am interested in designing and building an architectural project with Rustic Arc.';

    // Construct clean, formatted pre-filled WhatsApp message
    const formattedText = 
      `*New Architectural Inquiry — Rustic Arc*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Name:* ${nameText}\n` +
      `📧 *Email:* ${emailText}\n` +
      `📱 *Phone:* ${phoneText}\n` +
      `🏛️ *Project Type:* ${typeText}\n\n` +
      `💬 *Vision / Scope:*\n${msgText}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Sent via Rustic Arc Atelier Portal`;

    const encodedMsg = encodeURIComponent(formattedText);
    const waUrl = `https://wa.me/91${WHATSAPP_NUMBER}?text=${encodedMsg}`;

    setIsSubmitted(true);
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      setIsSubmitted(false);
    }, 400);
  };

  // Direct quick WhatsApp link
  const handleQuickWhatsApp = () => {
    const quickMsg = encodeURIComponent(
      `Hello Rustic Arc! 👋 I would like to consult with your architectural atelier regarding a new design & build project.`
    );
    window.open(`https://wa.me/91${WHATSAPP_NUMBER}?text=${quickMsg}`, '_blank', 'noopener,noreferrer');
  };

  // GSAP Animations Engine
  useGSAP(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    // Refresh ScrollTrigger to calculate exact DOM offsets
    ScrollTrigger.refresh();

    // 1. Kinetic Headline & Subtitle Stagger (triggers as soon as Contact section enters 80% viewport)
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    const words = headlineRef.current?.querySelectorAll('.headline-line');
    if (words && words.length > 0) {
      headerTl.fromTo(
        words,
        { opacity: 0, y: 60, rotateX: 16 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out'
        }
      );
    }

    headerTl
      .fromTo(
        '.contact-subtitle',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        '.contact-top-right-quote',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      );

    // 2. Floating Script Calligraphy text entrance & continuous floating
    if (scriptTextRef.current) {
      gsap.fromTo(
        scriptTextRef.current,
        { opacity: 0, scale: 0.85, rotate: -5 },
        {
          opacity: 0.85,
          scale: 1,
          rotate: -2,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.to(scriptTextRef.current, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: 'sine.inOut'
      });
    }

    // 3. Dual-Card Slide-In Entrance
    // Left white card slides in from left, Right dark card from right
    if (formCardRef.current && contactCardRef.current) {
      const cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: formCardRef.current,
          start: 'top bottom-=40px',
          toggleActions: 'play none none reverse'
        }
      });

      cardsTl
        .fromTo(
          formCardRef.current,
          { opacity: 0, x: -50, y: 30 },
          { opacity: 1, x: 0, y: 0, duration: 0.75, ease: 'power3.out' }
        )
        .fromTo(
          contactCardRef.current,
          { opacity: 0, x: 50, y: 30 },
          { opacity: 1, x: 0, y: 0, duration: 0.75, ease: 'power3.out' },
          '-=0.55'
        );

      // Stagger input fields inside form
      const formFields = formCardRef.current.querySelectorAll('.contact-form-field');
      if (formFields.length > 0) {
        cardsTl.fromTo(
          formFields,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power3.out' },
          '-=0.5'
        );
      }

      // Contact row items stagger inside the right card
      const rows = contactCardRef.current.querySelectorAll('.contact-item-row');
      const icons = contactCardRef.current.querySelectorAll('.contact-icon-circle');

      cardsTl
        .fromTo(
          rows,
          { opacity: 0, x: 25 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          icons,
          { scale: 0.4, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.45, stagger: 0.08, ease: 'back.out(2)' },
          '-=0.5'
        );
    }
  }, { scope: sectionRef });

  return (
    <section
      id="contact"
      data-section="contact"
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        color: '#111215',
        padding: 'clamp(60px, 8vw, 120px) clamp(16px, 3vw, 24px) clamp(50px, 7vw, 100px)',
        overflow: 'hidden',
        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif"
      }}
    >
      {/* Background Architectural Grid Lines & Subtle Ambient Gradients */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(202, 183, 150, 0.4) 50%, transparent 100%)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '5%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(202, 183, 150, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div
        style={{
          maxWidth: '1380px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* ===================================================================
            HERO SECTION HEADER (Matches Reference Image Layout)
           =================================================================== */}
        <div className="contact-header-grid">
          {/* Left Hero Title Column */}
          <div
            ref={headlineRef}
            style={{
              gridColumn: 'span 7'
            }}
          >
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontSize: 'clamp(2.8rem, 6.2vw, 5.2rem)',
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: '-0.035em',
                color: '#111215',
                textTransform: 'uppercase',
                margin: '0 0 24px 0'
              }}
            >
              <div className="headline-line" style={{ display: 'block' }}>
                LET'S BUILD
              </div>
              <div className="headline-line" style={{ display: 'block' }}>
                SOMETHING
              </div>
              <div
                className="headline-line"
                style={{
                  display: 'block',
                  color: '#CAB796',
                  textShadow: '0 0 35px rgba(202, 183, 150, 0.25)'
                }}
              >
                THAT MOVES.
              </div>
            </h1>

            <p
              className="contact-subtitle"
              style={{
                fontSize: 'clamp(1.05rem, 1.4vw, 1.22rem)',
                lineHeight: 1.65,
                color: '#4b5563',
                maxWidth: '560px',
                fontWeight: 500,
                margin: 0
              }}
            >
              Turn your architectural ideas into measurable reality. We're here to listen, collaborate and create what's next for your space.
            </p>
          </div>

          {/* Right Column: Outline Script + Editorial Quote */}
          <div
            style={{
              gridColumn: 'span 5',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              position: 'relative',
              minHeight: '260px'
            }}
          >
            {/* Top Right Monospaced Architectural Statement */}
            <div
              className="contact-top-right-quote"
              style={{
                textAlign: 'right',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: '0.14em',
                fontSize: '0.92rem',
                fontWeight: 700,
                color: '#6b7280',
                lineHeight: 1.6,
                textTransform: 'uppercase'
              }}
            >
              <div>MORE</div>
              <div>THAN</div>
              <div>ARCHITECTURE.</div>
              <div>A BOLDER</div>
              <div>TOMORROW.</div>
              <div
                style={{
                  width: '42px',
                  height: '3px',
                  background: '#CAB796',
                  marginLeft: 'auto',
                  marginTop: '12px'
                }}
              />
            </div>

            {/* Floating Outline Script Calligraphy (Matches Reference "Ideas People Growth") */}
            <div
              ref={scriptTextRef}
              style={{
                position: 'absolute',
                top: '40px',
                left: '-10px',
                fontFamily: "'Cormorant Garamond', 'Brush Script MT', cursive, Georgia, serif",
                fontStyle: 'italic',
                fontSize: 'clamp(2.4rem, 4.4vw, 4.4rem)',
                color: 'transparent',
                WebkitTextStroke: '1.5px #CAB796',
                lineHeight: 1.05,
                pointerEvents: 'none',
                userSelect: 'none',
                transform: 'rotate(-3deg)'
              }}
            >
              <div>Ideas</div>
              <div style={{ paddingLeft: '35px' }}>People</div>
              <div style={{ paddingLeft: '70px' }}>Growth</div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            DUAL-CARD LAYOUT: Left (White Form Card) | Right (Dark Contact Card)
           =================================================================== */}
        <div className="contact-cards-grid">
          {/* =================================================================
              LEFT COLUMN: WHITE INTERACTIVE MESSAGE CARD (SEND US A MESSAGE)
             ================================================================= */}
          <div
            ref={formCardRef}
            style={{
              gridColumn: 'span 7',
              backgroundColor: '#FFFFFF',
              borderRadius: '28px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.05)',
              padding: 'clamp(24px, 5vw, 44px) clamp(18px, 4vw, 48px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 2
            }}
          >
            {/* Card Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '28px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                marginBottom: '32px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    letterSpacing: '0.16em',
                    color: '#111215',
                    textTransform: 'uppercase'
                  }}
                >
                  SEND US A MESSAGE
                </span>
                <span style={{ width: '42px', height: '3px', background: '#CAB796', borderRadius: '2px' }} />
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#9ca3af',
                  textTransform: 'uppercase'
                }}
              >
                WE'RE READY WHEN YOU ARE
              </span>
            </div>

            {/* Interactive Form with Direct WhatsApp Dispatch */}
            <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Field: Name */}
              <div className="contact-form-field">
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: '#111215',
                    marginBottom: '8px'
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '14px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                    fontSize: '0.96rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'all 0.25s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#CAB796';
                    e.target.style.backgroundColor = '#ffffff';
                    e.target.style.boxShadow = '0 0 0 4px rgba(202, 183, 150, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                    e.target.style.backgroundColor = '#f8fafc';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Row: Work Email & Phone Number */}
              <div className="contact-form-field" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      color: '#111215',
                      marginBottom: '8px'
                    }}
                  >
                    Work Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '14px',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      backgroundColor: '#f8fafc',
                      color: '#0f172a',
                      fontSize: '0.96rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      transition: 'all 0.25s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#CAB796';
                      e.target.style.backgroundColor = '#ffffff';
                      e.target.style.boxShadow = '0 0 0 4px rgba(202, 183, 150, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                      e.target.style.backgroundColor = '#f8fafc';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      color: '#111215',
                      marginBottom: '8px'
                    }}
                  >
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '14px',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      backgroundColor: '#f8fafc',
                      color: '#0f172a',
                      fontSize: '0.96rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      transition: 'all 0.25s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#CAB796';
                      e.target.style.backgroundColor = '#ffffff';
                      e.target.style.boxShadow = '0 0 0 4px rgba(202, 183, 150, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                      e.target.style.backgroundColor = '#f8fafc';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Field: Project Scope / Type */}
              <div className="contact-form-field">
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: '#111215',
                    marginBottom: '8px'
                  }}
                >
                  Project Scope
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '14px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                    fontSize: '0.96rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'all 0.25s ease',
                    boxSizing: 'border-box',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#CAB796';
                    e.target.style.backgroundColor = '#ffffff';
                    e.target.style.boxShadow = '0 0 0 4px rgba(202, 183, 150, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                    e.target.style.backgroundColor = '#f8fafc';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="Residential Luxury Villa">Residential Luxury Villa</option>
                  <option value="Commercial Landmark / HQ">Commercial Landmark / HQ</option>
                  <option value="Bespoke Interior Architecture">Bespoke Interior Architecture</option>
                  <option value="Turnkey Architectural Build">Turnkey Architectural Build</option>
                  <option value="Parametric Façade Elevation">Parametric Façade Elevation</option>
                </select>
              </div>

              {/* Field: Message / Vision */}
              <div className="contact-form-field">
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: '#111215',
                    marginBottom: '8px'
                  }}
                >
                  What can we build together?
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your architectural vision, site location, timeline..."
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '14px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                    fontSize: '0.96rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'all 0.25s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#CAB796';
                    e.target.style.backgroundColor = '#ffffff';
                    e.target.style.boxShadow = '0 0 0 4px rgba(202, 183, 150, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                    e.target.style.backgroundColor = '#f8fafc';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Submit Button: Direct WhatsApp Action */}
              <div className="contact-form-field" style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  type="submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: '#CAB796',
                    color: '#06070a',
                    padding: '18px 36px',
                    borderRadius: '40px',
                    fontSize: '0.98rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-display, inherit)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(202, 183, 150, 0.45)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(202, 183, 150, 0.65)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(202, 183, 150, 0.45)';
                  }}
                >
                  <WhatsAppIcon size={20} color="#06070a" />
                  <span>{isSubmitted ? 'Opening WhatsApp...' : 'Send Message to WhatsApp'}</span>
                  <ArrowRight size={18} color="#06070a" />
                </button>

                <span style={{ fontSize: '0.84rem', color: '#64748b', fontWeight: 500 }}>
                  ⚡ Direct response to WhatsApp <strong style={{ color: '#0f172a' }}>+91 {WHATSAPP_NUMBER}</strong>
                </span>
              </div>
            </form>
          </div>

          {/* =================================================================
              RIGHT COLUMN: SLEEK DARK CARBON CARD (GET IN TOUCH)
             ================================================================= */}
          <div
            ref={contactCardRef}
            style={{
              gridColumn: 'span 5',
              backgroundColor: '#0a0d14',
              borderRadius: '28px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
              padding: 'clamp(24px, 5vw, 44px) clamp(18px, 4vw, 40px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              color: '#ffffff',
              position: 'relative',
              zIndex: 2
            }}
          >
            {/* Card Top Header */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  marginBottom: '36px',
                  paddingBottom: '24px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    letterSpacing: '0.18em',
                    color: '#ffffff',
                    textTransform: 'uppercase'
                  }}
                >
                  GET IN TOUCH
                </span>
                <span style={{ width: '42px', height: '3px', background: '#CAB796', borderRadius: '2px' }} />
              </div>

              {/* Contact Rows List with Logo Brown Circular Icons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {/* 1. Email */}
                <a
                  href="mailto:rusticarc.atelier@gmail.com"
                  className="contact-item-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: '8px 0',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    const circle = e.currentTarget.querySelector('.arrow-circle');
                    if (circle) circle.style.transform = 'rotate(-45deg)';
                  }}
                  onMouseLeave={(e) => {
                    const circle = e.currentTarget.querySelector('.arrow-circle');
                    if (circle) circle.style.transform = 'rotate(0deg)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                    {/* Logo Brown Circular Icon Button */}
                    <div
                      className="contact-icon-circle"
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        backgroundColor: '#CAB796',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 25px rgba(202, 183, 150, 0.4)',
                        flexShrink: 0
                      }}
                    >
                      <Mail size={22} color="#06070a" />
                    </div>

                    <div>
                      <div style={{ fontSize: '0.82rem', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '2px' }}>
                        Email
                      </div>
                      <div style={{ fontSize: '1.02rem', color: '#ffffff', fontWeight: 700 }}>
                        rusticarc.atelier@gmail.com
                      </div>
                    </div>
                  </div>

                  {/* Circular Arrow */}
                  <div
                    className="arrow-circle"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0
                    }}
                  >
                    <ArrowRight size={16} color="#ffffff" />
                  </div>
                </a>

                {/* 2. Phone / WhatsApp (Direct WhatsApp Link with User's Number) */}
                <div
                  onClick={handleQuickWhatsApp}
                  className="contact-item-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    padding: '8px 0',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    const circle = e.currentTarget.querySelector('.arrow-circle');
                    if (circle) circle.style.transform = 'rotate(-45deg)';
                  }}
                  onMouseLeave={(e) => {
                    const circle = e.currentTarget.querySelector('.arrow-circle');
                    if (circle) circle.style.transform = 'rotate(0deg)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                    <div
                      className="contact-icon-circle"
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        backgroundColor: '#CAB796',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 25px rgba(202, 183, 150, 0.4)',
                        flexShrink: 0
                      }}
                    >
                      <WhatsAppIcon size={24} color="#06070a" />
                    </div>

                    <div>
                      <div style={{ fontSize: '0.82rem', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '2px' }}>
                        Phone / WhatsApp
                      </div>
                      <div style={{ fontSize: '1.02rem', color: '#ffffff', fontWeight: 700 }}>
                        +91 {WHATSAPP_NUMBER}
                      </div>
                    </div>
                  </div>

                  <div
                    className="arrow-circle"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0
                    }}
                  >
                    <ArrowRight size={16} color="#ffffff" />
                  </div>
                </div>

                {/* 3. Studio Location */}
                <div
                  className="contact-item-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px' }}>
                    <div
                      className="contact-icon-circle"
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        backgroundColor: '#CAB796',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 25px rgba(202, 183, 150, 0.4)',
                        flexShrink: 0
                      }}
                    >
                      <MapPin size={22} color="#06070a" />
                    </div>

                    <div>
                      <div style={{ fontSize: '0.82rem', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '2px' }}>
                        Office Location
                      </div>
                      <div style={{ fontSize: '0.96rem', color: '#ffffff', fontWeight: 600, lineHeight: 1.5 }}>
                        51/3, 1st Street, TNagar,<br />Chennai - 600028
                      </div>
                    </div>
                  </div>

                  <div
                    className="arrow-circle"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <ArrowRight size={16} color="#ffffff" />
                  </div>
                </div>

                {/* 4. Availability */}
                <div
                  className="contact-item-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px' }}>
                    <div
                      className="contact-icon-circle"
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        backgroundColor: '#CAB796',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 25px rgba(202, 183, 150, 0.4)',
                        flexShrink: 0
                      }}
                    >
                      <Clock size={22} color="#06070a" />
                    </div>

                    <div>
                      <div style={{ fontSize: '0.82rem', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '2px' }}>
                        Availability
                      </div>
                      <div style={{ fontSize: '0.96rem', color: '#ffffff', fontWeight: 600, lineHeight: 1.5 }}>
                        Mon – Sat<br />10:00 AM – 7:00 PM (IST)
                      </div>
                    </div>
                  </div>

                  <div
                    className="arrow-circle"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <ArrowRight size={16} color="#ffffff" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card Footer Guarantee */}
            <div
              style={{
                marginTop: '36px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.82rem',
                color: '#9ca3af'
              }}
            >
              <CheckCircle2 size={16} color="#CAB796" />
              <span>Turnkey Architecture, Interior & Construction Atelier</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
