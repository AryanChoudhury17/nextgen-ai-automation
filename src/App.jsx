import { useState, useEffect, useRef } from 'react'
import './App.css'

// Multi-dimensional configuration matrix for pricing
const baseRates = {
  Starter: 19,
  Professional: 49,
  Enterprise: 149
};

const pricingMatrix = {
  USD: { symbol: '$', rate: 1.0 },
  INR: { symbol: '₹', rate: 83.0 },
  EUR: { symbol: '€', rate: 0.92 }
};

// Features Data
const features = [
  {
    title: "AI Ingestion Engine",
    description: "Injest millions of unstructured documents per second with smart schema mapping and automated normalizations.",
    badge: "Fastest Ingestion",
    details: "Leverage cluster-based distributed execution to parse CSV, JSON, and PDF files. Automatic layout-detection preserves context."
  },
  {
    title: "Matrix Pipeline Automations",
    description: "Map data pipelines visually or via prompt instructions. Run multi-stage transforms dynamically.",
    badge: "No-Code Workflow",
    details: "Define inputs, operations, and destination targets. Features self-healing pipelines that correct schema drift automatically."
  },
  {
    title: "Real-time Vector Search",
    description: "Query dataset stores instantly with hybrid embedding vector searches and sub-millisecond retrieval.",
    badge: "Sub-ms Search",
    details: "Integrated vector indexing engine with dynamic semantic rankers. Instantly connect results to downstream LLM contexts."
  },
  {
    title: "Enterprise Governance",
    description: "Maintain absolute clarity with cell-level audit logs, field-level access, and SOC-2 standard controls.",
    badge: "SOC-2 Ready",
    details: "Robust access control policies, strict audit trails, and automatic end-to-end data encryption."
  }
];

function App() {
  // Bento & Accordion Active State
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Refs for State-Isolated Pricing Updates
  const currencyRef = useRef('USD');
  const billingRef = useRef('monthly');
  
  const priceStarterRef = useRef(null);
  const priceProfessionalRef = useRef(null);
  const priceEnterpriseRef = useRef(null);
  
  // Refs for Switch Buttons to surgically change styles
  const btnMonthlyRef = useRef(null);
  const btnAnnualRef = useRef(null);
  const selectCurrencyRef = useRef(null);

  // Surgical Update Function (The State Isolation Guardrail)
  // Guarantees zero global re-renders
  const updatePricingDOM = () => {
    const currency = currencyRef.current;
    const billing = billingRef.current;
    const data = pricingMatrix[currency];
    const discount = billing === 'annual' ? 0.8 : 1.0;
    const period = billing === 'annual' ? '/yr' : '/mo';

    if (priceStarterRef.current) {
      const val = Math.round(baseRates.Starter * data.rate * discount * (billing === 'annual' ? 12 : 1));
      priceStarterRef.current.innerHTML = `${data.symbol}${val.toLocaleString()}<span class="price-period">${period}</span>`;
    }
    if (priceProfessionalRef.current) {
      const val = Math.round(baseRates.Professional * data.rate * discount * (billing === 'annual' ? 12 : 1));
      priceProfessionalRef.current.innerHTML = `${data.symbol}${val.toLocaleString()}<span class="price-period">${period}</span>`;
    }
    if (priceEnterpriseRef.current) {
      const val = Math.round(baseRates.Enterprise * data.rate * discount * (billing === 'annual' ? 12 : 1));
      priceEnterpriseRef.current.innerHTML = `${data.symbol}${val.toLocaleString()}<span class="price-period">${period}</span>`;
    }
  };

  // Perform initial pricing DOM render on mount
  useEffect(() => {
    updatePricingDOM();
  }, []);

  // Event handler for billing cycle toggle
  const handleBillingToggle = (cycle) => {
    billingRef.current = cycle;
    
    // Surgical visual feedback toggles without parent component render
    if (cycle === 'monthly') {
      btnMonthlyRef.current?.classList.add('active');
      btnAnnualRef.current?.classList.remove('active');
    } else {
      btnAnnualRef.current?.classList.add('active');
      btnMonthlyRef.current?.classList.remove('active');
    }
    
    updatePricingDOM();
  };

  // Event handler for currency change
  const handleCurrencyChange = (e) => {
    currencyRef.current = e.target.value;
    updatePricingDOM();
  };

  return (
    <div className="app-container">
      {/* 500ms Execution Entrance Loader */}
      <div id="entrance-loader" style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0a0a0c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
        transition: 'opacity 300ms ease-out',
        pointerEvents: 'none'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid rgba(168, 85, 247, 0.1)',
          borderTopColor: '#a855f7',
          animation: 'spin 0.6s linear infinite'
        }} />
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        window.addEventListener('load', () => {
          const loader = document.getElementById('entrance-loader');
          if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
          }
        });
        // Fallback safety cap
        setTimeout(() => {
          const loader = document.getElementById('entrance-loader');
          if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
          }
        }, 500);
      `}} />

      {/* Header / Navigation */}
      <header className="animate-fade" style={{
        borderBottom: '1px solid var(--border-light)',
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        backgroundColor: 'rgba(10, 10, 12, 0.8)',
        backdropFilter: 'blur(12px)',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: 18,
            color: '#fff'
          }}>V</div>
          <span style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>VibeFlow</span>
        </div>
        <nav style={{ display: 'flex', gap: 32, fontSize: 15, fontWeight: 500, color: 'var(--text-secondary)' }}>
          <a href="#features" style={{ transition: 'color var(--ease-micro)' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = ''}>Features</a>
          <a href="#pricing" style={{ transition: 'color var(--ease-micro)' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = ''}>Pricing</a>
          <a href="#social-proof" style={{ transition: 'color var(--ease-micro)' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = ''}>Success Stories</a>
        </nav>
        <div>
          <a href="#pricing" className="btn-secondary" style={{ padding: '8px 20px', fontSize: 14 }}>Get Started</a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="animate-entrance" style={{
          padding: '120px 20px 80px',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <span style={{
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            color: 'var(--accent-purple)',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '0.05em',
            display: 'inline-block',
            marginBottom: '24px'
          }}>
            INTELLIGENT DATA AUTOMATION
          </span>
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 68px)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '24px',
            background: 'linear-gradient(to right, #fff, #9ca3af)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Automate Your Data Pipelines at Scale
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '40px',
            maxWidth: '640px',
            marginInline: 'auto'
          }}>
            Accelerate ingestion, run complex matrix mappings, and trigger real-time actions. All powered by localized, state-isolated agent models.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#pricing" className="btn-primary">View Pricing Plans</a>
            <a href="#features" className="btn-secondary">Explore AI Bento grid</a>
          </div>
        </section>

        {/* Technical Features Section: Bento Grid (Desktop) and Accordion (Mobile) */}
        <section id="features" style={{
          padding: '80px 20px',
          borderTop: '1px solid var(--border-light)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 700, marginBottom: '16px' }}>
              Advanced Feature Suite
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '580px', margin: '0 auto' }}>
              Interact with the Bento Grid or Accordion to view functional capabilities. Active selection context is locked on viewport resize.
            </p>
          </div>

          {/* Desktop Bento Grid */}
          <div className="bento-grid">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className={`bento-card ${idx === 0 || idx === 3 ? 'col-2' : ''} ${activeIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                <div>
                  <div className="bento-icon-wrapper">
                    <span style={{ fontWeight: 'bold', color: activeIndex === idx ? 'var(--accent-purple)' : 'inherit' }}>
                      {idx + 1}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '10px' }}>{feat.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>
                    {feat.description}
                  </p>
                </div>
                <div style={{ marginTop: '24px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--accent-purple)',
                    background: 'rgba(168, 85, 247, 0.08)',
                    padding: '4px 10px',
                    borderRadius: '4px'
                  }}>
                    {feat.badge}
                  </span>
                  <div style={{
                    maxHeight: activeIndex === idx ? '120px' : '0px',
                    opacity: activeIndex === idx ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height var(--ease-reflow), opacity var(--ease-reflow)',
                    marginTop: activeIndex === idx ? '16px' : '0px',
                    color: 'var(--text-muted)',
                    fontSize: '13px',
                    lineHeight: 1.5
                  }}>
                    {feat.details}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Accordion */}
          <div className="accordion-wrapper">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className={`accordion-item ${activeIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="accordion-header">
                  <span>{feat.title}</span>
                  <svg className="accordion-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                <div className="accordion-content">
                  <p style={{ marginBottom: '12px' }}>{feat.description}</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{feat.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Matrix Section */}
        <section id="pricing" style={{
          padding: '100px 20px',
          borderTop: '1px solid var(--border-light)',
          background: 'linear-gradient(to bottom, rgba(18, 18, 22, 0.4), transparent)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{
              color: 'var(--accent-purple)',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '0.05em'
            }}>TRANSPARENT TARIFF MATRIX</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 700, marginTop: '8px', marginBottom: '16px' }}>
              Matrix-Driven Plans
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
              Base USD rate factors in dynamic conversion, regional tariffs (INR, USD, EUR), and a flat 20% annual discount multiplier.
            </p>
          </div>

          {/* Pricing Controls: Isolated Switches */}
          <div className="pricing-controls">
            <div className="billing-switch">
              <button
                ref={btnMonthlyRef}
                onClick={() => handleBillingToggle('monthly')}
                className="billing-btn active"
              >
                Monthly
              </button>
              <button
                ref={btnAnnualRef}
                onClick={() => handleBillingToggle('annual')}
                className="billing-btn"
              >
                Annual (20% Off)
              </button>
            </div>

            <select
              ref={selectCurrencyRef}
              onChange={handleCurrencyChange}
              className="currency-select"
            >
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>

          {/* Pricing Tiers Grid */}
          <div className="pricing-grid">
            {/* Starter Plan */}
            <div className="pricing-card">
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-secondary)' }}>Starter</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>Best for single pipelines</p>
                <div className="price-container">
                  <div ref={priceStarterRef} className="price-value">-</div>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: '14px', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    1 Active Pipeline
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    50,000 Ingestions / mo
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Community Support
                  </li>
                </ul>
              </div>
              <button className="btn-secondary" style={{ width: '100%', marginTop: '30px', justifyContent: 'center' }}>Choose Starter</button>
            </div>

            {/* Professional Plan (Recommended) */}
            <div className="pricing-card premium">
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--accent-purple)' }}>Professional</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>Most popular for growing teams</p>
                <div className="price-container">
                  <div ref={priceProfessionalRef} className="price-value">-</div>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: '14px', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    10 Active Pipelines
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    500,000 Ingestions / mo
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Priority Support (24h)
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Custom Mappings & Vectors
                  </li>
                </ul>
              </div>
              <button className="btn-primary" style={{ width: '100%', marginTop: '30px', justifyContent: 'center' }}>Choose Professional</button>
            </div>

            {/* Enterprise Plan */}
            <div className="pricing-card">
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-secondary)' }}>Enterprise</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>Custom compliance & high volume</p>
                <div className="price-container">
                  <div ref={priceEnterpriseRef} className="price-value">-</div>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: '14px', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Unlimited Pipelines
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Unlimited Ingestions
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Dedicated Slack Support
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    SOC-2 compliance & cells
                  </li>
                </ul>
              </div>
              <button className="btn-secondary" style={{ width: '100%', marginTop: '30px', justifyContent: 'center' }}>Contact Enterprise</button>
            </div>
          </div>
        </section>

        {/* Social Proof / Success Stories */}
        <section id="social-proof" style={{
          padding: '80px 20px',
          borderTop: '1px solid var(--border-light)',
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 700, marginBottom: '40px' }}>
            Trusted by Elite Data Teams
          </h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            flexWrap: 'wrap',
            alignItems: 'center',
            opacity: 0.6,
            marginBottom: '60px'
          }}>
            <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '0.1em' }}>ALPHATECH</span>
            <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '0.1em' }}>NEXUSDATA</span>
            <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '0.1em' }}>VECTORLAB</span>
            <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '0.1em' }}>QUANTUMFLOW</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            textAlign: 'left'
          }}>
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              borderRadius: '20px',
              padding: '30px'
            }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '20px' }}>
                "VibeFlow reduced our pipelines' execution overhead by 68%. The isolated calculations make handling multi-currency contracts dynamic and seamless."
              </p>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>Marcus Chen</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>VP of Data, NexusData</div>
            </div>
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              borderRadius: '20px',
              padding: '30px'
            }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '20px' }}>
                "The bento-to-accordion layout makes the dashboard extremely intuitive on our support tablets, retaining context instantly when engineers move around."
              </p>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>Sophia Patel</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Engineering Lead, VectorLab</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer style={{
        borderTop: '1px solid var(--border-light)',
        padding: '60px 40px',
        backgroundColor: 'var(--bg-secondary)',
        color: 'var(--text-muted)',
        fontSize: '14px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '40px',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'left',
          marginBottom: '40px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-primary)', marginBottom: '16px' }}>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 14,
                color: '#fff'
              }}>V</div>
              <span style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>VibeFlow</span>
            </div>
            <p style={{ maxWidth: '280px', lineHeight: 1.5 }}>
              Next-generation AI automation engine purpose-built for high-performance enterprise data workflows.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Product</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><a href="#features" style={{ transition: 'color var(--ease-micro)' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = ''}>Features</a></li>
                <li><a href="#pricing" style={{ transition: 'color var(--ease-micro)' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = ''}>Pricing Matrix</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Legal</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><a href="#" style={{ transition: 'color var(--ease-micro)' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = ''}>Privacy Policy</a></li>
                <li><a href="#" style={{ transition: 'color var(--ease-micro)' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = ''}>Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          borderTop: '1px solid var(--border-light)',
          paddingTop: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <span>&copy; 2026 VibeFlow Technologies Inc. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="https://github.com" target="_blank" style={{ transition: 'color var(--ease-micro)' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = ''}>GitHub</a>
            <a href="https://x.com" target="_blank" style={{ transition: 'color var(--ease-micro)' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = ''}>Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
