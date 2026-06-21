import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Section, { SectionHeader } from '../components/Section'
import ResearchCard from '../components/ResearchCard'
import {
  siteConfig,
  publications,
  researchProjects,
  researchInterests,
} from '../data/siteData'

export default function Research() {
  return (
    <div className="nav-offset">

      {/* ════════════════════════════════════════════════════════
          PAGE HERO
          ════════════════════════════════════════════════════════ */}
      <section style={{
        padding:    'clamp(4rem, 8vw, 6rem) 0 clamp(3rem, 5vw, 4rem)',
        borderBottom: '1px solid var(--border)',
        position:   'relative',
        overflow:   'hidden',
      }}>
        {/* Grid dots */}
        <div style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
          backgroundSize:  '40px 40px',
          opacity:         0.3,
          pointerEvents:   'none',
        }} />

        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mono-label"
            style={{ marginBottom: '1rem' }}
          >
            Research
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 }}
            style={{ maxWidth: '680px', marginBottom: '1.5rem' }}
          >
            Published work &amp; active research.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            style={{
              maxWidth:   '520px',
              fontSize:   '1rem',
              lineHeight: 1.75,
              color:      'var(--muted)',
            }}
          >
            I build models where interpretability is not optional — because the
            decisions they support affect real people. Peer-reviewed output in
            IEEE and Taylor &amp; Francis, with ongoing research in predictive
            health AI and multimodal learning.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 1 — PUBLICATIONS
          ════════════════════════════════════════════════════════ */}
      <Section>
        <SectionHeader
          label="Publications"
          title="Peer-reviewed papers."
          subtitle="Indexed in IEEE Xplore and Taylor & Francis. Click a card to view the full citation and DOI."
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {publications.map((pub, i) => (
            <ResearchCard key={pub.id} type="publication" {...pub} index={i} />
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          SECTION 2 — RESEARCH INTERESTS
          ════════════════════════════════════════════════════════ */}
      <Section dark>
        <SectionHeader
          label="Research Interests"
          title="What I think about."
        />

        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap:                 '1rem',
        }}>
          {researchInterests.map((interest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              style={{
                background:    'var(--void)',
                border:        '1px solid var(--border)',
                borderRadius:  '4px',
                padding:       '1.25rem 1.5rem',
                display:       'flex',
                alignItems:    'flex-start',
                gap:           '0.75rem',
              }}
            >
              {/* Indigo dot */}
              <span style={{
                width:        '6px',
                height:       '6px',
                minWidth:     '6px',
                borderRadius: '50%',
                background:   'var(--indigo)',
                marginTop:    '0.45rem',
                animation:    'pulse-dot 2.5s ease-in-out infinite',
                animationDelay: `${i * 0.3}s`,
              }} />
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '0.9rem',
                color:      'var(--muted)',
                lineHeight: 1.5,
              }}>
                {interest}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          SECTION 3 — ACTIVE RESEARCH PROJECTS
          ════════════════════════════════════════════════════════ */}
      <Section>
        <SectionHeader
          label="Projects"
          title="What's being built."
          subtitle="Active experiments, prototypes, and completed research work."
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {researchProjects.map((proj, i) => (
            <ResearchCard
              key={proj.id}
              type="project"
              title={proj.name}
              abstract={proj.description}
              methodology={proj.methodology}
              status={proj.status}
              tags={[]}
              index={i}
            />
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          SECTION 4 — COLLABORATE CTA
          ════════════════════════════════════════════════════════ */}
      <section style={{
        borderTop:  '1px solid var(--border)',
        background: 'var(--surface)',
        padding:    'clamp(3.5rem, 6vw, 5rem) 0',
        textAlign:  'center',
      }}>
        <div className="site-container">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mono-label"
            style={{ marginBottom: '1rem' }}
          >
            Collaborate
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            style={{ maxWidth: '560px', margin: '0 auto 1rem' }}
          >
            Interested in this research?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            style={{ maxWidth: '420px', margin: '0 auto 2rem' }}
          >
            Open to research collaboration, peer review, dataset sharing,
            and institutional pilot partnerships — especially in public health AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
          >
            <Link to="/contact" className="btn-primary">
              Start a conversation →
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
