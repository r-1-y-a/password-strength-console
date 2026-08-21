const SCORE_META = [
  { label: 'Very weak', color: 'bg-signal-crimson', text: 'text-signal-crimson' },
  { label: 'Weak', color: 'bg-signal-crimson', text: 'text-signal-crimson' },
  { label: 'Fair', color: 'bg-signal-amber', text: 'text-signal-amber' },
  { label: 'Good', color: 'bg-signal-cyan', text: 'text-signal-cyan' },
  { label: 'Strong', color: 'bg-signal-violet', text: 'text-signal-violet' },
]

export default function StrengthMeter({ score, hasInput }) {
  const meta = SCORE_META[score] ?? SCORE_META[0]

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-xs tracking-widest text-ink-faint bracket-label font-mono uppercase">
          Strength
        </span>
        <span className={`font-mono text-sm font-semibold ${hasInput ? meta.text : 'text-ink-faint'}`}>
          {hasInput ? meta.label : '—'}
        </span>
      </div>
      <div className="grid grid-cols-5 gap-1.5" role="meter" aria-valuemin={0} aria-valuemax={4} aria-valuenow={hasInput ? score : 0}>
        {Array.from({ length: 5 }).map((_, i) => {
          const lit = hasInput && i <= score
          return (
            <div
              key={i}
              className={`h-2.5 rounded-sm transition-colors duration-300 ${
                lit ? meta.color : 'bg-line'
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}
