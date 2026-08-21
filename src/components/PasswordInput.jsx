import { useState } from 'react'

export default function PasswordInput({ value, onChange, guessesLog10 }) {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <label htmlFor="password-input" className="text-xs tracking-widest text-ink-faint bracket-label font-mono uppercase mb-2 block">
        Password input
      </label>
      <div className="relative">
        <input
          id="password-input"
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="type or paste a password to evaluate"
          autoComplete="off"
          spellCheck="false"
          className="w-full rounded-md border border-line bg-panel-2 px-4 py-3.5 pr-24 font-mono text-lg text-ink placeholder:text-ink-faint placeholder:font-sans placeholder:text-sm focus:border-signal-cyan/60 outline-none transition-colors"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono uppercase tracking-wide text-ink-dim hover:text-signal-cyan transition-colors px-2 py-1"
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs font-mono text-ink-faint h-4">
        <span>{value.length} chars</span>
        {value.length > 0 && (
          <span>
            ~{Math.max(0, Math.round(guessesLog10 * 3.32))} bits entropy
          </span>
        )}
      </div>
    </div>
  )
}
