import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Building2, 
  Layers, 
  ArrowUpRight,
  Maximize2,
  Sparkles
} from 'lucide-react';

// Import High-Resolution Project Assets
import residentialVilla1 from '../assets/projects/residential_villa_1.jpg';
import residentialVilla2 from '../assets/projects/residential_villa_2.jpg';
import commercialHq1 from '../assets/projects/commercial_hq_1.jpg';
import archService from '../assets/services/architecture.jpg';
import interiorService from '../assets/services/interior.jpg';
import design3dService from '../assets/services/3d_design.jpg';
import constructionService from '../assets/services/construction.jpg';
import sideAccentService from '../assets/services/side_accent.jpg';

gsap.registerPlugin(ScrollTrigger);

// Curated Project Portfolio Data Schema:
// Image, Location, Type, Scope (Design + Build), Category, and Horizontal Gallery Photos
const projectsData = [
  {
    id: 'residential-1',
    category: 'Residential',
    title: 'The Obsidian Cantilever Villa',
    location: 'Jubilee Hills, Hyderabad',
    type: 'Luxury Cantilevered Residence',
    scope: 'Design + Build',
    area: '9,400 sq.ft.',
    year: '2025',
    accentColor: '#9cdd2e',
    coverImage: residentialVilla1,
    description: 'An architectural tour-de-force featuring an iconic 6-meter concrete cantilever, climate-responsive bronze louvers, and private infinity reflecting pool.',
    photos: [
      {
        url: residentialVilla1,
        title: 'Front Elevation & Cantilever Overhang',
        subtitle: 'Cast-in-situ post-tensioned concrete slab with concealed 2700K perimeter lighting.'
      },
      {
        url: interiorService,
        title: 'Double-Height Atrium & Living Volume',
        subtitle: 'Bookmatched Italian Silver Travertine and fluted carbon timber architectural joinery.'
      },
      {
        url: archService,
        title: 'Dusk Façade & Solar Shading Louvers',
        subtitle: 'Parametric motorized vertical louvers optimizing natural cross-ventilation and privacy.'
      },
      {
        url: design3dService,
        title: 'BIM Elevation & Structural Topology',
        subtitle: 'Millimeter-precision 3D elevation detailing harmonizing engineering and haute aesthetics.'
      }
    ]
  },
  {
    id: 'commercial-1',
    category: 'Commercial',
    title: 'Aethelgard Corporate Headquarters',
    location: 'Cyber City, Hyderabad',
    type: 'Parametric Commercial Tower',
    scope: 'Design + Build',
    area: '48,000 sq.ft.',
    year: '2025',
    accentColor: '#00f0ff',
    coverImage: commercialHq1,
    description: 'A sculptural curved glass architectural landmark featuring double-glazed curtain walls, an illuminated grand marble lobby, and biophilic landscaped water forecourt.',
    photos: [
      {
        url: commercialHq1,
        title: 'Curvilinear Glass Façade & Plaza',
        subtitle: 'Custom curved structural curtain wall with architectural brass solar blades.'
      },
      {
        url: sideAccentService,
        title: 'Executive Boardroom & Double-Glazed Terraces',
        subtitle: 'Acoustic-calibrated glass partitions with integrated ambient lighting and smart louvers.'
      },
      {
        url: archService,
        title: 'Façade Engineering & Kinetic Louvers',
        subtitle: 'High-performance low-emissivity structural glazing achieving exceptional thermal efficiency.'
      },
      {
        url: constructionService,
        title: 'Turnkey Structural Execution & Post-Tensioning',
        subtitle: 'Monolithic reinforced concrete cores built to exacting millimeter tolerance standards.'
      }
    ]
  },
  {
    id: 'residential-2',
    category: 'Residential',
    title: 'Zenith Courtyard Residence',
    location: 'Whitefield, Bangalore',
    type: 'Biophilic Courtyard Villa',
    scope: 'Design + Build',
    area: '7,800 sq.ft.',
    year: '2024',
    accentColor: '#9cdd2e',
    coverImage: residentialVilla2,
    description: 'A contemplative modern dwelling centered around a Japanese zen maple courtyard, raw board-formed concrete walls, and seamless indoor-outdoor transitions.',
    photos: [
      {
        url: residentialVilla2,
        title: 'Zen Central Courtyard & Reflecting Pond',
        subtitle: 'Monolithic board-formed concrete flanking a Japanese maple and basalt stepping stones.'
      },
      {
        url: interiorService,
        title: 'Minimalist Dining & Courtyard Vista',
        subtitle: 'Full-height motorized sliding glass doors opening completely to the garden courtyard.'
      },
      {
        url: design3dService,
        title: 'Volumetric Massing & Spatial Hierarchy',
        subtitle: 'Cross-ventilated volumetric layout maximizing natural sunlight throughout the year.'
      },
      {
        url: residentialVilla1,
        title: 'Nightfall Ambient Glow & Perimeter Cove',
        subtitle: 'Architectural lighting design highlighting natural textures of textured concrete and wood.'
      }
    ]
  },
  {
    id: 'commercial-2',
    category: 'Commercial',
    title: 'Vertex Commercial Business Pavilion',
    location: 'Indiranagar, Bangalore',
    type: 'Boutique Commercial Atelier',
    scope: 'Design + Build',
    area: '22,500 sq.ft.',
    year: '2025',
    accentColor: '#00f0ff',
    coverImage: archService,
    description: 'A boutique commercial office pavilion featuring cantilevered exterior balconies, custom ceramic frit glass shading, and an open-air rooftop pavilion.',
    photos: [
      {
        url: archService,
        title: 'Cantilevered Pavilion Elevation',
        subtitle: 'Sculptural architectural volume with floating balconies and recessed lighting.'
      },
      {
        url: commercialHq1,
        title: 'Grand Entrance & Reflection Forecourt',
        subtitle: 'Dramatic illuminated portico welcoming clients into high-end retail and corporate suites.'
      },
      {
        url: interiorService,
        title: 'Bespoke Executive Suites & Lounges',
        subtitle: 'Warm architectural timber paneling with hidden storage and acoustic baffles.'
      },
      {
        url: constructionService,
        title: 'Master Turnkey Execution & Finishing',
        subtitle: 'Complete architectural shell, MEP integration, and bespoke artisanal interior fitting.'
      }
    ]
  },
  {
    id: 'residential-3',
    category: 'Residential',
    title: 'Aura Modernist Glasshouse',
    location: 'Boat Club Road, Chennai',
    type: 'Sculptural Contemporary Villa',
    scope: 'Design + Build',
    area: '11,200 sq.ft.',
    year: '2025',
    accentColor: '#9cdd2e',
    coverImage: design3dService,
    description: 'An expansive coastal modern luxury residence sculpted with floating slab balconies, recessed ocean-facing glass walls, and lush vertical garden screens.',
    photos: [
      {
        url: design3dService,
        title: 'Floating Terrace Façade Architecture',
        subtitle: 'Cantilevered balconies offering panoramic garden and sky vistas.'
      },
      {
        url: residentialVilla1,
        title: 'Evening Illumination & Pool Terrace',
        subtitle: 'Integrated underwater LED lighting synchronized with architectural perimeter cove.'
      },
      {
        url: interiorService,
        title: 'Master Suite & Travertine Bath',
        subtitle: 'Italian marble slab vanities with concealed architectural fittings and walk-in wardrobe.'
      },
      {
        url: residentialVilla2,
        title: 'Private Courtyard Sanctuary',
        subtitle: 'Acoustic tranquility insulated by thick monolithic architectural walls.'
      }
    ]
  },
  {
    id: 'commercial-3',
    category: 'Commercial',
    title: 'Nexus Innovation Hub',
    location: 'OMR Tech Corridor, Chennai',
    type: 'Mixed-Use Commercial Landmark',
    scope: 'Design + Build',
    area: '62,000 sq.ft.',
    year: '2024',
    accentColor: '#00f0ff',
    coverImage: constructionService,
    description: 'A multi-tier corporate and research complex constructed with structural steel trusses, modular open-span floor plates, and high-efficiency solar façade shading.',
    photos: [
      {
        url: constructionService,
        title: 'Structural Steel & Precision Engineering',
        subtitle: 'Heavy-duty steel truss assembly creating column-free collaborative workspace spans.'
      },
      {
        url: commercialHq1,
        title: 'Façade Curtain Wall & Atrium Glazing',
        subtitle: 'Solar-control glass filtering infrared heat while providing abundant daylighting.'
      },
      {
        url: archService,
        title: 'Exterior Volume & Pedestrian Boulevard',
        subtitle: 'Integrated urban landscaping, drought-tolerant flora, and permeable stone paving.'
      },
      {
        url: sideAccentService,
        title: 'Conference Center & Amphitheater',
        subtitle: 'State-of-the-art acoustic paneling, curved seating, and integrated presentation tech.'
      }
    ]
  }
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const savedScrollPos = useRef(0);

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Gallery Animation References
  const galleryModalRef = useRef(null);
  const photoContainerRef = useRef(null);
  const activePhotoImgRef = useRef(null);
  const captionRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const touchStartXRef = useRef(0);

  // Filtered projects list
  const filteredProjects = activeCategory === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === activeCategory);

  // Lock and freeze page scroll when gallery modal opens, without resetting scroll position
  useEffect(() => {
    if (selectedProject) {
      // Record exact scroll position
      savedScrollPos.current = window.scrollY;

      // Stop Lenis smoothly so background doesn't move
      if (window.__lenis) {
        window.__lenis.stop();
      }
    } else {
      // Restore Lenis and ensure position stays locked on projects section
      if (window.__lenis) {
        window.__lenis.start();
        if (savedScrollPos.current > 0) {
          window.__lenis.scrollTo(savedScrollPos.current, { immediate: true });
        }
      }
      if (savedScrollPos.current > 0) {
        window.scrollTo(0, savedScrollPos.current);
      }
    }
  }, [selectedProject]);

  // 1. GSAP ScrollTrigger Entrance Animation for Section Header
  useGSAP(() => {
    if (!headerRef.current) return;

    const badge = headerRef.current.querySelector('.project-header-badge');
    const title = headerRef.current.querySelector('.project-header-title');
    const subtitle = headerRef.current.querySelector('.project-header-subtitle');
    const filterPills = headerRef.current.querySelector('.project-filter-pills');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    tl.fromTo(badge, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo(title, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .fromTo(subtitle, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .fromTo(filterPills, { opacity: 0, scale: 0.9, y: 15 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' }, '-=0.5');

  }, { scope: sectionRef });

  // 2. GSAP Entrance Animation for Project Cards when section enters or category changes
  useGSAP(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      {
        opacity: 0,
        y: 45,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: sectionRef, dependencies: [activeCategory] });

  // Category change with GSAP stagger transition
  const handleCategoryChange = (cat) => {
    if (cat === activeCategory) return;
    
    // Animate out existing cards before switching state
    if (gridRef.current) {
      gsap.to(gridRef.current.children, {
        opacity: 0,
        y: 20,
        scale: 0.97,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setActiveCategory(cat);
        }
      });
    } else {
      setActiveCategory(cat);
    }
  };

  // Open Project Horizontal Photo Gallery
  const handleOpenProject = (project) => {
    savedScrollPos.current = window.scrollY;
    setSelectedProject(project);
    setCurrentPhotoIndex(0);
    isTransitioningRef.current = false;
  };

  // Animate gallery modal entrance with GSAP
  useEffect(() => {
    if (selectedProject && galleryModalRef.current) {
      gsap.fromTo(
        galleryModalRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
      );

      if (activePhotoImgRef.current) {
        gsap.fromTo(
          activePhotoImgRef.current,
          { opacity: 0, x: 70, scale: 1.05 },
          { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power3.out', delay: 0.1 }
        );
      }

      if (captionRef.current) {
        gsap.fromTo(
          captionRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.2 }
        );
      }
    }
  }, [selectedProject]);

  // Close Gallery with smooth GSAP exit and lock scroll position at projects section
  const handleCloseProject = useCallback(() => {
    if (!galleryModalRef.current) {
      setSelectedProject(null);
      return;
    }

    gsap.to(galleryModalRef.current, {
      opacity: 0,
      scale: 0.97,
      duration: 0.32,
      ease: 'power2.inOut',
      onComplete: () => {
        setSelectedProject(null);
        setCurrentPhotoIndex(0);

        // Ensure window scroll remains locked on the project section
        const targetPos = savedScrollPos.current;
        if (targetPos > 0) {
          window.scrollTo(0, targetPos);
          if (window.__lenis) {
            window.__lenis.scrollTo(targetPos, { immediate: true });
          }
        }
      }
    });
  }, []);

  // Keyboard navigation for gallery (Escape, Left, Right)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseProject();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToNextPhoto();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrevPhoto();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, currentPhotoIndex, handleCloseProject]);

  // Photo transition: photo fades out & slides to the left, then the next photo comes in
  const animatePhotoTransition = (fromIndex, toIndex, direction = 'next') => {
    if (isTransitioningRef.current || !photoContainerRef.current) return;
    isTransitioningRef.current = true;

    const currentImg = activePhotoImgRef.current;
    if (!currentImg) {
      setCurrentPhotoIndex(toIndex);
      isTransitioningRef.current = false;
      return;
    }

    const exitX = direction === 'next' ? -140 : 140;
    const enterX = direction === 'next' ? 140 : -140;

    // 1. Current photo fades out and slides to the left
    gsap.to(currentImg, {
      opacity: 0,
      x: exitX,
      scale: 0.93,
      duration: 0.42,
      ease: 'power2.in',
      onComplete: () => {
        // 2. Change state to load incoming photo
        setCurrentPhotoIndex(toIndex);

        // 3. Next photo slides in from the right and fades in smoothly
        requestAnimationFrame(() => {
          if (activePhotoImgRef.current) {
            gsap.fromTo(
              activePhotoImgRef.current,
              {
                opacity: 0,
                x: enterX,
                scale: 1.06
              },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.55,
                ease: 'power3.out',
                onComplete: () => {
                  isTransitioningRef.current = false;
                }
              }
            );
          } else {
            isTransitioningRef.current = false;
          }

          // Animate caption text
          if (captionRef.current) {
            gsap.fromTo(
              captionRef.current,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', delay: 0.05 }
            );
          }
        });
      }
    });
  };

  const goToNextPhoto = () => {
    if (!selectedProject || isTransitioningRef.current) return;
    const total = selectedProject.photos.length;
    const next = (currentPhotoIndex + 1) % total;
    animatePhotoTransition(currentPhotoIndex, next, 'next');
  };

  const goToPrevPhoto = () => {
    if (!selectedProject || isTransitioningRef.current) return;
    const total = selectedProject.photos.length;
    const prev = (currentPhotoIndex - 1 + total) % total;
    animatePhotoTransition(currentPhotoIndex, prev, 'prev');
  };

  // Scroll wheel scrubber inside horizontal photo viewer:
  // Scrolling down/right fades current photo to left and loads next photo
  const handleGalleryWheel = (e) => {
    e.stopPropagation();
    if (isTransitioningRef.current) return;
    if (Math.abs(e.deltaY) > 25 || Math.abs(e.deltaX) > 25) {
      if (e.deltaY > 0 || e.deltaX > 0) {
        goToNextPhoto();
      } else {
        goToPrevPhoto();
      }
    }
  };

  // Touch Swipe Handlers for mobile & touchpad
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(diff) > 45) {
      if (diff < 0) {
        goToNextPhoto();
      } else {
        goToPrevPhoto();
      }
    }
  };

  return (
    <section
      id="projects"
      data-section="projects"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#06070a',
        padding: 'clamp(70px, 9vw, 130px) 0 clamp(80px, 10vw, 150px)',
        color: '#ffffff',
        overflow: 'hidden'
      }}
    >
      {/* Background Subtle Architectural Ambient Gradients */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(156, 221, 46, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* ===================================================================
            SECTION HEADER & CATEGORY FILTER TABS
           =================================================================== */}
        <div ref={headerRef} style={{ marginBottom: 'clamp(36px, 5vw, 64px)' }}>
          <div
            className="project-header-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.84rem',
              letterSpacing: '0.16em',
              color: '#9cdd2e'
            }}
          >
            <span style={{ fontWeight: 800 }}>// 04</span>
            <span style={{ width: '32px', height: '1px', background: '#9cdd2e' }} />
            <span style={{ fontWeight: 700 }}>PORTFOLIO OF EXCELLENCE</span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            <div>
              <h2
                className="project-header-title"
                style={{
                  fontFamily: "'Cinzel', 'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  lineHeight: 1.1,
                  marginBottom: '12px'
                }}
              >
                SIGNATURE <span style={{ color: '#9cdd2e' }}>PROJECTS</span>
              </h2>
              <p
                className="project-header-subtitle"
                style={{
                  color: 'rgba(255, 255, 255, 0.72)',
                  fontSize: '1.05rem',
                  maxWidth: '580px',
                  lineHeight: 1.6,
                  margin: 0
                }}
              >
                Explore our turnkey architectural commissions — harmonizing structural vision, bespoke interior artistry, and meticulous execution.
              </p>
            </div>

            {/* Category Filter Pills (Residential & Commercial) */}
            <div
              className="project-filter-pills"
              style={{
                display: 'inline-flex',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '4px',
                borderRadius: '40px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(20px)',
                gap: '4px',
                flexWrap: 'wrap'
              }}
            >
              {['All', 'Residential', 'Commercial'].map((cat) => {
                const isActive = activeCategory === cat;
                const count = cat === 'All' 
                  ? projectsData.length 
                  : projectsData.filter(p => p.category === cat).length;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryChange(cat);
                    }}
                    style={{
                      background: isActive ? '#9cdd2e' : 'transparent',
                      color: isActive ? '#06070a' : '#ffffff',
                      border: 'none',
                      borderRadius: '30px',
                      padding: '10px 22px',
                      fontSize: '0.88rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: isActive ? '0 0 25px rgba(156, 221, 46, 0.45)' : 'none'
                    }}
                  >
                    <span>{cat === 'All' ? 'All Projects' : cat}</span>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '2px 7px',
                        borderRadius: '10px',
                        background: isActive ? 'rgba(6, 7, 10, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                        color: isActive ? '#06070a' : 'rgba(255, 255, 255, 0.8)'
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===================================================================
            PROJECTS SHOWCASE GRID (Image, Location, Type, Scope)
           =================================================================== */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(20px, 3vw, 32px)'
          }}
        >
          {filteredProjects.map((project) => {
            const isResidential = project.category === 'Residential';
            const themeColor = isResidential ? '#9cdd2e' : '#00f0ff';

            return (
              <div
                key={project.id}
                onClick={() => handleOpenProject(project)}
                style={{
                  background: 'rgba(15, 18, 26, 0.7)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = `${themeColor}88`;
                  e.currentTarget.style.boxShadow = `0 24px 48px rgba(0, 0, 0, 0.7), 0 0 35px ${themeColor}28`;
                  const img = e.currentTarget.querySelector('.project-cover-img');
                  if (img) img.style.transform = 'scale(1.07)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                  const img = e.currentTarget.querySelector('.project-cover-img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                {/* Image Container with 16:10 Ratio & Badges */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '260px',
                    overflow: 'hidden',
                    background: '#0a0d14'
                  }}
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="project-cover-img"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />

                  {/* Gradient Vignette for Text Contrast */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(6, 7, 10, 0.4) 0%, transparent 50%, rgba(6, 7, 10, 0.85) 100%)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Top Badges: Category & Scope */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      right: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      pointerEvents: 'none'
                    }}
                  >
                    <span
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        background: 'rgba(6, 7, 10, 0.85)',
                        backdropFilter: 'blur(10px)',
                        color: themeColor,
                        border: `1px solid ${themeColor}66`
                      }}
                    >
                      {project.category}
                    </span>

                    {/* Scope: Design + Build Badge */}
                    <span
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.74rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        background: 'rgba(6, 7, 10, 0.85)',
                        backdropFilter: 'blur(10px)',
                        color: '#ffb800',
                        border: '1px solid rgba(255, 184, 0, 0.45)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Layers size={13} color="#ffb800" />
                      <span>{project.scope}</span>
                    </span>
                  </div>

                  {/* Bottom Image Hover Pill */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      background: 'rgba(6, 7, 10, 0.85)',
                      backdropFilter: 'blur(12px)',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Maximize2 size={13} color={themeColor} />
                    <span>{project.photos.length} Photos</span>
                  </div>
                </div>

                {/* Card Content: Title, Location, Type, Scope */}
                <div style={{ padding: '24px 26px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: '1.38rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        color: '#ffffff',
                        marginBottom: '14px',
                        lineHeight: 1.3
                      }}
                    >
                      {project.title}
                    </h3>

                    {/* Meta Detail Tags */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                      {/* Location */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.88rem' }}>
                        <MapPin size={15} color={themeColor} />
                        <span style={{ fontWeight: 500 }}>{project.location}</span>
                      </div>

                      {/* Type */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.88rem' }}>
                        <Building2 size={15} color={themeColor} />
                        <span style={{ fontWeight: 500 }}>{project.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div
                    style={{
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                      {project.year} · {project.area}
                    </span>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.86rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        color: themeColor,
                        letterSpacing: '0.04em'
                      }}
                    >
                      <span>Explore Gallery</span>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================================================================
          FULL-SCREEN HORIZONTAL PHOTO GALLERY VIEWER MODAL
          "If i click and see the each project means the photos should load in horizontally.
           if i scroll means the photo should fade in the left and go then the next photo should come"
         =================================================================== */}
      {selectedProject && (
        <div
          ref={galleryModalRef}
          onWheel={handleGalleryWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(4, 5, 8, 0.98)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(14px, 2.5vw, 24px) clamp(16px, 3vw, 36px)',
            overflow: 'hidden',
            touchAction: 'none'
          }}
        >
          {/* Top Gallery Header: Project Metadata & Close Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              paddingBottom: '20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              flexWrap: 'wrap'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: '16px',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    background: `${selectedProject.accentColor}22`,
                    color: selectedProject.accentColor,
                    border: `1px solid ${selectedProject.accentColor}55`
                  }}
                >
                  {selectedProject.category}
                </span>

                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: '16px',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    background: 'rgba(255, 184, 0, 0.15)',
                    color: '#ffb800',
                    border: '1px solid rgba(255, 184, 0, 0.4)'
                  }}
                >
                  Scope: {selectedProject.scope}
                </span>

                <span style={{ fontSize: '0.84rem', color: 'rgba(255, 255, 255, 0.65)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color={selectedProject.accentColor} />
                  {selectedProject.location}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: '#ffffff',
                  margin: 0
                }}
              >
                {selectedProject.title}
              </h2>
            </div>

            {/* Photo Index Indicator & Navigation Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.94rem',
                  fontWeight: 800,
                  color: selectedProject.accentColor,
                  background: 'rgba(255, 255, 255, 0.06)',
                  padding: '8px 18px',
                  borderRadius: '30px',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}
              >
                PHOTO {String(currentPhotoIndex + 1).padStart(2, '0')} / {String(selectedProject.photos.length).padStart(2, '0')}
              </div>

              {/* Prev / Next Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToPrevPhoto();
                  }}
                  title="Previous Photo"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = selectedProject.accentColor;
                    e.currentTarget.style.color = '#06070a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToNextPhoto();
                  }}
                  title="Next Photo"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = selectedProject.accentColor;
                    e.currentTarget.style.color = '#06070a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Close Button - Stays strictly on Projects section */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCloseProject();
                }}
                title="Close Gallery (Esc)"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  fontSize: '0.86rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.color = '#06070a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                <span>Close</span>
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Center Stage: Horizontal Photo Display with Fade-in Left / Fade-out Transition */}
          <div
            ref={photoContainerRef}
            style={{
              position: 'relative',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '20px 0',
              overflow: 'hidden'
            }}
          >
            {/* Active Photo Container */}
            <div
              style={{
                position: 'relative',
                maxWidth: '1240px',
                width: '100%',
                height: 'calc(100vh - 280px)',
                maxHeight: '680px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 50px rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.14)'
              }}
            >
              <img
                ref={activePhotoImgRef}
                src={selectedProject.photos[currentPhotoIndex].url}
                alt={selectedProject.photos[currentPhotoIndex].title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  willChange: 'transform, opacity'
                }}
              />

              {/* Bottom Photo Title / Architectural Perspective Overlay */}
              <div
                ref={captionRef}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 'clamp(14px, 3vw, 28px) clamp(16px, 3vw, 36px)',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(6, 7, 10, 0.88) 60%, rgba(6, 7, 10, 0.98) 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: '24px',
                  pointerEvents: 'none'
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      letterSpacing: '0.14em',
                      color: selectedProject.accentColor,
                      fontWeight: 700,
                      marginBottom: '6px'
                    }}
                  >
                    // PERSPECTIVE VIEW [ {String(currentPhotoIndex + 1).padStart(2, '0')} ]
                  </div>
                  <h4
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '6px'
                    }}
                  >
                    {selectedProject.photos[currentPhotoIndex].title}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.94rem',
                      color: 'rgba(255, 255, 255, 0.75)',
                      margin: 0,
                      maxWidth: '680px'
                    }}
                  >
                    {selectedProject.photos[currentPhotoIndex].subtitle}
                  </p>
                </div>

                {/* Interactive Scroll Prompt Hint */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  ↓ Scroll or swipe to transition photos
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Thumbnails Track: Horizontal Preview Stream */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              overflowX: 'auto'
            }}
          >
            {selectedProject.photos.map((photo, idx) => {
              const isSelected = idx === currentPhotoIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (idx !== currentPhotoIndex) {
                      const dir = idx > currentPhotoIndex ? 'next' : 'prev';
                      animatePhotoTransition(currentPhotoIndex, idx, dir);
                    }
                  }}
                  style={{
                    width: '84px',
                    height: '52px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: isSelected 
                      ? `2px solid ${selectedProject.accentColor}` 
                      : '1px solid rgba(255, 255, 255, 0.2)',
                    padding: 0,
                    background: 'none',
                    cursor: 'pointer',
                    opacity: isSelected ? 1 : 0.45,
                    transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                    transition: 'all 0.3s ease',
                    boxShadow: isSelected ? `0 0 20px ${selectedProject.accentColor}55` : 'none',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
