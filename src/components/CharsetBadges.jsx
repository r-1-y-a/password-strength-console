const CHARSETS = [
  { key: 'lower', label: 'a-z', name: 'Lowercase', test: (s) => /[a-z]/.test(s) },
  { key: 'upper', label: 'A-Z', name: 'Uppercase', test: (s) => /[A-Z]/.test(s) },
  { key: 'digit', label: '0-9', name: 'Numbers', test: (s) => /[0-9]/.test(s) },
  { key: 'symbol', label: '!@#', name: 'Symbols', test: (s) => /[^a-zA-Z0-9]/.test(s) },
]

export default function CharsetBadges({ password }) {
  return (
    <div className="flex flex-wrap gap-2">
      {CHARSETS.map(({ key, label, name, test }) => {
        const active = password.length > 0 && test(password)
        return (
          <div
            key={key}
            className={`flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs font-mono transition-colors ${
              active
                ? 'border-signal-cyan/40 bg-signal-cyan/10 text-signal-cyan'
                : 'border-line text-ink-faint'
            }`}
            title={name}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-signal-cyan' : 'bg-ink-faint'}`}
            />
            <span>{label}</span>
          </div>
        )
      })}
    </div>
  )
}
