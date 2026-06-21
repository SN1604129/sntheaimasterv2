import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Shared helpers ─────────────────────────────────────────────────────────────

function getKey() {
  const key = sessionStorage.getItem('sn_openai_key') || import.meta.env.VITE_OPENAI_KEY || ''
  console.log('Key found:', key ? 'YES' : 'NO')
  return key
}

async function callOpenAI(systemPrompt, userContent, key) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 1200,
      temperature: 0.2,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userContent  },
      ],
    }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error?.message || 'API error')
  }
  const data = await res.json()
  return data.choices[0]?.message?.content || ''
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function ApiKeyBanner({ apiKey, setApiKey, show, setShow }) {
  const [val, setVal] = useState(apiKey)
  const [err, setErr] = useState('')

  const save = () => {
    const trimmed = val.trim()
    if (!trimmed.startsWith('sk-')) { setErr('Key must start with sk-'); return }
    setApiKey(trimmed)
    sessionStorage.setItem('sn_openai_key', trimmed)
    setShow(false)
    setErr('')
  }

  if (!show) return (
    <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)', padding: '0.6rem 0' }}>
      <div className="site-container" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--teal)', boxShadow: '0 0 6px var(--teal)', flexShrink: 0 }} />
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.06em' }}>
          API CONNECTED
        </p>
        <button onClick={() => setShow(true)} style={{ marginLeft: 'auto', background: 'none', border: '1px solid var(--border)', borderRadius: '2px', padding: '0.2rem 0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--dim)', cursor: 'pointer' }}>
          change key
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ borderBottom: '1px solid var(--border)', background: 'rgba(108,99,255,0.05)', padding: '1rem 0' }}>
      <div className="site-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', flexShrink: 0 }}>
            OpenAI API key — stored in session only, never sent to any server:
          </p>
          <input
            type="password"
            placeholder="sk-..."
            value={val}
            onChange={e => setVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && save()}
            style={{ flex: 1, minWidth: '220px', background: 'var(--void)', border: '1px solid var(--border)', borderRadius: '3px', padding: '0.45rem 0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--warm-white)', outline: 'none' }}
          />
          <button onClick={save} style={{ background: 'var(--indigo)', border: 'none', borderRadius: '3px', padding: '0.45rem 1.1rem', fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#fff', cursor: 'pointer' }}>
            Connect →
          </button>
          <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--indigo)', textDecoration: 'underline' }}>
            Get a key
          </a>
        </div>
        {err && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--amber)', marginTop: '0.5rem' }}>{err}</p>}
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', padding: '2rem 0' }}>
      {[0,1,2].map(i => (
        <motion.div key={i} animate={{ opacity: [0.2,1,0.2], scale: [0.8,1.1,0.8] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--indigo)' }} />
      ))}
    </div>
  )
}

function ResultBlock({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      style={{ background: 'var(--void)', border: '1px solid var(--border)', borderRadius: '4px', padding: '1.5rem', marginTop: '1.25rem' }}>
      {children}
    </motion.div>
  )
}

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '2px', padding: '0.25rem 0.65rem', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: copied ? 'var(--teal)' : 'var(--dim)', cursor: 'pointer', transition: 'color 0.2s' }}>
      {copied ? 'copied ✓' : 'copy'}
    </button>
  )
}

function Textarea({ label, placeholder, value, onChange, rows = 6 }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{label}</p>}
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{ width: '100%', background: 'var(--void)', border: '1px solid var(--border)', borderRadius: '3px', padding: '0.75rem 1rem', fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--warm-white)', outline: 'none', resize: 'vertical', lineHeight: 1.6 }}
      />
    </div>
  )
}

function RunBtn({ onClick, loading, disabled, label = 'Analyse →' }) {
  return (
    <button onClick={onClick} disabled={loading || disabled}
      style={{ background: loading || disabled ? 'var(--border)' : 'var(--indigo)', border: 'none', borderRadius: '3px', padding: '0.65rem 1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: loading || disabled ? 'var(--dim)' : '#fff', cursor: loading || disabled ? 'not-allowed' : 'pointer', transition: 'all 0.15s' }}>
      {loading ? 'Analysing…' : label}
    </button>
  )
}

function ErrorMsg({ msg }) {
  if (!msg) return null
  return <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--amber)', marginTop: '0.75rem' }}>{msg}</p>
}

// ── DEMO 1: Contract Risk Scanner ──────────────────────────────────────────────

function ContractScanner({ apiKey, onNeedKey }) {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const SYSTEM = `You are a specialist contract risk analyst with expertise in Australian commercial law. 
Analyse the contract text provided and return a structured JSON response ONLY — no markdown, no explanation outside JSON.

Return exactly this structure:
{
  "riskScore": <number 1-10>,
  "verdict": "<one sentence verdict>",
  "highRiskClauses": [
    { "clause": "<clause reference or excerpt>", "issue": "<what's wrong>", "plainEnglish": "<explain simply>", "fix": "<suggested safer wording>" }
  ],
  "missingProtections": ["<missing clause 1>", "<missing clause 2>"],
  "summary": "<2-3 sentence overall assessment>"
}`

  const run = async () => {
    if (!apiKey) { onNeedKey(); return }
    if (!text.trim()) { setError('Please paste contract text first.'); return }
    setLoading(true); setError(''); setResult(null)
    try {
      const raw = await callOpenAI(SYSTEM, `Analyse this contract:\n\n${text}`, apiKey)
      const clean = raw.replace(/```json|```/g, '').trim()
      setResult(JSON.parse(clean))
    } catch (e) {
      setError(e.message.includes('JSON') ? 'Analysis failed — try with more contract text.' : e.message)
    } finally { setLoading(false) }
  }

  const riskColor = (score) => score >= 7 ? 'var(--amber)' : score >= 4 ? '#FFD166' : 'var(--teal)'

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          Paste any contract, agreement, or legal clause. The scanner identifies risky terms, missing protections, and explains everything in plain English — instantly.
        </p>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {['Employment agreements', 'Service contracts', 'NDAs', 'SaaS terms', 'Lease agreements'].map(tag => (
            <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--dim)', letterSpacing: '0.05em', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '2px', padding: '0.2rem 0.5rem' }}>{tag}</span>
          ))}
        </div>
      </div>

      <Textarea label="Contract Text" placeholder="Paste your contract or clause here…" value={text} onChange={setText} rows={8} />
      <RunBtn onClick={run} loading={loading} disabled={!text.trim()} label="Scan for risks →" />
      <ErrorMsg msg={error} />

      {loading && <Spinner />}

      {result && (
        <ResultBlock>
          {/* Risk Score Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Risk Score</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 800, color: riskColor(result.riskScore), lineHeight: 1 }}>{result.riskScore}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--dim)' }}>/10</span>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--warm-white)', lineHeight: 1.6 }}>{result.verdict}</p>
            </div>
          </div>

          {/* High Risk Clauses */}
          {result.highRiskClauses?.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>⚠ High Risk Clauses</p>
              {result.highRiskClauses.map((c, i) => (
                <div key={i} style={{ background: 'rgba(255,159,67,0.05)', border: '1px solid rgba(255,159,67,0.15)', borderRadius: '3px', padding: '1rem', marginBottom: '0.75rem' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--amber)', marginBottom: '0.35rem' }}>{c.clause}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--warm-white)', marginBottom: '0.3rem', fontWeight: 600 }}>{c.issue}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: 'var(--muted)', marginBottom: '0.5rem', lineHeight: 1.6 }}>Plain English: {c.plainEnglish}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: 'var(--teal)', lineHeight: 1.6 }}>Suggested fix: {c.fix}</p>
                </div>
              ))}
            </div>
          )}

          {/* Missing Protections */}
          {result.missingProtections?.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>✗ Missing Protections</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {result.missingProtections.map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--amber)', flexShrink: 0, marginTop: '2px' }}>✗</span>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--muted)' }}>{p}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>{result.summary}</p>
            <div style={{ marginTop: '0.75rem' }}>
              <CopyBtn text={JSON.stringify(result, null, 2)} />
            </div>
          </div>
        </ResultBlock>
      )}
    </div>
  )
}

// ── DEMO 2: Supply Chain Email Intel ───────────────────────────────────────────

function SupplyChainEmail({ apiKey, onNeedKey }) {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const SYSTEM = `You are an expert supply chain operations analyst specialising in garments and merchandise buying houses.
Analyse the supplier or buyer email provided and return structured JSON ONLY — no markdown, no text outside JSON.

Return exactly this structure:
{
  "sender": "<who sent this — buyer/supplier/factory/freight agent>",
  "urgency": "<Critical/High/Medium/Low>",
  "orderReference": "<PO number, order ref, or 'Not specified'>",
  "deadline": "<specific date or deadline mentioned, or 'No deadline specified'>",
  "actionRequired": "<exactly what needs to be done>",
  "keyIssue": "<the core problem or request in one sentence>",
  "suggestedReply": "<a professional reply email draft>",
  "flags": ["<any red flags or risks in this email>"]
}`

  const run = async () => {
    if (!apiKey) { onNeedKey(); return }
    if (!email.trim()) { setError('Please paste an email first.'); return }
    setLoading(true); setError(''); setResult(null)
    try {
      const raw = await callOpenAI(SYSTEM, `Analyse this supply chain email:\n\n${email}`, apiKey)
      const clean = raw.replace(/```json|```/g, '').trim()
      setResult(JSON.parse(clean))
    } catch (e) {
      setError(e.message.includes('JSON') ? 'Could not parse email — try with a clearer email.' : e.message)
    } finally { setLoading(false) }
  }

  const urgencyColor = (u) => ({ Critical: 'var(--amber)', High: '#FFD166', Medium: 'var(--teal)', Low: 'var(--dim)' }[u] || 'var(--dim)')

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          Paste any supplier, buyer, or factory email. The system extracts deadlines, order references, required actions, flags risks, and drafts a professional reply — in seconds.
        </p>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {['Shipment delays', 'PO amendments', 'Quality issues', 'Payment requests', 'Sample approvals'].map(tag => (
            <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--dim)', letterSpacing: '0.05em', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '2px', padding: '0.2rem 0.5rem' }}>{tag}</span>
          ))}
        </div>
      </div>

      <Textarea label="Supplier / Buyer Email" placeholder="Paste the email here…" value={email} onChange={setEmail} rows={7} />
      <RunBtn onClick={run} loading={loading} disabled={!email.trim()} label="Extract intelligence →" />
      <ErrorMsg msg={error} />
      {loading && <Spinner />}

      {result && (
        <ResultBlock>
          {/* Header row */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)' }}>
            {[
              { label: 'From', value: result.sender },
              { label: 'Urgency', value: result.urgency, color: urgencyColor(result.urgency) },
              { label: 'Order Ref', value: result.orderReference },
              { label: 'Deadline', value: result.deadline, color: 'var(--amber)' },
            ].map(item => (
              <div key={item.label} style={{ flex: 1, minWidth: '120px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{item.label}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, color: item.color || 'var(--warm-white)' }}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Key Issue + Action */}
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Core Issue</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--warm-white)', lineHeight: 1.6, marginBottom: '1rem' }}>{result.keyIssue}</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Action Required</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--teal)', lineHeight: 1.6 }}>{result.actionRequired}</p>
          </div>

          {/* Flags */}
          {result.flags?.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--amber)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>⚠ Risk Flags</p>
              {result.flags.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <span style={{ color: 'var(--amber)', flexShrink: 0 }}>▸</span>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--muted)' }}>{f}</p>
                </div>
              ))}
            </div>
          )}

          {/* Suggested Reply */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Suggested Reply</p>
              <CopyBtn text={result.suggestedReply} />
            </div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px', padding: '1rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{result.suggestedReply}</p>
            </div>
          </div>
        </ResultBlock>
      )}
    </div>
  )
}

// ── DEMO 3: Clinical Trial Screener ────────────────────────────────────────────

function ClinicalScreener({ apiKey, onNeedKey }) {
  const [notes, setNotes] = useState('')
  const [criteria, setCriteria] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const EXAMPLES = [
    {
      label: 'Type 2 Diabetes Trial',
      criteria: 'Inclusion: Age 30-70, HbA1c between 7.5-11%, diagnosed T2DM for at least 1 year, BMI 25-40.\nExclusion: Insulin therapy, severe kidney disease (eGFR < 30), pregnancy, active cancer.',
    },
    {
      label: 'Hypertension Study',
      criteria: 'Inclusion: Age 18-65, systolic BP 140-180 mmHg, no current antihypertensive medication.\nExclusion: Secondary hypertension, heart failure, stroke in last 6 months, diabetes.',
    },
    {
      label: 'Depression Trial',
      criteria: 'Inclusion: Age 18-60, PHQ-9 score ≥ 10, diagnosis of MDD, no antidepressants for 4 weeks.\nExclusion: Bipolar disorder, psychosis, active suicidal ideation, substance abuse in last 6 months.',
    },
  ]

  const SYSTEM = `You are a clinical research coordinator with expertise in patient eligibility screening for clinical trials.
Analyse the patient notes against the trial criteria and return structured JSON ONLY — no markdown, no text outside JSON.

Return exactly this structure:
{
  "eligibility": "<Eligible / Ineligible / Possibly Eligible — Requires Review>",
  "confidence": <number 0-100>,
  "inclusionCriteriaMet": [{ "criterion": "<criterion>", "met": <true/false>, "evidence": "<from patient notes>" }],
  "exclusionCriteriaTriggered": [{ "criterion": "<criterion>", "triggered": <true/false>, "evidence": "<from patient notes>" }],
  "missingInformation": ["<information needed to confirm eligibility>"],
  "clinicalSummary": "<2-3 sentence clinical assessment>",
  "recommendedNextStep": "<what the coordinator should do next>"
}`

  const run = async () => {
    if (!apiKey) { onNeedKey(); return }
    if (!notes.trim() || !criteria.trim()) { setError('Please provide both patient notes and trial criteria.'); return }
    setLoading(true); setError(''); setResult(null)
    try {
      const raw = await callOpenAI(SYSTEM, `TRIAL CRITERIA:\n${criteria}\n\nPATIENT NOTES:\n${notes}`, apiKey)
      const clean = raw.replace(/```json|```/g, '').trim()
      setResult(JSON.parse(clean))
    } catch (e) {
      setError(e.message.includes('JSON') ? 'Screening failed — ensure both fields are filled clearly.' : e.message)
    } finally { setLoading(false) }
  }

  const eligibilityColor = (e) => {
    if (!e) return 'var(--dim)'
    if (e.includes('Ineligible')) return 'var(--amber)'
    if (e.includes('Possibly')) return '#FFD166'
    return 'var(--teal)'
  }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          Paste patient clinical notes and trial inclusion/exclusion criteria. The screener analyses eligibility, flags missing information, and gives a clinical assessment — reducing manual screening time from hours to seconds.
        </p>

        {/* Quick fill examples */}
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Quick fill — trial criteria examples</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {EXAMPLES.map(ex => (
              <button key={ex.label} onClick={() => setCriteria(ex.criteria)}
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '2px', padding: '0.3rem 0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--indigo)'; e.currentTarget.style.color = 'var(--warm-white)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}>
                {ex.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Textarea label="Patient Clinical Notes" placeholder="Age: 54, Female. Diagnosis: T2DM since 2019. HbA1c: 8.2%. BMI: 31. Medications: Metformin 1000mg. eGFR: 72. No insulin therapy…" value={notes} onChange={setNotes} rows={8} />
        <Textarea label="Trial Inclusion / Exclusion Criteria" placeholder="Inclusion: Age 30-70, HbA1c 7.5-11%…&#10;Exclusion: Insulin therapy, eGFR < 30…" value={criteria} onChange={setCriteria} rows={8} />
      </div>

      <RunBtn onClick={run} loading={loading} disabled={!notes.trim() || !criteria.trim()} label="Screen patient →" />
      <ErrorMsg msg={error} />
      {loading && <Spinner />}

      {result && (
        <ResultBlock>
          {/* Eligibility verdict */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Eligibility</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: eligibilityColor(result.eligibility) }}>{result.eligibility}</p>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Confidence</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--warm-white)' }}>{result.confidence}%</p>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Next Step</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--warm-white)', lineHeight: 1.6 }}>{result.recommendedNextStep}</p>
            </div>
          </div>

          {/* Criteria breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            {/* Inclusion */}
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--teal)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Inclusion Criteria</p>
              {result.inclusionCriteriaMet?.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                  <span style={{ color: c.met ? 'var(--teal)' : 'var(--amber)', flexShrink: 0, fontSize: '0.8rem' }}>{c.met ? '✓' : '✗'}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: c.met ? 'var(--warm-white)' : 'var(--amber)', lineHeight: 1.4 }}>{c.criterion}</p>
                    {c.evidence && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--dim)', marginTop: '0.15rem' }}>{c.evidence}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Exclusion */}
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--amber)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Exclusion Criteria</p>
              {result.exclusionCriteriaTriggered?.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                  <span style={{ color: c.triggered ? 'var(--amber)' : 'var(--teal)', flexShrink: 0, fontSize: '0.8rem' }}>{c.triggered ? '⚠' : '✓'}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: c.triggered ? 'var(--amber)' : 'var(--muted)', lineHeight: 1.4 }}>{c.criterion}</p>
                    {c.evidence && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--dim)', marginTop: '0.15rem' }}>{c.evidence}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Missing info */}
          {result.missingInformation?.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Missing Information</p>
              {result.missingInformation.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <span style={{ color: 'var(--indigo)', flexShrink: 0 }}>?</span>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--muted)' }}>{m}</p>
                </div>
              ))}
            </div>
          )}

          {/* Clinical summary */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Clinical Assessment</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>{result.clinicalSummary}</p>
          </div>
        </ResultBlock>
      )}
    </div>
  )
}

// ── Main Demo Page ─────────────────────────────────────────────────────────────

const TABS = [
  {
    id: 'contract',
    label: 'Contract Risk Scanner',
    tag: 'Legal · NLP',
    desc: 'Flags risky clauses, missing protections, explains in plain English.',
    icon: '◈',
    color: 'var(--amber)',
  },
  {
    id: 'supplychain',
    label: 'Supply Chain Email Intel',
    tag: 'Operations · Automation',
    desc: 'Extracts deadlines, actions, risks from supplier emails. Drafts replies.',
    icon: '◉',
    color: 'var(--teal)',
  },
  {
    id: 'clinical',
    label: 'Clinical Trial Screener',
    tag: 'Healthcare · NLP',
    desc: 'Screens patient eligibility against trial criteria with clinical reasoning.',
    icon: '◎',
    color: 'var(--indigo)',
  },
]

export default function Demo() {
  const [activeTab, setActiveTab] = useState('contract')
  const [apiKey, setApiKey] = useState(() => sessionStorage.getItem('sn_openai_key') || import.meta.env.VITE_OPENAI_KEY || '')
  const [showKey, setShowKey] = useState(() => !sessionStorage.getItem('sn_openai_key') && !import.meta.env.VITE_OPENAI_KEY)
  const active = TABS.find(t => t.id === activeTab)

  return (
    <div className="nav-offset">

      {/* ── API Key Banner ─────────────────────────────────────── */}
      <ApiKeyBanner apiKey={apiKey} setApiKey={setApiKey} show={showKey} setShow={setShowKey} />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(2.5rem, 5vw, 4rem) 0 clamp(2rem, 4vw, 3rem)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '-5%', width: '40vw', height: '40vw', maxWidth: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mono-label" style={{ marginBottom: '0.75rem' }}>
            Live Demos · Domain-Specific AI
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}
            style={{ maxWidth: '680px', marginBottom: '0.9rem', lineHeight: 1.05 }}>
            AI built for{' '}
            <span style={{ color: 'var(--indigo)', fontStyle: 'italic' }}>specific problems.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
            style={{ maxWidth: '520px', fontSize: 'clamp(0.9rem, 1.6vw, 1rem)', lineHeight: 1.75, color: 'var(--muted)' }}>
            Not generic API wrappers. Each tool is built around a real operational problem — in legal, supply chain, and healthcare. Try them with your own data.
          </motion.p>

          {/* Disclaimer */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--dim)', letterSpacing: '0.05em', marginTop: '1.25rem', maxWidth: '520px', lineHeight: 1.6 }}>
            ⚠ Do not upload confidential documents. Demos use OpenAI API. For a private deployment inside your own infrastructure →{' '}
            <a href="/contact" style={{ color: 'var(--indigo)', textDecoration: 'underline' }}>contact me</a>
          </motion.p>
        </div>
      </section>

      {/* ── Tab Selector ───────────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)', overflowX: 'auto' }}>
        <div className="site-container" style={{ display: 'flex', gap: '0', minWidth: 'max-content' }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                background:   'none',
                border:       'none',
                borderBottom: activeTab === tab.id ? `2px solid ${tab.color}` : '2px solid transparent',
                padding:      '1rem 1.5rem',
                cursor:       'pointer',
                textAlign:    'left',
                transition:   'all 0.15s ease',
                flexShrink:   0,
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <span style={{ color: activeTab === tab.id ? tab.color : 'var(--dim)', fontSize: '0.85rem' }}>{tab.icon}</span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: activeTab === tab.id ? 700 : 400, color: activeTab === tab.id ? 'var(--warm-white)' : 'var(--muted)', whiteSpace: 'nowrap' }}>
                  {tab.label}
                </p>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: activeTab === tab.id ? tab.color : 'var(--dim)', letterSpacing: '0.06em', textTransform: 'uppercase', paddingLeft: '1.35rem' }}>
                {tab.tag}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Active Demo ─────────────────────────────────────────── */}
      <div className="site-container" style={{ padding: 'clamp(2rem, 4vw, 3.5rem) var(--gutter)' }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

            {/* Tab header */}
            <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: active.color, letterSpacing: '0.08em', textTransform: 'uppercase', background: `${active.color}15`, border: `1px solid ${active.color}30`, borderRadius: '2px', padding: '0.2rem 0.5rem' }}>
                  {active.tag}
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--warm-white)', marginBottom: '0.4rem' }}>
                {active.label}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--muted)' }}>{active.desc}</p>
            </div>

            {/* Demo component */}
            {activeTab === 'contract'    && <ContractScanner  apiKey={apiKey} onNeedKey={() => setShowKey(true)} />}
            {activeTab === 'supplychain' && <SupplyChainEmail apiKey={apiKey} onNeedKey={() => setShowKey(true)} />}
            {activeTab === 'clinical'    && <ClinicalScreener apiKey={apiKey} onNeedKey={() => setShowKey(true)} />}

          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA ──────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginTop: '4rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <p className="mono-label" style={{ marginBottom: '0.5rem' }}>Want this inside your business?</p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', fontWeight: 700, color: 'var(--warm-white)', maxWidth: '480px', lineHeight: 1.4 }}>
              I build private versions of these tools — deployed inside your own infrastructure. Your data never leaves.
            </h3>
          </div>
          <a href="/contact" className="btn-amber" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            Let's build it →
          </a>
        </motion.div>
      </div>
    </div>
  )
}
