import { useState } from 'react'
import { motion } from 'framer-motion'
import Section from '../components/Section'
import { siteConfig } from '../data/siteData'

// Inquiry type options — edit this list to change the dropdown
const INQUIRY_TYPES = [
  'Research Collaboration',
  'ForecastAI Pilot Inquiry',
  'Consulting',
  'Project Discussion',
  'Speaking / Event',
  'General',
]

// What Sudipta is currently open to — edit as availability changes
const AVAILABILITY = [
  'AI research collaboration',
  'Institutional pilots for ForecastAI',
  'Consulting on AI system design',
  'Speaking and panel invitations',
  'Graduate research partnerships',
]

export default function Contact() {
  const [formState, setFormState] = useState({
    name:    '',
    email:   '',
    type:    '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors,    setErrors]    = useState({})

  // Basic front-end validation
  const validate = () => {
    const e = {}
    if (!formState.name.trim())    e.name    = 'Name is required.'
    if (!formState.email.trim())   e.email   = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(formState.email)) e.email = 'Please enter a valid email.'
    if (!formState.type)           e.type    = 'Please select an inquiry type.'
    if (!formState.message.trim()) e.message = 'Message cannot be empty.'
    return e
  }

  const handleChange = e => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    // Clear error on change
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    // NOTE: This is a frontend-only demo submission.
    // To enable real email delivery, connect to a backend or
    // use a service like Formspree, EmailJS, or Netlify Forms.
    console.log('Form submitted:', formState)
    setSubmitted(true)
  }

  return (
    <div className="nav-offset">

      {/* ════════════════════════════════════════════════════════
          PAGE HERO
          ════════════════════════════════════════════════════════ */}
      <section style={{
        padding:      'clamp(4rem, 8vw, 6rem) 0 clamp(3rem, 5vw, 4rem)',
        borderBottom: '1px solid var(--border)',
        position:     'relative',
        overflow:     'hidden',
      }}>
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
            Contact
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 }}
            style={{ maxWidth: '600px', marginBottom: '1.5rem' }}
          >
            Let's build something that matters.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            style={{
              maxWidth:   '500px',
              fontSize:   '1rem',
              lineHeight: 1.75,
              color:      'var(--muted)',
            }}
          >
            Whether you're a researcher, a health organisation, a startup, or
            someone with a problem that AI might actually solve — reach out.
            I read everything.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          MAIN CONTENT — two-column layout on desktop
          ════════════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) 0' }}>
        <div className="site-container">
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap:                 'clamp(3rem, 6vw, 5rem)',
            alignItems:          'start',
          }}>

            {/* ── LEFT COLUMN — Availability & Links ─────────── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Currently open to */}
              <div style={{ marginBottom: '3rem' }}>
                <p className="mono-label" style={{ marginBottom: '1.25rem' }}>
                  Currently open to
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {AVAILABILITY.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <span style={{
                        color:     'var(--teal)',
                        fontSize:  '0.8rem',
                        marginTop: '0.15rem',
                        flexShrink: 0,
                      }}>◈</span>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize:   '0.9rem',
                        color:      'var(--muted)',
                        lineHeight: 1.5,
                      }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct contact links */}
              <div style={{ marginBottom: '2rem' }}>
                <p className="mono-label" style={{ marginBottom: '1.25rem' }}>
                  Direct links
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {/* Email */}
                  <ContactLink
                    label="Email"
                    value={siteConfig.email}
                    href={`mailto:${siteConfig.email}`}
                    icon="✉"
                  />
                  {/* LinkedIn */}
                  <ContactLink
                    label="LinkedIn"
                    value="linkedin.com/in/sudipta-nath"
                    href={siteConfig.linkedin}
                    icon="in"
                    external
                  />
                  {/* GitHub */}
                  <ContactLink
                    label="GitHub"
                    value="github.com/sudipta-nath"
                    href={siteConfig.github}
                    icon="⌥"
                    external
                  />
                </div>
              </div>

              {/* Response time note */}
              <div style={{
                background:    'var(--surface)',
                border:        '1px solid var(--border)',
                borderRadius:  '4px',
                padding:       '1rem 1.25rem',
              }}>
                <p style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.72rem',
                  color:         'var(--dim)',
                  letterSpacing: '0.04em',
                  lineHeight:    1.6,
                }}>
                  ↳ Based in Sydney, Australia (AEST).<br />
                  I aim to respond within 48 hours.
                </p>
              </div>
            </motion.div>

            {/* ── RIGHT COLUMN — Contact Form ─────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
            >
              {submitted ? (
                /* ── Success state ─────────────────────────────── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    background:    'var(--surface)',
                    border:        '1px solid var(--teal)',
                    borderRadius:  '4px',
                    padding:       '3rem 2rem',
                    textAlign:     'center',
                  }}
                >
                  <div style={{
                    width:        '48px',
                    height:       '48px',
                    borderRadius: '50%',
                    background:   'rgba(0, 212, 194, 0.12)',
                    border:       '1px solid var(--teal)',
                    display:      'flex',
                    alignItems:   'center',
                    justifyContent: 'center',
                    margin:       '0 auto 1.5rem',
                    fontSize:     '1.25rem',
                    color:        'var(--teal)',
                  }}>
                    ✓
                  </div>
                  <h3 style={{ marginBottom: '0.75rem' }}>Message sent.</h3>
                  <p style={{ fontSize: '0.9rem', maxWidth: '320px', margin: '0 auto' }}>
                    Thank you, {formState.name.split(' ')[0]}. I'll be in touch within 48 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', type: '', message: '' }) }}
                    className="btn-secondary"
                    style={{ marginTop: '2rem', fontSize: '0.85rem' }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                /* ── Form ──────────────────────────────────────── */
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                >
                  <p className="mono-label" style={{ marginBottom: '0.25rem' }}>
                    Send a message
                  </p>

                  {/* Name */}
                  <FormField label="Name" error={errors.name}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={formState.name}
                      onChange={handleChange}
                      className="form-input"
                      style={errors.name ? { borderColor: 'var(--amber)' } : {}}
                    />
                  </FormField>

                  {/* Email */}
                  <FormField label="Email" error={errors.email}>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formState.email}
                      onChange={handleChange}
                      className="form-input"
                      style={errors.email ? { borderColor: 'var(--amber)' } : {}}
                    />
                  </FormField>

                  {/* Inquiry type */}
                  <FormField label="Inquiry type" error={errors.type}>
                    <select
                      name="type"
                      value={formState.type}
                      onChange={handleChange}
                      className="form-input"
                      style={{
                        appearance:      'none',
                        cursor:          'pointer',
                        ...(errors.type ? { borderColor: 'var(--amber)' } : {}),
                      }}
                    >
                      <option value="" disabled>Select a type…</option>
                      {INQUIRY_TYPES.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </FormField>

                  {/* Message */}
                  <FormField label="Message" error={errors.message}>
                    <textarea
                      name="message"
                      placeholder="Tell me about your project, research, or question…"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      className="form-input"
                      style={{
                        resize:    'vertical',
                        minHeight: '130px',
                        ...(errors.message ? { borderColor: 'var(--amber)' } : {}),
                      }}
                    />
                  </FormField>

                  {/* Submit */}
                  <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                    Send message →
                  </button>

                  {/* Note about backend */}
                  <p style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.65rem',
                    color:         'var(--dim)',
                    letterSpacing: '0.04em',
                    lineHeight:    1.6,
                  }}>
                    * Form currently shows a demo confirmation. Connect a backend or
                    Formspree to enable real email delivery.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  )
}

// ── Helper: Form field wrapper with label and error ────────────
function FormField({ label, children, error }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.7rem',
        color:         'var(--muted)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        {label}
      </label>
      {children}
      {error && (
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.68rem',
          color:      'var(--amber)',
        }}>
          {error}
        </span>
      )}
    </div>
  )
}

// ── Helper: Contact link row ───────────────────────────────────
function ContactLink({ label, value, href, icon, external }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel="noopener noreferrer"
      style={{
        display:       'flex',
        alignItems:    'center',
        gap:           '0.75rem',
        padding:       '0.85rem 1rem',
        background:    'var(--surface)',
        border:        '1px solid var(--border)',
        borderRadius:  '4px',
        textDecoration: 'none',
        transition:    'border-color 0.2s, background 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--indigo)'
        e.currentTarget.style.background  = 'rgba(108, 99, 255, 0.05)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.background  = 'var(--surface)'
      }}
    >
      {/* Icon */}
      <span style={{
        width:          '32px',
        height:         '32px',
        borderRadius:   '2px',
        background:     'rgba(108, 99, 255, 0.1)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexShrink:     0,
        fontFamily:     'var(--font-mono)',
        fontSize:       '0.75rem',
        color:          'var(--indigo)',
      }}>
        {icon}
      </span>

      {/* Text */}
      <div>
        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.62rem',
          color:         'var(--dim)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom:  '0.1rem',
        }}>
          {label}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   '0.85rem',
          color:      'var(--muted)',
        }}>
          {value}
        </p>
      </div>
    </a>
  )
}
