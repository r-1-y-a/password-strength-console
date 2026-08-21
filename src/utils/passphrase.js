import { WORDLIST } from './wordlist'

/**
 * Returns a cryptographically secure random integer in [0, max) using
 * rejection sampling so the result is unbiased across the full range.
 */
function secureRandomInt(max) {
  const range = Math.floor(0xffffffff / max) * max
  const buffer = new Uint32Array(1)
  let value
  do {
    crypto.getRandomValues(buffer)
    value = buffer[0]
  } while (value >= range)
  return value % max
}

const DELIMITERS = ['-', '.', '_', ' ']

/**
 * Generates a high-entropy passphrase from `wordCount` random dictionary
 * words joined by `delimiter`, optionally capitalizing each word and
 * appending a random digit for services that require one.
 */
export function generatePassphrase({
  wordCount = 4,
  delimiter = '-',
  capitalize = true,
  appendNumber = true,
} = {}) {
  const words = Array.from({ length: wordCount }, () => {
    const word = WORDLIST[secureRandomInt(WORDLIST.length)]
    return capitalize ? word[0].toUpperCase() + word.slice(1) : word
  })

  if (appendNumber) {
    words.push(String(secureRandomInt(100)).padStart(2, '0'))
  }

  return words.join(delimiter)
}

/** Bits of entropy contributed by the dictionary choices alone (excludes the trailing number). */
export function passphraseEntropyBits(wordCount) {
  return wordCount * Math.log2(WORDLIST.length)
}

export { DELIMITERS }
