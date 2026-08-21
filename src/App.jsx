import { useMemo, useState } from 'react'
import { zxcvbn } from './utils/zxcvbnSetup'
import { computeCrackTimes } from './utils/crackTime'

import PasswordInput from './components/PasswordInput'
import StrengthMeter from './components/StrengthMeter'
import CharsetBadges from './components/CharsetBadges'
import Suggestions from './components/Suggestions'
import CrackTimePanel from './components/CrackTimePanel'
import PassphraseGenerator from './components/PassphraseGenerator'

export default function App() {
  const [password, setPassword] = useState('')

  const result = useMemo(() => {
    if (!password) return null
    return zxcvbn.check(password)
  }, [password])

  const hasInput = password.length > 0
  const score = result?.score ?? 0
  const guesses = result?.guesses ?? 0
  const guessesLog10 = result?.guessesLog10 ?? 0
  const crackTimes = useMemo(() => computeCrackTimes(guesses || 1), [guesses])

  return (
    <div className="min-h-screen hex-grid-bg">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:py-16">
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-signal-cyan animate-blink" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-ink-faint">
              cipher/gauge
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
            Password strength console
          </h1>
          <p className="text-sm text-ink-dim mt-2 max-w-xl">
            Evaluate a password against real cracking patterns, see how long it
            would survive different attack scenarios, and generate a passphrase
            that won't.
          </p>
        </header>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* Left: input + evaluation */}
          <div className="lg:col-span-3 space-y-5">
            <section className="rounded-lg border border-line bg-panel p-5">
              <PasswordInput value={password} onChange={setPassword} guessesLog10={guessesLog10} />
              <div className="mt-5">
                <StrengthMeter score={score} hasInput={hasInput} />
              </div>
              <div className="mt-4">
                <CharsetBadges password={password} />
              </div>
            </section>

            <section className="rounded-lg border border-line bg-panel p-5">
              <span className="text-xs tracking-widest text-ink-faint bracket-label font-mono uppercase mb-3 block">
                Feedback
              </span>
              <Suggestions
                hasInput={hasInput}
                score={score}
                warning={result?.feedback?.warning}
                suggestions={result?.feedback?.suggestions ?? []}
              />
            </section>

            <section className="rounded-lg border border-line bg-panel p-5">
              <CrackTimePanel crackTimes={crackTimes} hasInput={hasInput} />
            </section>
          </div>

          {/* Right: generator */}
          <div className="lg:col-span-2">
            <section className="rounded-lg border border-line bg-panel p-5 lg:sticky lg:top-10">
              <PassphraseGenerator onUse={setPassword} />
            </section>
          </div>
        </div>

        <footer className="mt-10 text-center text-[11px] font-mono text-ink-faint">
          evaluated locally in your browser — nothing you type here is sent anywhere
        </footer>
      </div>
    </div>
  )
}
