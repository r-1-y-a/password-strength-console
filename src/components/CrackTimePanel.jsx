export default function CrackTimePanel({ crackTimes, hasInput }) {
  const online = crackTimes.filter((m) => m.group === 'online')
  const offline = crackTimes.filter((m) => m.group === 'offline')

  return (
    <div>
      <span className="text-xs tracking-widest text-ink-faint bracket-label font-mono uppercase mb-3 block">
        Time to crack
      </span>

      {!hasInput ? (
        <p className="text-sm text-ink-faint font-mono">
          Estimates for each attack scenario appear here.
        </p>
      ) : (
        <div className="space-y-4">
          <Group title="Online attack" rows={online} />
          <Group title="Offline hashing" rows={offline} />
        </div>
      )}
    </div>
  )
}

function Group({ title, rows }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-ink-faint mb-1.5">{title}</p>
      <div className="rounded-md border border-line divide-y divide-line overflow-hidden">
        {rows.map((row) => (
          <div key={row.id} className="flex items-center justify-between gap-3 px-3 py-2.5 bg-panel-2/60">
            <div className="min-w-0">
              <p className="text-sm text-ink truncate">{row.label}</p>
              <p className="text-[11px] text-ink-faint truncate">{row.detail}</p>
            </div>
            <span className="font-mono text-sm text-signal-cyan whitespace-nowrap shrink-0">
              {row.display}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
