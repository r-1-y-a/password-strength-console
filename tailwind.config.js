/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0A0E12',
        panel: '#12181F',
        'panel-2': '#171E27',
        line: '#232C36',
        ink: '#E4E9EE',
        'ink-dim': '#8592A0',
        'ink-faint': '#4E5A66',
        signal: {
          crimson: '#E5484D',
          amber: '#F2A93B',
          cyan: '#4FD6C4',
          violet: '#8B7FF0',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        blink: { '0%, 49%': { opacity: 1 }, '50%, 100%': { opacity: 0 } },
        scan: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
        flash: { '0%': { opacity: 0 }, '15%': { opacity: 1 }, '100%': { opacity: 0 } },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        scan: 'scan 2.2s linear infinite',
        flash: 'flash 0.6s ease-out',
      },
    },
  },
  plugins: [],
}
