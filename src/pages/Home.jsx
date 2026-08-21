import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Section, { SectionHeader } from '../components/Section'
import ResearchCard from '../components/ResearchCard'
import {
  publications,
  currentFocus,
} from '../data/siteData'

const businessOutcomes = [
  {
    number: '01',
    title: 'Turn more visitors into customers',
    description: 'Turn website traffic into meaningful conversations and qualified opportunities.',
  },
  {
    number: '02',
    title: 'Automate repetitive work',
    description: 'Let intelligent workflows handle routine processes so your team can focus on work that needs people.',
  },
  {
    number: '03',
    title: 'Respond when customers need you',
    description: 'Give customers useful answers and clear next steps even when your team is unavailable.',
  },
  {
    number: '04',
    title: 'Connect the way your business works',
    description: 'Connect the tools, information and workflows your business already relies on.',
  },
]

const coreServices = [
  {
    number: '01',
    title: 'AI-Powered Websites',
    description: 'Web experiences designed to do more than present information. They help guide visitors, capture the right details, qualify opportunities and connect customers to the next step.',
    capabilities: ['Lead Capture', 'Qualification', 'Customer Journeys', 'Integrations'],
    flow: ['Visitor', 'Understanding', 'Next Step'],
  },
  {
    number: '02',
    title: 'AI Agents & Automation',
    description: 'AI agents and automated workflows that handle repetitive processes, move information between systems and help your team respond faster.',
    capabilities: ['AI Agents', 'Workflow Automation', 'Follow-Up', 'Business Integrations'],
    flow: ['Trigger', 'Agent', 'Action'],
  },
  {
    number: '03',
    title: 'Custom AI Software',
    description: 'Custom software for businesses whose problems cannot be solved with an off-the-shelf tool. From intelligent internal applications to specialised AI systems, SNAI builds around the real workflow.',
    capabilities: ['Internal Tools', 'AI Applications', 'Document Intelligence', 'Custom Platforms'],
    flow: ['Data', 'Logic', 'Application'],
  },
]

const opportunityOptions = [
  'Getting more enquiries',
  'Responding to customers',
  'Reducing repetitive work',
  'Connecting existing systems',
  'Building something custom',
]

const opportunitySteps = [
  {
    label: 'Business',
    prompt: 'Tell us what you do.',
  },
  {
    label: 'Friction',
    prompt: 'Where does time or opportunity get lost?',
  },
  {
    label: 'Opportunity',
    prompt: 'We identify where technology could help.',
  },
  {
    label: 'Plan',
    prompt: 'You receive a practical recommendation.',
  },
]

// ── Stagger animation helper ───────────────────────────────────
const stagger = (i, base = 0.08) => ({
  initial:    { opacity: 0, y: 22 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay: i * base, ease: [0.25, 0.1, 0.25, 1] },
})

export default function Home() {
  const reduceMotion = useReducedMotion()
  const heroMotion = (i = 0) => reduceMotion
    ? { initial: false, animate: { opacity: 1 } }
    : stagger(i, 0.07)
  const sectionReveal = (i = 0) => reduceMotion
    ? { initial: false, whileInView: { opacity: 1 }, viewport: { once: true } }
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-70px' },
        transition: { duration: 0.45, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] },
      }

  return (
    <div className="nav-offset">

      {/* ════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ════════════════════════════════════════════════════════ */}
      <section className="snai-hero">
        <div className="site-container snai-hero-grid">
          <div className="snai-hero-copy">
            <motion.p {...heroMotion(0)} className="snai-hero-eyebrow">
              AI Engineering · Automation · Software
            </motion.p>

            <motion.h1 {...heroMotion(1)} className="snai-hero-title">
              AI systems that help <span>businesses grow.</span>
            </motion.h1>

            <motion.p {...heroMotion(2)} className="snai-hero-body">
              We build AI-powered websites, intelligent automation, AI agents and custom software that help businesses generate leads, reduce manual work and operate more effectively.
            </motion.p>

            <motion.div {...heroMotion(3)} className="snai-hero-actions">
              <Link to="/contact" className="btn-primary">
                Start a Project
              </Link>
              <Link to="/research" className="btn-secondary">
                Explore Our Work
              </Link>
            </motion.div>

            <motion.p {...heroMotion(4)} className="snai-hero-trust">
              <span aria-hidden="true" />
              Sydney, Australia · Working globally
            </motion.p>
          </div>

          <motion.div
            {...heroMotion(2)}
            aria-hidden="true"
          >
            <IntelligentFlowVisual reduceMotion={reduceMotion} />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 2 — BUSINESS OUTCOMES
          ════════════════════════════════════════════════════════ */}
      <section className="snai-outcomes" aria-labelledby="business-outcomes-title">
        <div className="site-container snai-outcomes-grid">
          <motion.div {...sectionReveal(0)} className="snai-outcomes-intro">
            <p className="type-eyebrow">Business Outcomes</p>
            <h2 id="business-outcomes-title">
              Your technology should do more than just exist.
            </h2>
            <p>
              It should help you win customers, remove repetitive work and make your business easier to run.
            </p>
          </motion.div>

          <div className="snai-outcomes-list">
            {businessOutcomes.map((outcome, i) => (
              <motion.article
                key={outcome.number}
                {...sectionReveal(i + 1)}
                className="snai-outcome-item"
              >
                <span className="snai-outcome-number">{outcome.number}</span>
                <div>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 3 — CORE SERVICES
          ════════════════════════════════════════════════════════ */}
      <section className="snai-services" aria-labelledby="core-services-title">
        <div className="site-container">
          <motion.div {...sectionReveal(0)} className="snai-services-header">
            <p className="type-eyebrow">Services</p>
            <h2 id="core-services-title">
              Built around the problems your business needs solved.
            </h2>
            <p>
              From customer-facing websites to internal automation and custom software, SNAI designs systems around how your business actually works.
            </p>
          </motion.div>

          <div className="snai-services-list">
            {coreServices.map((service, i) => (
              <ServiceBlock
                key={service.number}
                service={service}
                revealProps={sectionReveal(i + 1)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 4 — AI OPPORTUNITY
          ════════════════════════════════════════════════════════ */}
      <section className="snai-opportunity" aria-labelledby="ai-opportunity-title">
        <div className="site-container snai-opportunity-grid">
          <motion.div {...sectionReveal(0)} className="snai-opportunity-copy">
            <p className="type-eyebrow">AI Opportunity</p>
            <h2 id="ai-opportunity-title">
              Not sure where AI fits into your business?
            </h2>
            <p>
              Tell us how your business works, where time gets lost and what you want to improve. SNAI can help identify where AI, automation or better software could make a practical difference.
            </p>
            <p className="snai-opportunity-principle">
              Start with the problem. We'll work backwards to the right system.
            </p>
            <div className="snai-opportunity-actions">
              <Link to="/contact" className="btn-primary">
                Talk About Your Business
              </Link>
              <span>No technical knowledge needed. Start with how your business works.</span>
            </div>
          </motion.div>

          <motion.div {...sectionReveal(1)}>
            <BusinessAnalysisPreview />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 5 — FEATURED RESEARCH
          ════════════════════════════════════════════════════════ */}
      <Section dark>
        <SectionHeader
          label="Research"
          title="Peer-reviewed work."
          subtitle="Published in IEEE and Taylor & Francis. Methodology that earns its place."
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {publications.map((pub, i) => (
            <ResearchCard key={pub.id} type="publication" {...pub} index={i} />
          ))}
        </div>

        <div style={{ marginTop: '2rem' }}>
          <Link to="/research" className="btn-secondary">
            View all research →
          </Link>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          SECTION 6 — CURRENT FOCUS
          ════════════════════════════════════════════════════════ */}
      <Section>
        <SectionHeader
          label="Current Focus"
          title="What's being built."
        />

        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap:                 '1.25rem',
        }}>
          {currentFocus.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background:    'var(--surface)',
                border:        '1px solid var(--border)',
                borderRadius:  '4px',
                padding:       '1.75rem',
                display:       'flex',
                flexDirection: 'column',
                gap:           '0.75rem',
              }}
            >
              {/* Status tag */}
              <span className="mono-label" style={{
                display:      'inline-block',
                width:        'fit-content',
                background:   'rgba(108, 99, 255, 0.1)',
                padding:      '0.2rem 0.6rem',
                borderRadius: '2px',
                fontSize:     '0.62rem',
              }}>
                {item.tag}
              </span>

              {/* Name */}
              <h3 style={{
                fontFamily:  'var(--font-display)',
                fontSize:    '1.1rem',
                fontWeight:  700,
                color:       'var(--warm-white)',
              }}>
                {item.name}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '0.88rem',
                color:      'var(--muted)',
                lineHeight: 1.7,
              }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          SECTION 7 — CONTACT CTA
          ════════════════════════════════════════════════════════ */}
      <section style={{
        borderTop:  '1px solid var(--border)',
        padding:    'clamp(4rem, 7vw, 6rem) 0',
        background: 'var(--surface)',
        textAlign:  'center',
        position:   'relative',
        overflow:   'hidden',
      }}>
        {/* Faint teal glow behind */}
        <div style={{
          position:      'absolute',
          bottom:        '-20%',
          right:         '-10%',
          width:         '50vw',
          height:        '50vw',
          maxWidth:      '600px',
          borderRadius:  '50%',
          background:    'radial-gradient(circle, rgba(0,212,194,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mono-label"
            style={{ marginBottom: '1rem' }}
          >
            Work Together
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ maxWidth: '600px', margin: '0 auto 1.25rem' }}
          >
            Looking to collaborate on AI research or build something real?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            style={{ maxWidth: '460px', margin: '0 auto 2.5rem' }}
          >
            Open to research collaboration, institutional AI pilots, consulting on
            AI system design, and project discussions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.26 }}
          >
            <Link to="/contact" className="btn-amber">
              Get in touch →
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

function BusinessAnalysisPreview() {
  const [selectedOpportunity, setSelectedOpportunity] = useState(opportunityOptions[2])

  return (
    <div className="snai-analysis-preview" aria-label="AI Business Opportunity Analysis preview">
      <div className="snai-analysis-topline">
        <span>Business Analysis</span>
        <span>Preview only</span>
      </div>

      <fieldset className="snai-analysis-question">
        <legend>What would you most like to improve?</legend>
        <div className="snai-analysis-options">
          {opportunityOptions.map(option => (
            <label
              key={option}
              className="snai-analysis-option"
            >
              <input
                type="radio"
                name="opportunity-preview"
                value={option}
                checked={selectedOpportunity === option}
                onChange={() => setSelectedOpportunity(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <ol className="snai-analysis-steps" aria-label="Future analysis flow">
        {opportunitySteps.map((step, i) => (
          <li key={step.label}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <strong>{step.label}</strong>
              <p>{step.prompt}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="snai-analysis-note">
        Preview only. Nothing is submitted, analysed or saved here yet.
      </p>
    </div>
  )
}

function ServiceBlock({ service, revealProps }) {
  return (
    <motion.article {...revealProps} className="snai-service-block">
      <span className="snai-service-number">{service.number}</span>

      <div className="snai-service-copy">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <div className="snai-service-tags" aria-label={`${service.title} capabilities`}>
          {service.capabilities.map(capability => (
            <span key={capability}>{capability}</span>
          ))}
        </div>
      </div>

      <div className="snai-service-visual" aria-hidden="true">
        {service.flow.map((label, i) => (
          <div key={label} className="snai-service-step">
            <span>{label}</span>
            {i < service.flow.length - 1 && <i />}
          </div>
        ))}
      </div>
    </motion.article>
  )
}

function IntelligentFlowVisual({ reduceMotion }) {
  const pathTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.35 }

  const pulseTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 5.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }

  return (
    <div className="snai-flow-panel">
      <svg viewBox="0 0 460 430" role="presentation" focusable="false">
        <defs>
          <linearGradient id="flowLine" x1="62" y1="80" x2="380" y2="350" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--primary-blue)" stopOpacity="0.72" />
            <stop offset="0.54" stopColor="var(--cyan)" stopOpacity="0.56" />
            <stop offset="1" stopColor="var(--violet)" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="flowNode" cx="0" cy="0" r="1">
            <stop stopColor="var(--text-primary)" />
            <stop offset="1" stopColor="var(--primary-blue)" stopOpacity="0.25" />
          </radialGradient>
        </defs>

        <motion.path
          d="M76 91 C155 60 185 148 231 178 C289 216 321 195 382 262"
          fill="none"
          stroke="url(#flowLine)"
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={pathTransition}
        />
        <motion.path
          d="M91 311 C165 244 218 280 274 315 C320 343 352 337 397 314"
          fill="none"
          stroke="url(#flowLine)"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.62"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.62 }}
          transition={reduceMotion ? pathTransition : { ...pathTransition, delay: 0.52 }}
        />
        <motion.circle cx="76" cy="91" r="7" fill="url(#flowNode)" animate={reduceMotion ? { opacity: 0.86 } : { opacity: [0.72, 1] }} transition={pulseTransition} />
        <motion.circle cx="231" cy="178" r="9" fill="url(#flowNode)" animate={reduceMotion ? { opacity: 0.78 } : { opacity: [0.58, 0.95] }} transition={{ ...pulseTransition, delay: 0.4 }} />
        <motion.circle cx="382" cy="262" r="7" fill="url(#flowNode)" animate={reduceMotion ? { opacity: 0.86 } : { opacity: [0.66, 1] }} transition={{ ...pulseTransition, delay: 0.8 }} />
        <motion.circle cx="91" cy="311" r="5" fill="var(--cyan)" opacity="0.55" animate={reduceMotion ? { opacity: 0.55 } : { opacity: [0.38, 0.72] }} transition={{ ...pulseTransition, delay: 1.1 }} />
        <motion.circle cx="397" cy="314" r="5" fill="var(--violet)" opacity="0.5" animate={reduceMotion ? { opacity: 0.5 } : { opacity: [0.34, 0.68] }} transition={{ ...pulseTransition, delay: 1.3 }} />
      </svg>

      <div className="snai-flow-label input">
        <small>Input</small>
        <strong>Business signals</strong>
        <p>Enquiries, data, documents and workflows.</p>
      </div>
      <div className="snai-flow-label intelligence">
        <small>Intelligence</small>
        <strong>AI logic</strong>
        <p>Systems designed around decisions and context.</p>
      </div>
      <div className="snai-flow-label outcome">
        <small>Outcome</small>
        <strong>Useful action</strong>
        <p>Better leads, faster work and clearer operations.</p>
      </div>
    </div>
  )
}
