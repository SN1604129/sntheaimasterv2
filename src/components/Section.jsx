import { motion } from 'framer-motion'

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0 },
}

const widthMap = {
  default: 'var(--site-max)',
  wide:    'var(--site-wide)',
  content: 'var(--content-max)',
  text:    'var(--text-measure)',
}

export function Container({ children, className = '', style, width = 'default', as: Tag = 'div' }) {
  return (
    <Tag
      className={`site-container ${className}`.trim()}
      style={{
        maxWidth: widthMap[width] || widthMap.default,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}

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
 *   width      — default | wide | content | text
 *   revealOnScroll — enable/disable subtle reveal motion
 */
export default function Section({
  children,
  id,
  style,
  className = '',
  noPad = false,
  dark = false,
  width = 'default',
  revealOnScroll = true,
}) {
  return (
    <motion.section
      id={id}
      initial={revealOnScroll ? 'hidden' : false}
      whileInView={revealOnScroll ? 'show' : undefined}
      variants={revealOnScroll ? reveal : undefined}
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
      <Container width={width}>
        {children}
      </Container>
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
 *   align    — left | center
 */
export function SectionHeader({ label, title, subtitle, align = 'left', className = '', style }) {
  const centered = align === 'center'

  return (
    <div
      className={className}
      style={{
        marginBottom: '3rem',
        textAlign: centered ? 'center' : 'left',
        ...style,
      }}
    >
      {label && (
        <p className="mono-label" style={{ marginBottom: '0.75rem' }}>
          {label}
        </p>
      )}
      <h2 style={{ marginBottom: subtitle ? '1rem' : 0 }}>{title}</h2>
      {subtitle && (
        <p style={{
          maxWidth: '540px',
          marginTop: '0.75rem',
          marginLeft: centered ? 'auto' : 0,
          marginRight: centered ? 'auto' : 0,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
