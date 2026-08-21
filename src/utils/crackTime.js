// Threat models expressed as guesses-per-second, derived from the raw
// `guesses` estimate zxcvbn-ts produces for a given password. Keeping the
// rates here (rather than relying solely on zxcvbn's built-in bucket) lets
// us show both the 1e10 and 1e11 GPU-cluster scenarios the brief calls for.
export const THREAT_MODELS = [
  {
    id: 'online-throttled',
    label: 'Online — throttled',
    detail: '100 guesses / hour, rate-limited login form',
    ratePerSecond: 100 / 3600,
    group: 'online',
  },
  {
    id: 'online-unthrottled',
    label: 'Online — unthrottled',
    detail: '10 guesses / sec, no rate limiting or lockout',
    ratePerSecond: 10,
    group: 'online',
  },
  {
    id: 'offline-slow',
    label: 'Offline — salted, slow hash',
    detail: 'bcrypt / scrypt / Argon2, ~10⁴ guesses / sec',
    ratePerSecond: 1e4,
    group: 'offline',
  },
  {
    id: 'offline-fast-1e10',
    label: 'Offline — fast hash, single GPU',
    detail: 'unsalted MD5/SHA1 on one GPU, ~10¹⁰ guesses / sec',
    ratePerSecond: 1e10,
    group: 'offline',
  },
  {
    id: 'offline-fast-1e11',
    label: 'Offline — fast hash, GPU cluster',
    detail: 'specialized hardware array, ~10¹¹ guesses / sec',
    ratePerSecond: 1e11,
    group: 'offline',
  },
]

const UNITS = [
  { label: 'centuries', seconds: 60 * 60 * 24 * 365 * 100 },
  { label: 'years', seconds: 60 * 60 * 24 * 365 },
  { label: 'months', seconds: 60 * 60 * 24 * 30 },
  { label: 'days', seconds: 60 * 60 * 24 },
  { label: 'hours', seconds: 60 * 60 },
  { label: 'minutes', seconds: 60 },
  { label: 'seconds', seconds: 1 },
]

/** Formats a duration in seconds into a short, human-readable string. */
export function formatDuration(seconds) {
  if (!Number.isFinite(seconds)) return 'centuries'
  if (seconds < 1) return 'instantly'

  // Guesses can produce durations far beyond any UNITS bucket (10^30+ s).
  // Cap the display rather than let it overflow into scientific notation.
  const centuries = seconds / UNITS[0].seconds
  if (centuries > 1e6) return 'longer than the universe has existed'
  if (centuries >= 1) {
    const value = centuries
    if (value > 1000) return `${value.toExponential(1)} centuries`
    return `${Math.round(value).toLocaleString()} centuries`
  }

  for (const unit of UNITS.slice(1)) {
    const value = seconds / unit.seconds
    if (value >= 1) {
      const rounded = value >= 10 ? Math.round(value) : Math.round(value * 10) / 10
      return `${rounded} ${unit.label}`
    }
  }
  return 'instantly'
}

/** Computes crack-time estimates for a set of guesses across all threat models. */
export function computeCrackTimes(guesses) {
  return THREAT_MODELS.map((model) => {
    const seconds = guesses / model.ratePerSecond
    return {
      ...model,
      seconds,
      display: formatDuration(seconds),
    }
  })
}
