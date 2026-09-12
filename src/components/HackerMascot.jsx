import { useState, useEffect } from 'react'

// Shared mascot artwork: a little terminal-visored cat in Catppuccin Mocha
// colors. `variant` swaps a small accessory and the cycling terminal text
// so each section of the site gets a mascot that hints at what it's for,
// while staying the same cat.
//
// The terminal text is rendered as an HTML overlay (not SVG <text>) so its
// font size stays legible at any mascot size, instead of shrinking along
// with the whole graphic.

const LINES = {
  default: ['whoami', 'ssh root@target', 'nc -lvnp 4444', './exploit.py'],
  writeups: ['curl -X POST /api', "' OR 1=1 --", 'grep -r "secret"', 'burp intruder'],
  blog: ['git commit -m "fix"', 'draft.md --watch', 'wc -w draft.md', 'publish --now'],
  about: ['cat about.md', 'whoami', 'uptime', 'echo hi :)'],
  goup: ['go up'],
}

export default function HackerMascot({ variant = 'default', size = 180 }) {
  const lines = LINES[variant] || LINES.default
  const [i, setI] = useState(0)

  useEffect(() => {
    if (lines.length < 2) return
    const id = setInterval(() => setI(n => (n + 1) % lines.length), 2200)
    return () => clearInterval(id)
  }, [lines])

  const textPx = Math.round(Math.min(Math.max(size * 0.075, 12), 16))

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg viewBox="0 0 200 200" width={size} height={size}>
        <defs>
          <linearGradient id={`mascotBody-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cba6f7" />
            <stop offset="100%" stopColor="#b4befe" />
          </linearGradient>
        </defs>

        {/* ears */}
        <path d="M55 60 L40 20 L85 50 Z" fill="#cba6f7" />
        <path d="M145 60 L160 20 L115 50 Z" fill="#cba6f7" />
        <path d="M60 55 L50 32 L78 50 Z" fill="#f5c2e7" />
        <path d="M140 55 L150 32 L122 50 Z" fill="#f5c2e7" />

        {/* head */}
        <circle cx="100" cy="105" r="58" fill={`url(#mascotBody-${variant})`} />

        {/* terminal visor */}
        <rect x="54" y="82" width="92" height="42" rx="11" fill="#11111b" />
        <rect x="63" y="93" width="10" height="10" rx="2" fill="#a6e3a1">
          <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite" />
        </rect>
        <rect x="63" y="107" width="26" height="5" rx="2.5" fill="#585b70" />

        {/* whiskers */}
        <line x1="30" y1="112" x2="58" y2="108" stroke="#b4befe" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="30" y1="123" x2="58" y2="123" stroke="#b4befe" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="170" y1="112" x2="142" y2="108" stroke="#b4befe" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="170" y1="123" x2="142" y2="123" stroke="#b4befe" strokeWidth="2.5" strokeLinecap="round" />

        {/* nose */}
        <path d="M96 135 L104 135 L100 141 Z" fill="#f38ba8" />

        {/* accessories per variant */}
        {variant === 'writeups' && (
          <g>
            <circle cx="158" cy="132" r="14" fill="none" stroke="#f9e2af" strokeWidth="4" />
            <line x1="168" y1="142" x2="180" y2="154" stroke="#f9e2af" strokeWidth="5" strokeLinecap="round" />
          </g>
        )}

        {variant === 'blog' && (
          <g transform="translate(152 122) rotate(25)">
            <rect x="-4" y="-2" width="34" height="8" rx="4" fill="#f9e2af" />
            <path d="M28 -2 L40 2 L28 6 Z" fill="#eba0ac" />
          </g>
        )}

        {variant === 'about' && (
          <g>
            <path d="M48 100 A52 52 0 0 1 152 100" fill="none" stroke="#585b70" strokeWidth="5" strokeLinecap="round" />
            <rect x="40" y="96" width="14" height="22" rx="6" fill="#94e2d5" />
            <rect x="146" y="96" width="14" height="22" rx="6" fill="#94e2d5" />
          </g>
        )}
      </svg>

      <div
        className="mascot-terminal-text"
        style={{
          left: (76 / 200) * 100 + '%',
          top: (91 / 200) * 100 + '%',
          width: (68 / 200) * 100 + '%',
          height: (14 / 200) * 100 + '%',
          fontSize: textPx,
        }}
      >
        {lines[i]}
      </div>
    </div>
  )
}
