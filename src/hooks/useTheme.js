import { useState, useEffect, useCallback } from 'react'
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

  const toggle = useCallback(() => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
