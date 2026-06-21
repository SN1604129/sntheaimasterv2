import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function readingTime(content) {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export default function Blog() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('sn_blog_posts') || '[]')
      setPosts(stored.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)))
    } catch { setPosts([]) }
  }, [])

  return (
    <div className="nav-offset">
      <section style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(2.5rem, 5vw, 4rem) 0 clamp(2rem, 4vw, 3rem)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '-5%', width: '40vw', height: '40vw', maxWidth: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,194,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mono-label" style={{ marginBottom: '0.75rem' }}>
            Writing · AI Research & Engineering
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}
            style={{ maxWidth: '600px', marginBottom: '0.9rem', lineHeight: 1.05 }}>
            Signal over{' '}
            <span style={{ color: 'var(--teal)', fontStyle: 'italic' }}>noise.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
            style={{ maxWidth: '480px', fontSize: 'clamp(0.9rem, 1.6vw, 1rem)', lineHeight: 1.75, color: 'var(--muted)' }}>
            Practical writing on AI engineering, research, and building real systems. No fluff.
          </motion.p>
        </div>
      </section>

      <div className="site-container" style={{ padding: 'clamp(2.5rem, 5vw, 4rem) var(--gutter)' }}>
        {posts.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', color: 'var(--border)', marginBottom: '1rem' }}>◈</p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--muted)', fontWeight: 400 }}>
              First post coming soon.
            </h3>
          </motion.div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', borderTop: '1px solid var(--border)' }}>
            {posts.map((post, i) => (
              <motion.div key={post.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ borderBottom: '1px solid var(--border)', padding: '1.75rem 0', display: 'flex', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(108,99,255,0.03)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <div style={{ minWidth: '120px', flexShrink: 0 }}>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--dim)', letterSpacing: '0.06em' }}>
                        {new Date(post.publishedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--dim)', marginTop: '0.2rem' }}>
                        {readingTime(post.content)} min read
                      </p>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 700, color: 'var(--warm-white)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                        {post.title}
                      </h2>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                        {post.excerpt}
                      </p>
                    </div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--indigo)', flexShrink: 0, alignSelf: 'center' }}>→</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
