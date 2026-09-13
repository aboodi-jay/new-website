import { useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function TopNav({ theme, toggleTheme }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [pulsing, setPulsing] = useState(false)
  const pulseTimeout = useRef(null)

  const links = [
    { to: '/', label: 'Home' },
    { to: '/writeups', label: 'Writeups' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About' },
  ]

  function handleSearch(q) {
    if (!q.trim()) {
      if (location.pathname.startsWith('/search')) navigate('/')
      return
    }
    navigate(`/search?q=${encodeURIComponent(q)}`, { replace: location.pathname.startsWith('/search') })
  }

  function handleThemeClick(e) {
    toggleTheme(e)
    setPulsing(true)
    clearTimeout(pulseTimeout.current)
    pulseTimeout.current = setTimeout(() => setPulsing(false), 650)
  }

  return (
    <header className="topnav">
      <div className="topnav-inner">
        <Link to="/" className="logo">
          <svg viewBox="0 0 24 24" width="18" height="18" style={{ marginRight: 6, verticalAlign: '-3px' }}>
            <circle cx="12" cy="13" r="7" fill="#cba6f7" />
            <path d="M7 8 L4 3 L11 6 Z" fill="#cba6f7" />
            <path d="M17 8 L20 3 L13 6 Z" fill="#cba6f7" />
            <circle cx="9.5" cy="12.5" r="1.1" fill="#1e1e2e" />
            <circle cx="14.5" cy="12.5" r="1.1" fill="#1e1e2e" />
          </svg>
          aboodijay
        </Link>
        <nav className="nav-links">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={location.pathname === l.to ? 'active' : ''}
            >
              {l.label}
            </Link>
          ))}
          <input
            className="nav-search"
            type="text"
            placeholder="Search…"
            onChange={e => handleSearch(e.target.value)}
          />
          <button
            className={'theme-toggle' + (pulsing ? (theme === 'dark' ? ' pulse-on' : ' pulse-off') : '')}
            onClick={handleThemeClick}
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              // lightbulb — click to switch to light
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M9 18h6" strokeLinecap="round" />
                <path d="M10 21h4" strokeLinecap="round" />
                <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.45.9 1.15.9 1.9V16h5.4v-.3c0-.75.3-1.45.9-1.9A6 6 0 0 0 12 3Z" />
                <path className="bulb-rays" d="M12 0.5v1.2M4.2 4.2l.9.9M19.8 4.2l-.9.9M1.5 12h1.2M21.3 12h1.2" strokeLinecap="round" />
              </svg>
            ) : (
              // crescent moon with a couple of stars — click to switch to dark
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" />
                <circle className="moon-star moon-star-1" cx="18.5" cy="6" r="0.9" />
                <circle className="moon-star moon-star-2" cx="21" cy="10" r="0.6" />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
