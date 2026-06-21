import { motion } from 'framer-motion'

/**
 * Section — Reusable page section wrapper with scroll-reveal animation.
 *
 * Props:
 *   children   — section content
 *   id         — optional anchor id
 *   style      — additional inline styles
 *   className  — additional class names
 *   noPad      — skip default vertical padding
 *   dark       — use surface background instead of void
 */
export default function Section({ children, id, style, className = '', noPad = false, dark = false }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background:    dark ? 'var(--surface)' : 'transparent',
        paddingTop:    noPad ? 0 : 'var(--section-pad)',
        paddingBottom: noPad ? 0 : 'var(--section-pad)',
        ...style,
      }}
      className={className}
    >
      <div className="site-container">
        {children}
      </div>
    </motion.section>
  )
}

/**
 * SectionHeader — Consistent heading block for sections.
 *
 * Props:
 *   label    — small mono label above the headline
 *   title    — main headline
 *   subtitle — optional subtext below headline
 */
export function SectionHeader({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      {label && (
        <p className="mono-label" style={{ marginBottom: '0.75rem' }}>
          {label}
        </p>
      )}
      <h2 style={{ marginBottom: subtitle ? '1rem' : 0 }}>{title}</h2>
      {subtitle && (
        <p style={{ maxWidth: '540px', marginTop: '0.75rem' }}>{subtitle}</p>
      )}
    </div>
  )
}
