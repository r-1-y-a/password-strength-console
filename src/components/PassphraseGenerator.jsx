import { useState } from 'react'
import { generatePassphrase, passphraseEntropyBits, DELIMITERS } from '../utils/passphrase'

export default function PassphraseGenerator({ onUse }) {
  const [wordCount, setWordCount] = useState(4)
  const [delimiter, setDelimiter] = useState('-')
  const [passphrase, setPassphrase] = useState(() => generatePassphrase({ wordCount: 4, delimiter: '-' }))
  const [copied, setCopied] = useState(false)
  const [flash, setFlash] = useState(0)

  const regenerate = (overrides = {}) => {
    const next = generatePassphrase({
      wordCount: overrides.wordCount ?? wordCount,
      delimiter: overrides.delimiter ?? delimiter,
    })
    setPassphrase(next)
    setCopied(false)
    setFlash((f) => f + 1)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(passphrase)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API unavailable — fall back to manual selection.
      setCopied(false)
    }
  }

  const bits = Math.round(passphraseEntropyBits(wordCount))

  return (
    <div>
      <span className="text-xs tracking-widest text-ink-faint bracket-label font-mono uppercase mb-3 block">
        Passphrase generator
      </span>

      <div key={flash} className="relative rounded-md border border-line bg-panel-2 px-4 py-4 mb-3 overflow-hidden">
        <div className="absolute inset-0 bg-signal-cyan/10 pointer-events-none animate-flash" />
        <p className="font-mono text-lg sm:text-xl text-ink break-all relative">{passphrase}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3 text-xs font-mono">
        <span className="text-ink-faint">~{bits} bits (words only)</span>
        <span className="text-ink-faint">·</span>
        <span className="text-ink-faint">crypto.getRandomValues()</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <label className="text-xs text-ink-dim">
          <span className="block mb-1.5 uppercase tracking-wide text-ink-faint">Words</span>
          <select
            value={wordCount}
            onChange={(e) => {
              const wc = Number(e.target.value)
              setWordCount(wc)
              regenerate({ wordCount: wc })
            }}
            className="w-full rounded border border-line bg-void px-2.5 py-2 font-mono text-sm text-ink outline-none focus:border-signal-cyan/60"
          >
            {[4, 5].map((n) => (
              <option key={n} value={n}>{n} words</option>
            ))}
          </select>
        </label>
        <label className="text-xs text-ink-dim">
          <span className="block mb-1.5 uppercase tracking-wide text-ink-faint">Delimiter</span>
          <select
            value={delimiter}
            onChange={(e) => {
              setDelimiter(e.target.value)
              regenerate({ delimiter: e.target.value })
            }}
            className="w-full rounded border border-line bg-void px-2.5 py-2 font-mono text-sm text-ink outline-none focus:border-signal-cyan/60"
          >
            {DELIMITERS.map((d) => (
              <option key={d} value={d}>{d === ' ' ? 'space' : d}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => regenerate()}
          className="flex-1 rounded-md border border-line px-3 py-2.5 text-sm font-medium text-ink-dim hover:border-signal-cyan/50 hover:text-ink transition-colors"
        >
          Regenerate
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className={`flex-1 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
            copied
              ? 'bg-signal-cyan/20 text-signal-cyan border border-signal-cyan/40'
              : 'bg-signal-cyan text-void border border-signal-cyan hover:bg-signal-cyan/90'
          }`}
        >
          {copied ? 'Copied' : 'Copy to clipboard'}
        </button>
      </div>

      <button
        type="button"
        onClick={() => onUse(passphrase)}
        className="mt-2 w-full text-center text-xs font-mono text-ink-faint hover:text-signal-cyan transition-colors py-1"
      >
        evaluate this passphrase above ↑
      </button>
    </div>
  )
}
