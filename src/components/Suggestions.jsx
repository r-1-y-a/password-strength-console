export default function Suggestions({ warning, suggestions, hasInput, score }) {
  if (!hasInput) {
    return (
      <p className="text-sm text-ink-faint font-mono">
        Waiting for input — feedback appears here as you type.
      </p>
    )
  }

  const nothingToSay = !warning && suggestions.length === 0

  if (nothingToSay && score >= 3) {
    return (
      <p className="text-sm text-signal-cyan font-mono">
        No weaknesses detected. This password resists common cracking patterns.
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {warning && (
        <li className="flex gap-2.5 text-sm text-signal-amber">
          <span className="font-mono text-signal-amber/70 shrink-0">!</span>
          <span>{warning}</span>
        </li>
      )}
      {suggestions.map((s, i) => (
        <li key={i} className="flex gap-2.5 text-sm text-ink-dim">
          <span className="font-mono text-ink-faint shrink-0">›</span>
          <span>{s}</span>
        </li>
      ))}
      {nothingToSay && (
        <li className="text-sm text-ink-dim">
          Add length or unpredictable structure to raise this further.
        </li>
      )}
    </ul>
  )
}
