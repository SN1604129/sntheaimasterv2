import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ADMIN_PASSWORD = 'sn2024admin'

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function getPosts() {
  try { return JSON.parse(localStorage.getItem('sn_blog_posts') || '[]') } catch { return [] }
}
function savePosts(posts) {
  localStorage.setItem('sn_blog_posts', JSON.stringify(posts))
}

export default function Admin() {
  const [authed,    setAuthed]    = useState(false)
  const [password,  setPassword]  = useState('')
  const [pwError,   setPwError]   = useState('')

  // Blog agent state
  const [topic,     setTopic]     = useState('')
  const [bullets,   setBullets]   = useState('')
  const [tone,      setTone]      = useState('Professional')
  const [apiKey,    setApiKey]    = useState('')
  const [loading,   setLoading]   = useState(false)
  const [generated, setGenerated] = useState(null)
  const [error,     setError]     = useState('')
  const [published, setPublished] = useState(false)
  const [posts,     setPosts]     = useState([])

  useEffect(() => {
    if (authed) {
      setPosts(getPosts())
      const key = sessionStorage.getItem('sn_openai_key') || ''
      setApiKey(key)
    }
  }, [authed])

  const login = () => {
    if (password === ADMIN_PASSWORD) { setAuthed(true); setPwError('') }
    else setPwError('Incorrect password.')
  }

  const generate = async () => {
    if (!topic.trim()) { setError('Enter a topic first.'); return }
    if (!apiKey.trim()) { setError('Enter your OpenAI API key.'); return }
    setLoading(true); setError(''); setGenerated(null); setPublished(false)

    const SYSTEM = `You are an expert AI engineer and technical writer. Write a high-quality blog post for SNTheAIMaster.com.
The author is Sudipta Nath — AI Research Engineer, MRes AI at Macquarie University, published in IEEE and Taylor & Francis, built production AI at a Sydney startup.
Writing style: direct, intelligent, no fluff, practical insights. Signal over noise.

Return ONLY valid JSON, no markdown, no text outside JSON:
{
  "title": "<compelling, specific title>",
  "excerpt": "<2-sentence summary for the blog listing page>",
  "metaDescription": "<150 char SEO meta description>",
  "content": "<full blog post — use ## for section headers, ### for subsections, separate paragraphs with blank lines — minimum 600 words>"
}`

    const userMsg = `Topic: ${topic}${bullets ? `\n\nKey points to cover:\n${bullets}` : ''}\nTone: ${tone}`

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          max_tokens: 2000,
          temperature: 0.7,
          messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: userMsg }],
        }),
      })
      if (!res.ok) { const e = await res.json(); throw new Error(e.error?.message || 'API error') }
      const data = await res.json()
      const raw = data.choices[0]?.message?.content || ''
      const clean = raw.replace(/```json|```/g, '').trim()
      setGenerated(JSON.parse(clean))
    } catch (e) {
      setError(e.message.includes('JSON') ? 'Generation failed — try again.' : e.message)
    } finally { setLoading(false) }
  }

  const publish = () => {
    if (!generated) return
    const newPost = {
      slug:        slugify(generated.title),
      title:       generated.title,
      excerpt:     generated.excerpt,
      content:     generated.content,
      meta:        generated.metaDescription,
      publishedAt: new Date().toISOString(),
    }
    const existing = getPosts()
    const updated = [newPost, ...existing.filter(p => p.slug !== newPost.slug)]
    savePosts(updated)
    setPosts(updated)
    setPublished(true)
    sessionStorage.setItem('sn_openai_key', apiKey)
  }

  const deletePost = (slug) => {
    const updated = getPosts().filter(p => p.slug !== slug)
    savePosts(updated)
    setPosts(updated)
  }

  const Label = ({ children }) => (
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{children}</p>
  )

  // ── Password Gate ────────────────────────────────────────────
  if (!authed) return (
    <div className="nav-offset" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '2.5rem', width: '100%', maxWidth: '380px', margin: '0 1rem' }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ width: '44px', height: '44px', background: 'var(--indigo)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', color: '#fff', letterSpacing: '-0.04em' }}>SN</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--warm-white)', marginBottom: '0.35rem' }}>Admin Access</h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--dim)', letterSpacing: '0.06em' }}>PRIVATE — AUTHORISED ACCESS ONLY</p>
        </div>
        <Label>Password</Label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          placeholder="Enter admin password"
          style={{ width: '100%', background: 'var(--void)', border: '1px solid var(--border)', borderRadius: '3px', padding: '0.65rem 0.9rem', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--warm-white)', outline: 'none', marginBottom: '0.75rem' }} />
        {pwError && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--amber)', marginBottom: '0.75rem' }}>{pwError}</p>}
        <button onClick={login} style={{ width: '100%', background: 'var(--indigo)', border: 'none', borderRadius: '3px', padding: '0.7rem', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#fff', cursor: 'pointer' }}>
          Enter →
        </button>
      </motion.div>
    </div>
  )

  // ── Admin Dashboard ──────────────────────────────────────────
  return (
    <div className="nav-offset">
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)', padding: '1rem 0' }}>
        <div className="site-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--teal)', boxShadow: '0 0 6px var(--teal)' }} />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Admin · Blog Agent</p>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--dim)' }}>{posts.length} post{posts.length !== 1 ? 's' : ''} published</p>
        </div>
      </div>

      <div className="site-container" style={{ padding: 'clamp(2rem, 4vw, 3rem) var(--gutter)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>

          {/* LEFT — Generator */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--warm-white)', marginBottom: '1.5rem' }}>
              Generate Blog Post
            </h2>

            {/* API Key */}
            <div style={{ marginBottom: '1rem' }}>
              <Label>OpenAI API Key</Label>
              <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)}
                placeholder="sk-..."
                style={{ width: '100%', background: 'var(--void)', border: '1px solid var(--border)', borderRadius: '3px', padding: '0.6rem 0.9rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--warm-white)', outline: 'none' }} />
            </div>

            {/* Topic */}
            <div style={{ marginBottom: '1rem' }}>
              <Label>Topic *</Label>
              <input type="text" value={topic} onChange={e => setTopic(e.target.value)}
                placeholder="e.g. Why RAG pipelines fail in production"
                style={{ width: '100%', background: 'var(--void)', border: '1px solid var(--border)', borderRadius: '3px', padding: '0.6rem 0.9rem', fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--warm-white)', outline: 'none' }} />
            </div>

            {/* Bullet points */}
            <div style={{ marginBottom: '1rem' }}>
              <Label>Key Points to Cover (optional)</Label>
              <textarea value={bullets} onChange={e => setBullets(e.target.value)}
                placeholder="- Chunking strategy matters&#10;- Embedding model choice&#10;- Retrieval quality vs LLM quality"
                rows={4}
                style={{ width: '100%', background: 'var(--void)', border: '1px solid var(--border)', borderRadius: '3px', padding: '0.6rem 0.9rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--warm-white)', outline: 'none', resize: 'vertical', lineHeight: 1.6 }} />
            </div>

            {/* Tone */}
            <div style={{ marginBottom: '1.5rem' }}>
              <Label>Tone</Label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Professional', 'Technical', 'Conversational', 'Opinionated'].map(t => (
                  <button key={t} onClick={() => setTone(t)}
                    style={{ background: tone === t ? 'var(--indigo)' : 'var(--surface)', border: `1px solid ${tone === t ? 'var(--indigo)' : 'var(--border)'}`, borderRadius: '3px', padding: '0.35rem 0.85rem', fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: tone === t ? '#fff' : 'var(--muted)', cursor: 'pointer', transition: 'all 0.15s' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={generate} disabled={loading || !topic.trim()}
              style={{ background: loading || !topic.trim() ? 'var(--border)' : 'var(--indigo)', border: 'none', borderRadius: '3px', padding: '0.7rem 1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: loading || !topic.trim() ? 'var(--dim)' : '#fff', cursor: loading || !topic.trim() ? 'not-allowed' : 'pointer', transition: 'all 0.15s' }}>
              {loading ? 'Writing post…' : 'Generate post →'}
            </button>

            {error && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--amber)', marginTop: '0.75rem' }}>{error}</p>}

            {/* Published posts list */}
            {posts.length > 0 && (
              <div style={{ marginTop: '2.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--warm-white)', marginBottom: '1rem' }}>Published Posts</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {posts.map(p => (
                    <div key={p.slug} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px', padding: '0.65rem 0.9rem' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--warm-white)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</p>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--dim)' }}>{new Date(p.publishedAt).toLocaleDateString('en-AU')}</p>
                      </div>
                      <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--indigo)', flexShrink: 0 }}>view</a>
                      <button onClick={() => deletePost(p.slug)} style={{ background: 'none', border: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--dim)', cursor: 'pointer', flexShrink: 0, padding: 0 }}>delete</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Preview */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--warm-white)', marginBottom: '1.5rem' }}>
              Preview
            </h2>

            {loading && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', padding: '3rem 0' }}>
                {[0,1,2].map(i => (
                  <motion.div key={i} animate={{ opacity: [0.2,1,0.2], scale: [0.8,1.1,0.8] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                    style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--indigo)' }} />
                ))}
              </div>
            )}

            <AnimatePresence>
              {generated && !loading && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1.5rem', marginBottom: '1rem', maxHeight: '55vh', overflowY: 'auto' }}>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--warm-white)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                      {generated.title}
                    </h1>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--indigo)', lineHeight: 1.6, marginBottom: '1.25rem', fontStyle: 'italic' }}>
                      {generated.excerpt}
                    </p>
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                      {generated.content.split('\n\n').map((para, i) => {
                        if (para.startsWith('## ')) return <h2 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--warm-white)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>{para.replace('## ', '')}</h2>
                        if (para.startsWith('### ')) return <h3 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--warm-white)', marginTop: '1rem', marginBottom: '0.4rem' }}>{para.replace('### ', '')}</h3>
                        return <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '0.85rem' }}>{para}</p>
                      })}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button onClick={publish} disabled={published}
                      style={{ background: published ? 'var(--teal)' : 'var(--indigo)', border: 'none', borderRadius: '3px', padding: '0.65rem 1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: published ? 'var(--void)' : '#fff', cursor: published ? 'default' : 'pointer', fontWeight: published ? 700 : 400 }}>
                      {published ? '✓ Published' : 'Publish to blog →'}
                    </button>
                    <button onClick={() => { setGenerated(null); setTopic(''); setBullets('') }}
                      style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '3px', padding: '0.65rem 1rem', fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--muted)', cursor: 'pointer' }}>
                      Discard
                    </button>
                    {published && <a href={`/blog/${slugify(generated.title)}`} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--indigo)', textDecoration: 'underline' }}>View live →</a>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!generated && !loading && (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '3rem', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', color: 'var(--border)', marginBottom: '0.75rem' }}>◈</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--dim)' }}>Generated post will preview here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
