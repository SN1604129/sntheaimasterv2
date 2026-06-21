import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function readingTime(content) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    try {
      const posts = JSON.parse(localStorage.getItem('sn_blog_posts') || '[]')
      setPost(posts.find(p => p.slug === slug) || null)
    } catch { setPost(null) }
  }, [slug])

  if (!post) return (
    <div className="nav-offset" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div>
        <p className="mono-label" style={{ marginBottom: '1rem' }}>404</p>
        <h2 style={{ marginBottom: '1rem' }}>Post not found</h2>
        <Link to="/blog" className="btn-secondary">← Back to blog</Link>
      </div>
    </div>
  )

  return (
    <div className="nav-offset">
      <article>
        {/* Header */}
        <header style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(2.5rem, 5vw, 4rem) 0 clamp(2rem, 4vw, 3rem)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '30%', right: '-5%', width: '40vw', height: '40vw', maxWidth: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div className="site-container" style={{ position: 'relative', zIndex: 1, maxWidth: '780px' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <Link to="/blog" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--dim)', letterSpacing: '0.06em', textDecoration: 'none' }}>← Blog</Link>
              <span style={{ color: 'var(--border)' }}>·</span>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--dim)', letterSpacing: '0.06em' }}>
                {new Date(post.publishedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <span style={{ color: 'var(--border)' }}>·</span>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--dim)', letterSpacing: '0.06em' }}>
                {readingTime(post.content)} min read
              </p>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}
              style={{ marginBottom: '1rem', lineHeight: 1.1 }}>
              {post.title}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
              style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', lineHeight: 1.75, color: 'var(--muted)' }}>
              {post.excerpt}
            </motion.p>
          </div>
        </header>

        {/* Body */}
        <div className="site-container" style={{ padding: 'clamp(2.5rem, 5vw, 4rem) var(--gutter)', maxWidth: '780px' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {post.content.split('\n\n').map((para, i) => {
              if (para.startsWith('## ')) return (
                <h2 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', fontWeight: 700, color: 'var(--warm-white)', marginTop: '2.5rem', marginBottom: '1rem' }}>
                  {para.replace('## ', '')}
                </h2>
              )
              if (para.startsWith('### ')) return (
                <h3 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--warm-white)', marginTop: '2rem', marginBottom: '0.75rem' }}>
                  {para.replace('### ', '')}
                </h3>
              )
              return (
                <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                  {para}
                </p>
              )
            })}
          </motion.div>

          {/* Footer */}
          <div style={{ borderTop: '1px solid var(--border)', marginTop: '3rem', paddingTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '36px', height: '36px', background: 'var(--indigo)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '13px', color: '#fff', letterSpacing: '-0.04em' }}>SN</div>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--warm-white)' }}>Sudipta Nath</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--dim)', letterSpacing: '0.06em' }}>AI ENGINEER & BUILDER</p>
              </div>
            </div>
            <Link to="/blog" className="btn-secondary" style={{ fontSize: '0.85rem' }}>← All posts</Link>
          </div>
        </div>
      </article>
    </div>
  )
}
