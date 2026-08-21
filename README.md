# cipher/gauge — Password Strength Console

An interactive password strength evaluator and passphrase generator built with
Vite, React, and Tailwind CSS.

## Features

- **Real-time strength evaluation** using [`@zxcvbn-ts/core`](https://github.com/zxcvbn-ts/zxcvbn) —
  a segmented 0–4 strength meter, character-set badges (lowercase, uppercase,
  numbers, symbols), and specific improvement suggestions drawn from
  zxcvbn's pattern-matching feedback.
- **Time-to-crack estimates** across five threat models: throttled and
  unthrottled online attacks, salted slow hashing (bcrypt/scrypt/Argon2), and
  offline fast hashing at both 10¹⁰ and 10¹¹ guesses/sec (single GPU vs. a
  specialized GPU cluster).
- **Passphrase generator** that builds 4–5 word Diceware-style passphrases
  using `crypto.getRandomValues()` for cryptographically secure randomness,
  with a one-click copy-to-clipboard button.
- Dark, responsive UI built with Tailwind CSS. Everything runs client-side —
  no password ever leaves the browser.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/
    PasswordInput.jsx        # password field with show/hide + live entropy readout
    StrengthMeter.jsx        # segmented 0-4 strength meter
    CharsetBadges.jsx        # lowercase/uppercase/number/symbol indicators
    Suggestions.jsx          # zxcvbn feedback + warnings
    CrackTimePanel.jsx       # time-to-crack across threat models
    PassphraseGenerator.jsx  # word-count/delimiter controls + copy button
  utils/
    zxcvbnSetup.js           # @zxcvbn-ts/core factory + English language packs
    crackTime.js             # threat-model guess rates + duration formatting
    passphrase.js            # crypto.getRandomValues()-based passphrase generator
    wordlist.js               # curated word list for passphrase generation
  App.jsx
  main.jsx
```

## Notes

- Strength scoring and crack-time math run entirely in the browser; nothing
  typed into the password field is transmitted anywhere.
- The offline fast-hashing rates (10¹⁰ / 10¹¹ guesses/sec) are illustrative
  estimates for unsalted, fast-hash algorithms on modern GPU hardware — real
  attacker throughput varies by algorithm, salting, and hardware.
