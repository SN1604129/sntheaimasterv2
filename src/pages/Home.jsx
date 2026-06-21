import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Section, { SectionHeader } from '../components/Section'
import BuildCard from '../components/BuildCard'
import ResearchCard from '../components/ResearchCard'
import {
  siteConfig,
  credibilityItems,
  buildDomains,
  publications,
  currentFocus,
} from '../data/siteData'

// ── Stagger animation helper ───────────────────────────────────
const stagger = (i, base = 0.08) => ({
  initial:    { opacity: 0, y: 22 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay: i * base, ease: [0.25, 0.1, 0.25, 1] },
})

export default function Home() {
  return (
    <div className="nav-offset">

      {/* ════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight:      'calc(100vh - var(--nav-height))',
        display:        'flex',
        alignItems:     'center',
        paddingTop:     'clamp(3rem, 8vw, 6rem)',
        paddingBottom:  'clamp(3rem, 8vw, 6rem)',
        position:       'relative',
        overflow:       'hidden',
      }}>
        {/* Background grid dots */}
        <div style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
          backgroundSize:  '40px 40px',
          opacity:         0.4,
          pointerEvents:   'none',
        }} />

        {/* Faint indigo radial glow */}
        <div style={{
          position:         'absolute',
          top:              '20%',
          left:             '-10%',
          width:            '60vw',
          height:           '60vw',
          maxWidth:         '700px',
          maxHeight:        '700px',
          borderRadius:     '50%',
          background:       'radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)',
          pointerEvents:    'none',
        }} />

        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Mono pre-label */}
          <motion.p
            {...stagger(0)}
            className="mono-label"
            style={{ marginBottom: '1.5rem' }}
          >
            AI Engineer · Sydney, Australia · Available for projects
          </motion.p>

          {/* Main headline */}
          <motion.h1 {...stagger(1)} style={{
            maxWidth:     '820px',
            marginBottom: '1.75rem',
            lineHeight:   1.05,
          }}>
            I build AI systems that{' '}
            <span style={{ color: 'var(--indigo)', fontStyle: 'italic' }}>
              actually work
            </span>{' '}
            in production.
          </motion.h1>

          {/* Subheadline */}
          <motion.p {...stagger(2)} style={{
            maxWidth:     '580px',
            fontSize:     'clamp(1rem, 1.8vw, 1.1rem)',
            lineHeight:   1.8,
            color:        'var(--muted)',
            marginBottom: '2.5rem',
          }}>
            Not just in papers. I'm Sudipta — AI Research Engineer at Truuth, MRes AI candidate at Macquarie University,
            and published researcher in IEEE and Taylor & Francis.
            I build RAG pipelines, document intelligence systems, and LLM automation for real businesses.
          </motion.p>

          {/* CTA row */}
          <motion.div {...stagger(3)} style={{
            display:  'flex',
            gap:      '1rem',
            flexWrap: 'wrap',
          }}>
            <Link to="/demo" className="btn-primary">
              See live demos →
            </Link>
            <Link to="/contact" className="btn-secondary">
              Work with me
            </Link>
          </motion.div>

          {/* Tagline */}
          <motion.p {...stagger(4)} style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.72rem',
            color:         'var(--dim)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginTop:     '3rem',
          }}>
            Signal over noise. · github.com/SN1604129
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 2 — CREDIBILITY STRIP
          ════════════════════════════════════════════════════════ */}
      <section style={{
        borderTop:    '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background:   'var(--surface)',
        padding:      '1.5rem 0',
        overflow:     'hidden',
      }}>
        <div className="site-container">
          <div style={{
            display:        'flex',
            alignItems:     'center',
            gap:            'clamp(1.5rem, 4vw, 3rem)',
            flexWrap:       'wrap',
            justifyContent: 'center',
          }}>
            {credibilityItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                style={{ textAlign: 'center', flexShrink: 0 }}
              >
                <p style={{
                  fontFamily:  'var(--font-display)',
                  fontWeight:  700,
                  fontSize:    'clamp(0.85rem, 1.5vw, 1rem)',
                  color:       'var(--warm-white)',
                  lineHeight:  1.2,
                }}>
                  {item.value}
                </p>
                <p style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.65rem',
                  color:         'var(--dim)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginTop:     '0.2rem',
                }}>
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 3 — WHAT I BUILD
          ════════════════════════════════════════════════════════ */}
      <Section>
        <SectionHeader
          label="What I Build"
          title="Three domains, one mission."
          subtitle="Research and engineering applied where the problems are real and the stakes are high."
        />

        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap:                 '1.25rem',
        }}>
          {buildDomains.map((domain, i) => (
            <BuildCard key={domain.id} {...domain} index={i} />
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          SECTION 4 — FEATURED RESEARCH
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
          SECTION 5 — CURRENT FOCUS
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
          SECTION 6 — CONTACT CTA
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
