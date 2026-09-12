import { useRef, useState } from 'react'

export default function CodeBlock(props) {
  const preRef = useRef(null)
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    const text = preRef.current?.innerText || ''
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    })
  }

  return (
    <div className="code-block-wrap">
      <button className="copy-btn" onClick={handleCopy}>{copied ? 'Copied' : 'Copy'}</button>
      <pre ref={preRef} {...props} />
    </div>
  )
}
