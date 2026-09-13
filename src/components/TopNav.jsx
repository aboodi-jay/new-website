import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function TopNav({ theme, toggleTheme }) {
  const location = useLocation()
  const navigate = useNavigate()

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
            className="theme-toggle"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
