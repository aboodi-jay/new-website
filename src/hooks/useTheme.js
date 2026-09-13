import { useState, useEffect, useCallback } from 'react'
import { flushSync } from 'react-dom'
import { hljsThemeCss } from '../lib/hljsThemes'

const KEY = 'aboodijay_theme'
const HLJS_STYLE_ID = 'hljs-theme-style'

function applyHljsTheme(theme) {
  let tag = document.getElementById(HLJS_STYLE_ID)
  if (!tag) {
    tag = document.createElement('style')
    tag.id = HLJS_STYLE_ID
    document.head.appendChild(tag)
  }
  tag.textContent = hljsThemeCss[theme] || hljsThemeCss.dark
}

export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem(KEY) || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(KEY, theme)
    applyHljsTheme(theme)
  }, [theme])

  // Accepts the click event so, where supported, the theme swap can animate
  // as a circular reveal expanding out from wherever the toggle button is.
  const toggle = useCallback((event) => {
    const flip = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

    const supportsViewTransitions = typeof document.startViewTransition === 'function'
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!supportsViewTransitions || prefersReducedMotion || !event) {
      flip()
      return
    }

    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => flushSync(flip))
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 550,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }, [])

  return { theme, toggle }
}
