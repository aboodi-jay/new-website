import { useState, useEffect, useRef } from 'react'

// Reveals `text` progressively over roughly `duration` ms, regardless of length,
// by advancing a variable number of characters per animation frame.
export function useTypewriter(text, duration = 900) {
  const [revealed, setRevealed] = useState('')
  const frameRef = useRef(null)

  useEffect(() => {
    setRevealed('')
    if (!text) return
    const total = text.length
    const start = performance.now()

    function tick(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const chars = Math.ceil(total * progress)
      setRevealed(text.slice(0, chars))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [text, duration])

  const done = revealed.length === (text || '').length
  return { revealed, done }
}
