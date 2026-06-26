import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
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

const motionVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -28 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  },
  fadeRight: {
    hidden: { opacity: 0, x: 28 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } }
  },
  staggerChildren: {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } }
  }
};

const floatMotion = {
  animate: {
    y: [0, -10, 0],
    x: [0, 5, 0],
    transition: { duration: 4.6, ease: 'easeInOut', repeat: Infinity }
  }
};

// Features Data
const features = [
  {
    title: 'AI Ingestion Engine',
    description: 'Ingest millions of unstructured documents per second with smart schema mapping and automated normalizations.',
    badge: 'Fastest Ingestion',
    details: 'Leverage cluster-based distributed execution to parse CSV, JSON, and PDF files. Automatic layout-detection preserves context.'
  },
  {
    title: 'Matrix Pipeline Automations',
    description: 'Map data pipelines visually or via prompt instructions. Run multi-stage transforms dynamically.',
    badge: 'No-Code Workflow',
    details: 'Define inputs, operations, and destination targets. Features self-healing pipelines that correct schema drift automatically.'
  },
  {
    title: 'Real-time Vector Search',
    description: 'Query dataset stores instantly with hybrid embedding vector searches and sub-millisecond retrieval.',
    badge: 'Sub-ms Search',
    details: 'Integrated vector indexing engine with dynamic semantic rankers. Instantly connect results to downstream LLM contexts.'
  },
  {
    title: 'Enterprise Governance',
    description: 'Maintain absolute clarity with cell-level audit logs, field-level access, and SOC-2 standard controls.',
    badge: 'SOC-2 Ready',
    details: 'Robust access control policies, strict audit trails, and automatic end-to-end data encryption.'
  }
];

const testimonials = [
  {
    quote: 'VibeFlow reduced our pipelines execution overhead by 68%. The isolated calculations make handling multi-currency contracts dynamic and seamless.',
    name: 'Marcus Chen',
    role: 'VP of Data, NexusData',
    company: 'NexusData'
  },
  {
    quote: 'The bento-to-accordion layout makes the dashboard extremely intuitive on our support tablets, retaining context instantly when engineers move around.',
    name: 'Sophia Patel',
    role: 'Engineering Lead, VectorLab',
    company: 'VectorLab'
  },
  {
    quote: 'Switching to VibeFlow unlocked performant matrix transformations across our global ingestion systems while keeping every plan transparent.',
    name: 'Arjun Nayak',
    role: 'CTO, AlphaTech',
    company: 'AlphaTech'
  }
];

const faqs = [
  {
    question: 'How does the pricing change with annual plans?',
    answer: 'Annual plans apply a flat 20% discount across all tiers and bill once per year while preserving the same usage limits and support benefits.'
  },
  {
    question: 'Can I switch currencies anytime?',
    answer: 'Yes. Currency selection updates prices instantly in USD, INR, or EUR using the current conversion rate matrix.'
  },
  {
    question: 'Is there an enterprise onboarding package?',
    answer: 'Enterprise plans include dedicated setup, compliance support, and custom onboarding tailored to your data governance requirements.'
  }
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [stats, setStats] = useState({ pipelines: 0, queries: 0, velocity: 0 });

  const currencyRef = useRef('USD');
  const billingRef = useRef('monthly');

  const priceStarterRef = useRef(null);
  const priceProfessionalRef = useRef(null);
  const priceEnterpriseRef = useRef(null);

  const btnMonthlyRef = useRef(null);
  const btnAnnualRef = useRef(null);
  const selectCurrencyRef = useRef(null);

  const updatePricingDOM = () => {
    const currency = currencyRef.current;
    const billing = billingRef.current;
    const data = pricingMatrix[currency];
    const discount = billing === 'annual' ? 0.8 : 1.0;
    const period = billing === 'annual' ? '/yr' : '/mo';

    if (priceStarterRef.current) {
      const value = Math.round(baseRates.Starter * data.rate * discount * (billing === 'annual' ? 12 : 1));
      priceStarterRef.current.innerHTML = `${data.symbol}${value.toLocaleString()}<span class="price-period">${period}</span>`;
    }
    if (priceProfessionalRef.current) {
      const value = Math.round(baseRates.Professional * data.rate * discount * (billing === 'annual' ? 12 : 1));
      priceProfessionalRef.current.innerHTML = `${data.symbol}${value.toLocaleString()}<span class="price-period">${period}</span>`;
    }
    if (priceEnterpriseRef.current) {
      const value = Math.round(baseRates.Enterprise * data.rate * discount * (billing === 'annual' ? 12 : 1));
      priceEnterpriseRef.current.innerHTML = `${data.symbol}${value.toLocaleString()}<span class="price-period">${period}</span>`;
    }
  };

  useEffect(() => {
    updatePricingDOM();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = document.getElementById('entrance-loader');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  useEffect(() => {
    const target = { pipelines: 520, queries: 98, velocity: 36 };
    let start = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / 900, 1);

      setStats({
        pipelines: Math.round(target.pipelines * progress),
        queries: Math.round(target.queries * progress),
        velocity: Math.round(target.velocity * progress)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleBillingToggle = (cycle) => {
    billingRef.current = cycle;
    if (cycle === 'monthly') {
      btnMonthlyRef.current?.classList.add('active');
      btnAnnualRef.current?.classList.remove('active');
    } else {
      btnAnnualRef.current?.classList.add('active');
      btnMonthlyRef.current?.classList.remove('active');
    }
    updatePricingDOM();
  };

  const handleCurrencyChange = (event) => {
    currencyRef.current = event.target.value;
    updatePricingDOM();
  };

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  const currentTestimonial = testimonials[testimonialIndex];

  return (
    <div className="app-shell">
      <div id="entrance-loader" className="entrance-loader" role="status" aria-label="Loading">
        <div className="spinner" />
      </div>

      <div className="page-background" aria-hidden="true">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <header className="site-header" aria-label="Main navigation">
        <motion.div
          className="nav-shell"
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <a href="#top" className="brand" aria-label="VibeFlow home">
            <span className="brand-mark">V</span>
            <span>VibeFlow</span>
          </a>

          <nav id="primary-navigation" className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary">
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="#social-proof" onClick={() => setMenuOpen(false)}>Success Stories</a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          </nav>
          <div className={`nav-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} aria-hidden="true" />

          <div className="nav-actions">
            <a href="#pricing" className="btn-secondary">Get Started</a>
            <button
              type="button"
              className={`menu-toggle ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </motion.div>
      </header>

      <main>
        <section className="hero-section" id="top">
          <motion.div
            className="hero-copy"
            variants={motionVariants.staggerChildren}
            initial="hidden"
            animate="show"
          >
            <motion.span className="eyebrow" variants={motionVariants.fadeUp}>
              INTELLIGENT DATA AUTOMATION
            </motion.span>
            <motion.h1 variants={motionVariants.fadeUp}>
              Automate Your Data Pipelines at Scale with{' '}
              <span className="gradient-text">premium AI orchestration</span>
            </motion.h1>
            <motion.p variants={motionVariants.fadeUp}>
              Accelerate ingestion, run complex matrix mappings, and trigger real-time actions with localized,
              state-isolated agent models built for modern teams.
            </motion.p>

            <motion.div className="hero-actions" variants={motionVariants.fadeUp}>
              <motion.a href="#pricing" className="btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}>
                View Pricing Plans <ArrowRight size={18} />
              </motion.a>
              <motion.a href="#features" className="btn-secondary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}>
                Explore the Bento Grid
              </motion.a>
            </motion.div>

            <motion.div className="trusted-strip" aria-label="Trusted by companies" variants={motionVariants.fadeUp}>
              <span>Trusted by</span>
              <div className="trusted-logos">
                <span>ALPHATECH</span>
                <span>NEXUSDATA</span>
                <span>VECTORLAB</span>
                <span>QUANTUMFLOW</span>
              </div>
            </motion.div>

            <motion.div className="hero-floating-icon hero-floating-icon-1" animate={floatMotion.animate}>
              <Sparkles size={18} />
            </motion.div>
            <motion.div className="hero-floating-icon hero-floating-icon-2" animate={floatMotion.animate}>
              <Sparkles size={18} />
            </motion.div>
          </motion.div>
        </section>

        <motion.section
          className="section-wrap"
          id="features"
          variants={motionVariants.staggerChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="section-heading" variants={motionVariants.fadeRight}>
            <span className="section-label">Advanced Feature Suite</span>
            <p>Interact with the Bento Grid or Accordion to view functional capabilities with smooth animated transitions.</p>
          </motion.div>

          <motion.div className="bento-grid" variants={motionVariants.staggerChildren}>
            {features.map((feature, idx) => (
              <motion.article
                key={feature.title}
                className={`bento-card ${idx === 0 || idx === 3 ? 'col-2' : ''} ${activeIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                variants={motionVariants.fadeUp}
                whileHover={{ y: -6, rotate: 0.2, scale: 1.01 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className="card-top">
                  <div className="card-icon">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
                <div className="card-footer">
                  <span className="badge">{feature.badge}</span>
                  <p className={`card-detail ${activeIndex === idx ? 'visible' : ''}`}>{feature.details}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <div className="accordion-wrapper">
            {features.map((feature, idx) => (
              <div key={feature.title} className={`accordion-item ${activeIndex === idx ? 'active' : ''}`}>
                <button type="button" className="accordion-header" onClick={() => setActiveIndex(idx)} aria-expanded={activeIndex === idx}>
                  <span>{feature.title}</span>
                  <span className="accordion-icon">▾</span>
                </button>
                <div className="accordion-content">
                  <p>{feature.description}</p>
                  <p>{feature.details}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="stats-section"
          variants={motionVariants.staggerChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="stats-grid">
            <motion.div className="stat-card" variants={motionVariants.fadeLeft} whileHover={{ y: -4 }}>
              <div className="stat-title">Active Pipelines</div>
              <div className="stat-value">{stats.pipelines}+</div>
              <div className="stat-note">Built with zero friction orchestration.</div>
            </motion.div>
            <motion.div className="stat-card" variants={motionVariants.fadeUp} whileHover={{ y: -4 }}>
              <div className="stat-title">Global Queries</div>
              <div className="stat-value">{stats.queries}M+</div>
              <div className="stat-note">Hybrid vector search across all datasets.</div>
            </motion.div>
            <motion.div className="stat-card" variants={motionVariants.fadeRight} whileHover={{ y: -4 }}>
              <div className="stat-title">Workflow Velocity</div>
              <div className="stat-value">{stats.velocity}x</div>
              <div className="stat-note">Optimized throughput for enterprise teams.</div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="section-wrap pricing-section"
          id="pricing"
          variants={motionVariants.staggerChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="section-heading" variants={motionVariants.fadeRight}>
            <span className="section-label">Transparent Tariff Matrix</span>
            <p>Base USD rate factors in dynamic conversion, regional tariffs (INR, USD, EUR), and a flat 20% annual discount multiplier.</p>
          </motion.div>

          <motion.div className="pricing-controls" variants={motionVariants.fadeUp}>
            <div className="billing-switch" role="group" aria-label="Billing frequency">
              <button type="button" ref={btnMonthlyRef} className="billing-btn active" onClick={() => handleBillingToggle('monthly')}>
                Monthly
              </button>
              <button type="button" ref={btnAnnualRef} className="billing-btn" onClick={() => handleBillingToggle('annual')}>
                Annual (20% Off)
              </button>
            </div>
            <select ref={selectCurrencyRef} className="currency-select" onChange={handleCurrencyChange} aria-label="Select currency">
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </motion.div>

          <motion.div className="pricing-grid" variants={motionVariants.staggerChildren}>
            <motion.article className="pricing-card" variants={motionVariants.fadeLeft} whileHover={{ y: -6 }}>
              <div className="pricing-card-head">
                <span className="tier-label">Starter</span>
                <p className="tier-caption">Best for single pipelines</p>
              </div>
              <div className="price-container">
                <div ref={priceStarterRef} className="price-value">-</div>
              </div>
              <ul className="pricing-list">
                <li>1 Active Pipeline</li>
                <li>50,000 Ingestions / mo</li>
                <li>Community Support</li>
              </ul>
              <button className="btn-secondary pricing-action">Choose Starter</button>
            </motion.article>

            <motion.article className="pricing-card pricing-card-highlight" variants={motionVariants.fadeUp} whileHover={{ y: -8 }}>
              <div className="pricing-card-head">
                <span className="tier-label premium">Professional</span>
                <p className="tier-caption">Most popular for growing teams</p>
              </div>
              <div className="price-container">
                <div ref={priceProfessionalRef} className="price-value">-</div>
              </div>
              <ul className="pricing-list">
                <li>10 Active Pipelines</li>
                <li>500,000 Ingestions / mo</li>
                <li>Priority Support (24h)</li>
                <li>Custom Mappings & Vectors</li>
              </ul>
              <button type="button" className="btn-primary pricing-action">Choose Professional</button>
            </motion.article>

            <motion.article className="pricing-card" variants={motionVariants.fadeRight} whileHover={{ y: -6 }}>
              <div className="pricing-card-head">
                <span className="tier-label">Enterprise</span>
                <p className="tier-caption">Custom compliance & high volume</p>
              </div>
              <div className="price-container">
                <div ref={priceEnterpriseRef} className="price-value">-</div>
              </div>
              <ul className="pricing-list">
                <li>Unlimited Pipelines</li>
                <li>Unlimited Ingestions</li>
                <li>Dedicated Slack Support</li>
                <li>SOC-2 compliance & cells</li>
              </ul>
              <button type="button" className="btn-secondary pricing-action">Contact Enterprise</button>
            </motion.article>
          </motion.div>
        </motion.section>

        <motion.section
          className="section-wrap testimonials-section"
          id="social-proof"
          variants={motionVariants.staggerChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="section-heading" variants={motionVariants.fadeRight}>
            <span className="section-label">Trusted by Elite Data Teams</span>
            <p>Learn why modern analytics organizations rely on VibeFlow for precision, speed, and governance.</p>
          </motion.div>

          <motion.div className="testimonial-shell" variants={motionVariants.fadeUp}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.name}
                id={`testimonial-panel-${testimonialIndex}`}
                className="testimonial-card"
                role="tabpanel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                <div className="testimonial-top">
                  <div className="testimonial-avatar">{currentTestimonial.name.charAt(0)}</div>
                  <div>
                    <div className="testimonial-name">{currentTestimonial.name}</div>
                    <div className="testimonial-role">{currentTestimonial.role}</div>
                  </div>
                </div>
                <p className="testimonial-quote">“{currentTestimonial.quote}”</p>
                <span className="testimonial-company">{currentTestimonial.company}</span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="testimonial-dots" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((item, index) => (
              <button
                type="button"
                key={item.name}
                role="tab"
                className={testimonialIndex === index ? 'dot active' : 'dot'}
                onClick={() => setTestimonialIndex(index)}
                aria-label={`View testimonial from ${item.name}`}
                aria-selected={testimonialIndex === index}
                aria-controls={`testimonial-panel-${index}`}
              />
            ))}
          </div>
        </motion.section>

        <motion.section
          className="section-wrap faq-section"
          id="faq"
          variants={motionVariants.staggerChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
        >
          <motion.div className="section-heading" variants={motionVariants.fadeRight}>
            <span className="section-label">FAQ</span>
            <p>Find answers to the most common questions about billing, currency conversion, and enterprise support.</p>
          </motion.div>

          <motion.div className="faq-grid" variants={motionVariants.staggerChildren}>
            {faqs.map((item, index) => (
              <motion.div key={item.question} className={`faq-card ${activeFaq === index ? 'open' : ''}`} variants={motionVariants.scaleIn}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={activeFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{item.question}</span>
                  <span className="faq-arrow">{activeFaq === index ? '−' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      className="faq-answer"
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <div>
            <div className="brand-footer">
              <span className="brand-mark">V</span>
              <span>VibeFlow</span>
            </div>
            <p>Next-generation AI automation engine purpose-built for high-performance enterprise data workflows.</p>
          </div>

          <div className="footer-links">
            <div>
              <h3>Product</h3>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing Matrix</a>
            </div>
            <div>
              <h3>Legal</h3>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 VibeFlow Technologies Inc. All rights reserved.</span>
          <div className="footer-socials">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.18 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.61.07-.61 1 .07 1.53 1.04 1.53 1.04.89 1.52 2.34 1.08 2.9.82.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.67-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.8c.85.004 1.71.11 2.5.32 1.9-1.3 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.58 1.03 2.67 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10Z" />
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1s-1.73.7-2.74 1.07A4.48 4.48 0 0 0 16.5 0c-2.58 0-4.67 2.3-4.11 5.18A12.94 12.94 0 0 1 1.64 1.15 4.48 4.48 0 0 0 3 7.79 4.48 4.48 0 0 1 .88 6.64v.06A4.48 4.48 0 0 0 4.47 11a4.48 4.48 0 0 1-2 .08 4.48 4.48 0 0 0 4.18 3.11A8.97 8.97 0 0 1 0 18.58a12.67 12.67 0 0 0 6.92 2.03c8.3 0 12.84-7.02 12.84-13.11 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 23 3Z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
