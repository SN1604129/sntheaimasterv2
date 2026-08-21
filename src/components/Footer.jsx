import { Link } from 'react-router-dom'
import { siteConfig } from '../data/siteData'

const companyItems = ['About', 'Work', 'Insights']
const serviceItems = ['AI-Powered Websites', 'AI Agents & Automation', 'Custom AI Software']

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="snai-footer">
      <div className="site-container">
        <div className="snai-footer-grid">
          <div className="snai-footer-brand">
            <Link to="/" className="snai-brand" aria-label="SNAI home" style={{ marginBottom: '1rem' }}>
              <span className="snai-mark" aria-hidden="true">S</span>
              <span className="snai-wordmark">SNAI</span>
            </Link>
            <p className="type-body-lg" style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              AI systems that help businesses grow.
            </p>
            <p className="type-body-sm">
              Advanced AI engineering shaped around clear business outcomes, practical delivery and human understanding.
            </p>
          </div>

          <div className="snai-footer-columns">
            <div>
              <p className="snai-footer-heading">Company</p>
              <div className="snai-footer-list">
                {companyItems.map(item => (
                  <span key={item} className="snai-footer-text">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="snai-footer-heading">Services</p>
              <div className="snai-footer-list">
                {serviceItems.map(item => (
                  <span key={item} className="snai-footer-text">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="snai-footer-heading">Contact</p>
              <div className="snai-footer-list">
                <span className="snai-footer-text">{siteConfig.location}</span>
                <a className="snai-footer-link" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
                <a className="snai-footer-link" href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a className="snai-footer-link" href={siteConfig.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="snai-footer-bottom">
          <p className="type-body-sm">© {year} SNAI</p>
          <p className="type-body-sm">Sydney, Australia · Working globally</p>
        </div>
      </div>
    </footer>
  )
}
