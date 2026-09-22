import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  Calculator,
  Building2,
  Layers,
  Ruler,
  CheckCircle2,
  Sparkles,
  Share2,
  Printer,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  Info
} from 'lucide-react';

// Authentic WhatsApp icon for direct quote dispatch
function AuthenticWhatsAppIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.04 2C6.54 2 2.08 6.46 2.08 11.96c0 1.8.48 3.51 1.33 5.01L2 22l5.17-1.36a9.92 9.92 0 0 0 4.87 1.27h.01c5.5 0 9.96-4.46 9.96-9.96A9.92 9.92 0 0 0 12.04 2zm0 18.06h-.01c-1.57 0-3.1-.42-4.43-1.22l-.32-.19-3.29.86.88-3.21-.21-.33a8.1 8.1 0 0 1-1.25-4.21c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.77 2.39a8.1 8.1 0 0 1 2.39 5.77c0 4.51-3.66 8.16-8.16 8.16z"
        fill={color}
      />
      <path
        d="M17.472 14.382c-.301-.15-1.782-.88-2.059-.98-.276-.101-.477-.15-.678.15-.2.3-.777.98-.953 1.18-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.502.101-.2.05-.376-.025-.526-.076-.151-.678-1.633-.929-2.236-.244-.588-.493-.508-.678-.518l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.079 2.912 1.23 3.113c.15.201 2.124 3.243 5.145 4.549.719.31 1.28.496 1.718.636.722.23 1.378.197 1.9-.12.58-.352 1.782-1.28 2.033-1.933.251-.653.251-1.21.176-1.325-.076-.115-.276-.19-.577-.34z"
        fill={color}
      />
    </svg>
  );
}

// Format numbers into Indian currency style (Lakhs & Crores)
function formatIndianCurrency(amount) {
  if (isNaN(amount)) return '₹0';
  const rounded = Math.round(amount);
  if (rounded >= 10000000) {
    const cr = (rounded / 10000000).toFixed(2);
    return `₹${cr} Cr`;
  } else if (rounded >= 100000) {
    const lk = (rounded / 100000).toFixed(2);
    return `₹${lk} Lakhs`;
  }
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(rounded);
}

function formatExactNumber(amount) {
  return new Intl.NumberFormat('en-IN').format(Math.round(amount));
}

export default function BuildingEstimatorPage({ onBack }) {
  // Listen for Escape key to go back
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.scrollTo(0, 0);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  // Standard Plot Presets
  const plotPresets = [
    { label: '30 × 40', width: 30, length: 40, sqft: 1200 },
    { label: '30 × 50', width: 30, length: 50, sqft: 1500 },
    { label: '40 × 60', width: 40, length: 60, sqft: 2400 },
    { label: '50 × 80', width: 50, length: 80, sqft: 4000 }
  ];

  // State
  const [selectedPreset, setSelectedPreset] = useState('40 × 60');
  const [plotWidth, setPlotWidth] = useState(40);
  const [plotLength, setPlotLength] = useState(60);
  const [plotAreaManual, setPlotAreaManual] = useState(2400);
  const [groundCoveragePercent, setGroundCoveragePercent] = useState(70);

  // Floors
  const [floors, setFloors] = useState(2); // G+1 default

  // Project Category
  const [projectType, setProjectType] = useState('luxury_villa');

  // Construction Package / Grade
  const [packageGrade, setPackageGrade] = useState('luxury');

  // Location
  const [location, setLocation] = useState('Chennai');

  // Optional Add-ons
  const [addOns, setAddOns] = useState({
    interiors: true,
    automation: true,
    swimmingPool: false,
    landscapeGarden: true,
    basementParking: false
  });

  // Handle Preset selection
  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset.label);
    setPlotWidth(preset.width);
    setPlotLength(preset.length);
    setPlotAreaManual(preset.sqft);
  };

  // Keep plot area synced if width/length change
  const handleWidthChange = (val) => {
    const w = Math.max(1, Number(val) || 0);
    setSelectedPreset('Custom');
    setPlotWidth(w);
    setPlotAreaManual(w * plotLength);
  };

  const handleLengthChange = (val) => {
    const l = Math.max(1, Number(val) || 0);
    setSelectedPreset('Custom');
    setPlotLength(l);
    setPlotAreaManual(plotWidth * l);
  };

  const handleAreaDirectChange = (val) => {
    const a = Math.max(100, Number(val) || 0);
    setSelectedPreset('Custom');
    setPlotAreaManual(a);
  };

  // Base Package Rates per sq.ft
  const packagesConfig = {
    executive: {
      name: 'Executive Premium',
      baseRate: 2350,
      description: 'Solid RCC frame, branded steel & cement, 4×2 vitrified tiles, UPVC windows, branded CP fittings & acrylic emulsion.',
      features: ['Fe550 TMT Rebar & Ultratech/ACC', '4×2 Premium Glazed Vitrified Tiles', 'Branded Sanitaryware (Jaquar / Parryware)', 'Standard Modern Elevation', '1 Year Maintenance Guarantee']
    },
    luxury: {
      name: 'Luxury Architectural',
      baseRate: 3250,
      badge: 'MOST POPULAR',
      description: 'Structural cantilever façades, Italian marble / solid teak accents, double-glazed soundproof façades & 2700K ambient lighting.',
      features: ['Cantilevered Post-Tensioned Slabs', 'Italian Marble / Hardwood Flooring', 'Architectural Weather Louvers & Cladding', 'Concealed 2700K Warm LED Architectural Lighting', 'Kohler / Grohe Concealed Diverters', '10 Years Structural Warranty']
    },
    atelier: {
      name: 'Ultra-Bespoke Atelier',
      baseRate: 4350,
      badge: 'SIGNATURE CRAFT',
      description: 'Zero-tolerance monolithic architecture, motorized curtain glass, smart home automation, imported artisan bronze fittings.',
      features: ['Monolithic Architectural RCC & Corten Steel', 'Full-Height Motorized Curtain Glazing', 'Complete Smart Home BMS Automation', 'Imported Artisanal Brass & Teak Fixtures', 'Private Water Feature / Reflecting Pool Prep', 'Lifetime Structural Assurance + BIM 3D Audit']
    }
  };

  // Calculations
  const calculations = useMemo(() => {
    const plotSqFt = plotAreaManual > 0 ? plotAreaManual : plotWidth * plotLength;
    const footprintSqFt = Math.round(plotSqFt * (groundCoveragePercent / 100));
    const totalBuiltUpSqFt = footprintSqFt * floors;

    const baseRatePerSqFt = packagesConfig[packageGrade].baseRate;

    // Location multiplier
    const locMultipliers = {
      Chennai: 1.0,
      Hyderabad: 1.02,
      Bangalore: 1.05,
      Coimbatore: 0.98,
      Other: 1.0
    };
    const locMultiplier = locMultipliers[location] || 1.0;

    // Project type factor
    const typeFactors = {
      luxury_villa: 1.05,
      independent_house: 1.0,
      commercial_hq: 1.12,
      duplex_residence: 1.02,
      biophilic_retreat: 1.08
    };
    const typeFactor = typeFactors[projectType] || 1.0;

    const effectiveRatePerSqFt = Math.round(baseRatePerSqFt * locMultiplier * typeFactor);
    const coreConstructionCost = totalBuiltUpSqFt * effectiveRatePerSqFt;

    // Add-ons calculation
    let addOnsCost = 0;
    const addOnBreakdown = {};

    if (addOns.interiors) {
      const interiorRate = packageGrade === 'atelier' ? 950 : packageGrade === 'luxury' ? 680 : 450;
      const cost = totalBuiltUpSqFt * interiorRate;
      addOnsCost += cost;
      addOnBreakdown.interiors = cost;
    }
    if (addOns.automation) {
      const autoRate = packageGrade === 'atelier' ? 220 : 140;
      const cost = totalBuiltUpSqFt * autoRate;
      addOnsCost += cost;
      addOnBreakdown.automation = cost;
    }
    if (addOns.swimmingPool) {
      const cost = 850000;
      addOnsCost += cost;
      addOnBreakdown.swimmingPool = cost;
    }
    if (addOns.landscapeGarden) {
      const cost = 380000;
      addOnsCost += cost;
      addOnBreakdown.landscapeGarden = cost;
    }
    if (addOns.basementParking) {
      const cost = footprintSqFt * 1450;
      addOnsCost += cost;
      addOnBreakdown.basementParking = cost;
    }

    const totalEstimatedBudget = coreConstructionCost + addOnsCost;
    const totalEffectiveRatePerSqFt = totalBuiltUpSqFt > 0 ? Math.round(totalEstimatedBudget / totalBuiltUpSqFt) : 0;

    // Category cost distribution
    const civilStructureCost = Math.round(totalEstimatedBudget * 0.40);
    const facadeElevationCost = Math.round(totalEstimatedBudget * 0.18);
    const finishesInteriorCost = Math.round(totalEstimatedBudget * 0.26);
    const mepPlumbingElectricalCost = Math.round(totalEstimatedBudget * 0.16);

    // Construction timeline in months
    let estimatedMonths = 8;
    if (floors >= 2) estimatedMonths += 2;
    if (floors >= 3) estimatedMonths += 2;
    if (totalBuiltUpSqFt > 4000) estimatedMonths += 2;
    if (addOns.interiors) estimatedMonths += 1;

    return {
      plotSqFt,
      footprintSqFt,
      totalBuiltUpSqFt,
      coreConstructionCost,
      addOnsCost,
      addOnBreakdown,
      totalEstimatedBudget,
      totalEffectiveRatePerSqFt,
      civilStructureCost,
      facadeElevationCost,
      finishesInteriorCost,
      mepPlumbingElectricalCost,
      estimatedMonths
    };
  }, [plotAreaManual, plotWidth, plotLength, groundCoveragePercent, floors, packageGrade, projectType, location, addOns]);

  // Construct direct WhatsApp Inquiry
  const handleWhatsAppDispatch = () => {
    const typeLabel = {
      luxury_villa: 'Luxury Cantilevered Villa',
      independent_house: 'Modern Independent House',
      commercial_hq: 'Commercial Landmark / HQ',
      duplex_residence: 'High-End Duplex Residence',
      biophilic_retreat: 'Biophilic Courtyard Residence'
    }[projectType];

    const packageLabel = packagesConfig[packageGrade].name;

    const message = `*Hello Rustic Arc & Barathan!*
I generated a turnkey building estimate on your website calculator:

*Plot & Structure Specs:*
• *Plot Area:* ${formatExactNumber(calculations.plotSqFt)} sq.ft (${plotWidth}ft × ${plotLength}ft)
• *Floors:* ${floors === 1 ? 'Ground Floor Only' : `G + ${floors - 1} Floors`}
• *Total Built-up Area:* ${formatExactNumber(calculations.totalBuiltUpSqFt)} sq.ft
• *Project Type:* ${typeLabel}
• *Specification Grade:* ${packageLabel}
• *Location:* ${location}

*Estimated Budget Summary:*
• *Total Estimated Turnkey Cost:* ${formatIndianCurrency(calculations.totalEstimatedBudget)} (~${formatIndianCurrency(calculations.totalEstimatedBudget)})
• *Effective Rate:* ₹${formatExactNumber(calculations.totalEffectiveRatePerSqFt)} / sq.ft
• *Projected Timeline:* ${calculations.estimatedMonths} Months

I would like to discuss this project and schedule an architectural consultation.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/917825915899?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#06070a',
        color: '#f5f7fa',
        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
        position: 'relative',
        paddingBottom: '80px'
      }}
    >
      {/* Background Architectural Grid Pattern */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(202, 183, 150, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(202, 183, 150, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Ambient Warm Golden-Brown Glow */}
      <div
        style={{
          position: 'fixed',
          top: '-15%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(202, 183, 150, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* =====================================================================
          TOP ACTION BAR: PURE BACK BUTTON ONLY (NO HEADER/NAVBAR AS REQUESTED)
         ===================================================================== */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: '16px clamp(16px, 4vw, 48px)',
          backgroundColor: 'rgba(6, 7, 10, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Only Back Button */}
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back to Home"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(202, 183, 150, 0.28)',
            color: '#CAB796',
            padding: '10px 20px',
            borderRadius: '30px',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            fontFamily: "'Outfit', sans-serif"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#CAB796';
            e.currentTarget.style.color = '#06070a';
            e.currentTarget.style.transform = 'translateX(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.color = '#CAB796';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </button>

        {/* Brand Tag Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontFamily: "'Cinzel', 'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: '0.98rem',
              letterSpacing: '0.1em',
              color: '#FFFFFF',
              textTransform: 'uppercase'
            }}
          >
            RUSTIC ARC <span style={{ color: '#CAB796' }}>ATELIER</span>
          </span>
        </div>
      </div>

      {/* Main Content Container */}
      <div
        style={{
          maxWidth: '1380px',
          margin: '0 auto',
          padding: 'clamp(28px, 4vw, 52px) clamp(16px, 4vw, 48px)',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Page Hero Title */}
        <div style={{ marginBottom: '40px', maxWidth: '820px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              color: '#CAB796',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '14px'
            }}
          >
            <Calculator size={15} color="#CAB796" />
            <span>ARCHITECTURAL & CONSTRUCTION ESTIMATOR</span>
            <span style={{ width: '28px', height: '2px', backgroundColor: '#CAB796' }} />
          </div>

          <h1
            style={{
              fontFamily: "'Cinzel', 'Outfit', Georgia, serif",
              fontSize: 'clamp(2.2rem, 4.4vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}
          >
            BUILDING COST <span style={{ color: '#CAB796' }}>SIMULATOR</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.3vw, 1.12rem)',
              lineHeight: 1.6,
              color: '#9ca3af',
              maxWidth: '680px'
            }}
          >
            Configure your plot dimensions, built-up area, and architectural finish grade to simulate accurate turnkey civil, façade, and interior costs in real time.
          </p>
        </div>

        {/* 2-Column Interactive Workspace */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(24px, 3vw, 40px)',
            alignItems: 'start'
          }}
        >
          {/* ===================================================================
              LEFT COLUMN: CONFIGURATION STEPS (8 Columns on desktop)
             =================================================================== */}
          <div
            style={{
              gridColumn: 'span 12',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px'
            }}
            className="estimator-left-pane"
          >
            {/* STEP 1: Land / Plot Size Configuration */}
            <div
              style={{
                backgroundColor: 'rgba(15, 19, 28, 0.75)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: 'clamp(20px, 3vw, 32px)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(202, 183, 150, 0.12)',
                      border: '1px solid rgba(202, 183, 150, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#CAB796',
                      fontWeight: 900,
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.85rem'
                    }}
                  >
                    01
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                      Plot Dimensions & Land Size
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Select standard Indian plot presets or enter custom dimensions</div>
                  </div>
                </div>

                {/* Live Plot Area Badge */}
                <div
                  style={{
                    backgroundColor: 'rgba(202, 183, 150, 0.14)',
                    border: '1px solid #CAB796',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    color: '#CAB796',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.88rem',
                    fontWeight: 800
                  }}
                >
                  PLOT: {formatExactNumber(calculations.plotSqFt)} SQ.FT
                </div>
              </div>

              {/* Presets Button Row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                {plotPresets.map((preset) => {
                  const isSelected = selectedPreset === preset.label;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '12px',
                        border: isSelected ? '1.5px solid #CAB796' : '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: isSelected ? '#CAB796' : 'rgba(255, 255, 255, 0.04)',
                        color: isSelected ? '#06070a' : '#d1d5db',
                        fontWeight: 800,
                        fontSize: '0.86rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <span>{preset.label}</span>
                      <span style={{ opacity: 0.8, fontSize: '0.74rem' }}>({preset.sqft} sq.ft)</span>
                    </button>
                  );
                })}
              </div>

              {/* Dimension Numeric Inputs */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '16px',
                  marginBottom: '20px'
                }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Plot Width (Feet)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="number"
                      min="10"
                      max="300"
                      value={plotWidth}
                      onChange={(e) => handleWidthChange(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '10px',
                        color: '#FFFFFF',
                        fontSize: '1rem',
                        fontWeight: 700,
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <span style={{ position: 'absolute', right: '14px', top: '13px', color: '#6b7280', fontSize: '0.82rem', fontWeight: 600 }}>ft</span>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Plot Length (Feet)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="number"
                      min="10"
                      max="400"
                      value={plotLength}
                      onChange={(e) => handleLengthChange(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '10px',
                        color: '#FFFFFF',
                        fontSize: '1rem',
                        fontWeight: 700,
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <span style={{ position: 'absolute', right: '14px', top: '13px', color: '#6b7280', fontSize: '0.82rem', fontWeight: 600 }}>ft</span>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Direct Area (Sq.Ft)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="number"
                      min="200"
                      max="50000"
                      value={plotAreaManual}
                      onChange={(e) => handleAreaDirectChange(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '10px',
                        color: '#CAB796',
                        fontSize: '1rem',
                        fontWeight: 800,
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <span style={{ position: 'absolute', right: '14px', top: '13px', color: '#6b7280', fontSize: '0.82rem', fontWeight: 600 }}>sq.ft</span>
                  </div>
                </div>
              </div>

              {/* Ground Coverage Percentage Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#9ca3af' }}>
                    Ground Footprint Coverage (after setbacks)
                  </span>
                  <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#CAB796', fontFamily: 'var(--font-mono, monospace)' }}>
                    {groundCoveragePercent}% ({formatExactNumber(calculations.footprintSqFt)} sq.ft ground footprint)
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="90"
                  step="5"
                  value={groundCoveragePercent}
                  onChange={(e) => setGroundCoveragePercent(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#CAB796', cursor: 'pointer' }}
                />
              </div>
            </div>

            {/* STEP 2: Floors & Built-up Area */}
            <div
              style={{
                backgroundColor: 'rgba(15, 19, 28, 0.75)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: 'clamp(20px, 3vw, 32px)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(202, 183, 150, 0.12)',
                    border: '1px solid rgba(202, 183, 150, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#CAB796',
                    fontWeight: 900,
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.85rem'
                  }}
                >
                  02
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                    Floors & Construction Built-Up Area
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Select elevation floor count to compute total super built-up area</div>
                </div>
              </div>

              {/* Floor Selector Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                  gap: '12px',
                  marginBottom: '20px'
                }}
              >
                {[
                  { count: 1, label: 'Ground Only' },
                  { count: 2, label: 'G + 1 (Duplex)' },
                  { count: 3, label: 'G + 2 (Triplex)' },
                  { count: 4, label: 'G + 3' },
                  { count: 5, label: 'G + 4+' }
                ].map((item) => {
                  const isSelected = floors === item.count;
                  return (
                    <button
                      key={item.count}
                      type="button"
                      onClick={() => setFloors(item.count)}
                      style={{
                        padding: '14px 10px',
                        borderRadius: '14px',
                        border: isSelected ? '2px solid #CAB796' : '1px solid rgba(255, 255, 255, 0.08)',
                        backgroundColor: isSelected ? 'rgba(202, 183, 150, 0.14)' : 'rgba(255, 255, 255, 0.03)',
                        color: isSelected ? '#CAB796' : '#FFFFFF',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, lineHeight: 1, marginBottom: '6px' }}>
                        {item.count}
                      </div>
                      <div style={{ fontSize: '0.74rem', fontWeight: 700, color: isSelected ? '#CAB796' : '#9ca3af', textTransform: 'uppercase' }}>
                        {item.label}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Built-up Area Metric Summary Banner */}
              <div
                style={{
                  backgroundColor: 'rgba(6, 7, 10, 0.6)',
                  border: '1px solid rgba(202, 183, 150, 0.2)',
                  borderRadius: '14px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.74rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Computed Total Built-up Area
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                    {formatExactNumber(calculations.totalBuiltUpSqFt)} <span style={{ fontSize: '0.9rem', color: '#CAB796' }}>SQ.FT</span>
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', maxWidth: '320px' }}>
                  ({formatExactNumber(calculations.footprintSqFt)} sq.ft × {floors} levels based on {groundCoveragePercent}% plot coverage)
                </div>
              </div>
            </div>

            {/* STEP 3: Project Typology & City */}
            <div
              style={{
                backgroundColor: 'rgba(15, 19, 28, 0.75)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: 'clamp(20px, 3vw, 32px)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(202, 183, 150, 0.12)',
                    border: '1px solid rgba(202, 183, 150, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#CAB796',
                    fontWeight: 900,
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.85rem'
                  }}
                >
                  03
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                    Typology & Geographic Location
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Select building architecture style and project site city</div>
                </div>
              </div>

              {/* Typology grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '12px',
                  marginBottom: '20px'
                }}
              >
                {[
                  { id: 'luxury_villa', title: 'Luxury Cantilever Villa', sub: 'Iconic cantilever façades & bronze louvers' },
                  { id: 'independent_house', title: 'Independent House', sub: 'Contemporary residential dwelling' },
                  { id: 'commercial_hq', title: 'Commercial Landmark / HQ', sub: 'High-span curtain wall & corporate lobby' },
                  { id: 'duplex_residence', title: 'Duplex Residence', sub: 'Double-height volume architecture' },
                  { id: 'biophilic_retreat', title: 'Biophilic Courtyard', sub: 'Japanese courtyard with central gardens' }
                ].map((item) => {
                  const isSelected = projectType === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setProjectType(item.id)}
                      style={{
                        padding: '16px',
                        borderRadius: '14px',
                        border: isSelected ? '1.5px solid #CAB796' : '1px solid rgba(255, 255, 255, 0.08)',
                        backgroundColor: isSelected ? 'rgba(202, 183, 150, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <div style={{ fontSize: '0.94rem', fontWeight: 800, color: isSelected ? '#CAB796' : '#FFFFFF', marginBottom: '4px' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#9ca3af', lineHeight: 1.3 }}>
                        {item.sub}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Location Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Project Location City
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {['Chennai', 'Hyderabad', 'Bangalore', 'Coimbatore', 'Other'].map((city) => {
                    const isSelected = location === city;
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => setLocation(city)}
                        style={{
                          padding: '8px 18px',
                          borderRadius: '20px',
                          border: isSelected ? '1.5px solid #CAB796' : '1px solid rgba(255, 255, 255, 0.1)',
                          backgroundColor: isSelected ? '#CAB796' : 'transparent',
                          color: isSelected ? '#06070a' : '#d1d5db',
                          fontWeight: 700,
                          fontSize: '0.84rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <MapPin size={13} color={isSelected ? '#06070a' : '#9ca3af'} />
                        <span>{city}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* STEP 4: Construction Finish Package / Grade */}
            <div
              style={{
                backgroundColor: 'rgba(15, 19, 28, 0.75)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: 'clamp(20px, 3vw, 32px)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(202, 183, 150, 0.12)',
                    border: '1px solid rgba(202, 183, 150, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#CAB796',
                    fontWeight: 900,
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.85rem'
                  }}
                >
                  04
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                    Architectural Specification Grade
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Select the construction standard and materials quality tier</div>
                </div>
              </div>

              {/* 3 Package Tier Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '16px'
                }}
              >
                {Object.entries(packagesConfig).map(([key, pkg]) => {
                  const isSelected = packageGrade === key;
                  return (
                    <div
                      key={key}
                      onClick={() => setPackageGrade(key)}
                      style={{
                        padding: '24px 20px',
                        borderRadius: '18px',
                        border: isSelected ? '2px solid #CAB796' : '1px solid rgba(255, 255, 255, 0.08)',
                        backgroundColor: isSelected ? 'rgba(202, 183, 150, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: isSelected ? 'translateY(-3px)' : 'translateY(0)',
                        boxShadow: isSelected ? '0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(202, 183, 150, 0.2)' : 'none'
                      }}
                    >
                      {pkg.badge && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '16px',
                            backgroundColor: '#CAB796',
                            color: '#06070a',
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '0.66rem',
                            fontWeight: 900,
                            padding: '3px 10px',
                            borderRadius: '10px',
                            letterSpacing: '0.08em'
                          }}
                        >
                          {pkg.badge}
                        </span>
                      )}

                      <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: isSelected ? '#CAB796' : '#FFFFFF', marginBottom: '6px' }}>
                          {pkg.name}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
                          <span style={{ fontSize: '1.75rem', fontWeight: 900, color: '#FFFFFF' }}>
                            ₹{pkg.baseRate}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>/ sq.ft</span>
                        </div>

                        <p style={{ fontSize: '0.82rem', color: '#9ca3af', lineHeight: 1.5, marginBottom: '16px' }}>
                          {pkg.description}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {pkg.features.map((feat, fIdx) => (
                            <div key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.78rem', color: '#d1d5db' }}>
                              <CheckCircle2 size={14} color="#CAB796" style={{ flexShrink: 0, marginTop: '2px' }} />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 5: Turnkey Add-ons */}
            <div
              style={{
                backgroundColor: 'rgba(15, 19, 28, 0.75)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: 'clamp(20px, 3vw, 32px)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(202, 183, 150, 0.12)',
                    border: '1px solid rgba(202, 183, 150, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#CAB796',
                    fontWeight: 900,
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.85rem'
                  }}
                >
                  05
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                    Turnkey Add-ons & Atelier Inclusions
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Select complementary turnkey interior, automation, or landscape scopes</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                {[
                  { key: 'interiors', title: 'Turnkey Interior Architecture', price: '+ ₹680 / sq.ft', desc: 'Bespoke modular kitchens, teak wardrobes, panelling' },
                  { key: 'automation', title: 'Smart Home Automation', price: '+ ₹140 / sq.ft', desc: 'Touchless scenes, climate & automated security' },
                  { key: 'landscapeGarden', title: 'Biophilic Landscape & Terrace', price: '₹3.80 Lakhs flat', desc: 'Zen court, vertical green wall & water irrigation' },
                  { key: 'swimmingPool', title: 'Infinity Reflecting Pool', price: '₹8.50 Lakhs flat', desc: 'Filtration, mosaic tile lining & underwater LED' },
                  { key: 'basementParking', title: 'Stilt / Covered Multi-Car Parking', price: '+ ₹1,450 / sq.ft', desc: 'Epoxy flooring & structural pillar clearance' }
                ].map((item) => {
                  const isChecked = addOns[item.key];
                  return (
                    <label
                      key={item.key}
                      onClick={() => setAddOns({ ...addOns, [item.key]: !isChecked })}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '14px',
                        border: isChecked ? '1.5px solid #CAB796' : '1px solid rgba(255, 255, 255, 0.08)',
                        backgroundColor: isChecked ? 'rgba(202, 183, 150, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        userSelect: 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                        style={{ accentColor: '#CAB796', width: '18px', height: '18px', marginTop: '3px', cursor: 'pointer' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: isChecked ? '#CAB796' : '#FFFFFF' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#CAB796', fontFamily: 'var(--font-mono, monospace)', fontWeight: 700 }}>
                          {item.price}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '2px' }}>
                          {item.desc}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ===================================================================
              RIGHT COLUMN: REAL-TIME STICKY ESTIMATION CARD
             =================================================================== */}
          <div
            style={{
              gridColumn: 'span 12',
              position: 'sticky',
              top: '80px'
            }}
            className="estimator-right-pane"
          >
            <div
              style={{
                backgroundColor: '#0a0d15',
                border: '1.5px solid rgba(202, 183, 150, 0.4)',
                borderRadius: '24px',
                padding: 'clamp(24px, 3.5vw, 36px)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(202, 183, 150, 0.12)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Header Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.16em',
                    color: '#CAB796',
                    textTransform: 'uppercase'
                  }}
                >
                  PRELIMINARY ESTIMATE
                </span>
                <span style={{ fontSize: '0.74rem', color: '#9ca3af' }}>{location}</span>
              </div>

              {/* Huge Total Figure */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '0.82rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  Total Estimated Turnkey Budget
                </div>
                <div
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 'clamp(2.5rem, 4vw, 3.6rem)',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em'
                  }}
                >
                  {formatIndianCurrency(calculations.totalEstimatedBudget)}
                </div>
                <div style={{ fontSize: '0.88rem', color: '#CAB796', fontWeight: 700, marginTop: '4px' }}>
                  Approx. ₹{formatExactNumber(calculations.totalEffectiveRatePerSqFt)} / sq.ft turnkey
                </div>
              </div>

              {/* Metrics Quick Strip */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  padding: '14px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '14px',
                  marginBottom: '24px'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase' }}>Built-Up Area</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF' }}>
                    {formatExactNumber(calculations.totalBuiltUpSqFt)} sq.ft
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase' }}>Est. Timeline</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#CAB796' }}>
                    ~{calculations.estimatedMonths} Months
                  </div>
                </div>
              </div>

              {/* Progress Breakdown Bars */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Discipline Cost Breakdown
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: 'Civil & Structural (Foundation, RCC, Slabs)', amount: calculations.civilStructureCost, pct: 40 },
                    { label: 'Architectural Façade & Cantilever Elevation', amount: calculations.facadeElevationCost, pct: 18 },
                    { label: 'Interior Architecture & Finishes', amount: calculations.finishesInteriorCost, pct: 26 },
                    { label: 'Plumbing, Electrical & MEP Engineering', amount: calculations.mepPlumbingElectricalCost, pct: 16 }
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                        <span style={{ color: '#d1d5db' }}>{item.label}</span>
                        <span style={{ color: '#CAB796', fontWeight: 700 }}>{formatIndianCurrency(item.amount)}</span>
                      </div>
                      <div style={{ height: '5px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${item.pct}%`, height: '100%', backgroundColor: '#CAB796', borderRadius: '4px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* 1. Direct WhatsApp Dispatch */}
                <button
                  type="button"
                  onClick={handleWhatsAppDispatch}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '40px',
                    backgroundColor: '#25D366',
                    color: '#06070a',
                    border: 'none',
                    fontWeight: 900,
                    fontSize: '0.96rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 211, 102, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.35)';
                  }}
                >
                  <AuthenticWhatsAppIcon size={20} color="#06070a" />
                  <span>Send Estimate to WhatsApp</span>
                </button>

                {/* 2. Print / Save Summary */}
                <button
                  type="button"
                  onClick={handlePrint}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    borderRadius: '40px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    fontWeight: 700,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  }}
                >
                  <Printer size={16} />
                  <span>Print / Save Estimate Summary</span>
                </button>
              </div>

              {/* Disclaimer note */}
              <div style={{ marginTop: '18px', display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.72rem', color: '#6b7280', lineHeight: 1.4 }}>
                <Info size={13} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  This estimate is preliminary and calculated based on standard architectural metrics in South India. Exact site topography, soil condition, and bespoke structural cantilever spans are verified during the site visit and architectural schematic phase.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
