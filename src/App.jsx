import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar    from './components/Navbar'
import Footer    from './components/Footer'
import Home      from './pages/Home'
import Research  from './pages/Research'
import Contact   from './pages/Contact'
import Demo      from './pages/Demo'
import Blog      from './pages/Blog'
import BlogPost  from './pages/BlogPost'
import Admin     from './pages/Admin'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/research"   element={<Research />} />
          <Route path="/contact"    element={<Contact />} />
          <Route path="/demo"       element={<Demo />} />
          <Route path="/blog"       element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin"      element={<Admin />} />
          <Route path="*" element={
            <div className="nav-offset flex items-center justify-center min-h-screen text-center px-6">
              <div>
                <p className="mono-label mb-4">404</p>
                <h2 className="mb-4">Page not found</h2>
                <a href="/" className="btn-secondary">← Back home</a>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
