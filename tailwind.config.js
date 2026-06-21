/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── Brand Colors ──────────────────────────────────────────────
      colors: {
        void:    '#050508',       // Deepest background
        surface: '#0D0D14',       // Card / section surfaces
        border:  '#1A1A2A',       // Subtle borders
        indigo:  '#6C63FF',       // Primary accent
        teal:    '#00D4C2',       // Secondary accent
        amber:   '#FF9F43',       // CTA accent (use sparingly)
        'warm-white': '#F0EDE8',  // Primary text
        muted:   '#8B8FA8',       // Secondary text
        dim:     '#4A4D5E',       // Tertiary text / decorative
      },
      // ── Typography ────────────────────────────────────────────────
      fontFamily: {
        display: ['Syne', 'sans-serif'],   // Hero headlines
        body:    ['DM Sans', 'sans-serif'], // UI & navigation
        mono:    ['DM Mono', 'monospace'],  // Data & code
        serif:   ['Instrument Serif', 'serif'], // Research body
      },
      // ── Spacing & Layout ──────────────────────────────────────────
      maxWidth: {
        site: '1200px',
      },
      // ── Animation ─────────────────────────────────────────────────
      transitionTimingFunction: {
        precision: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'draw-line': {
          '0%':   { width: '0%' },
          '100%': { width: '100%' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.6s ease forwards',
        'draw-line':  'draw-line 1s ease forwards',
        'pulse-dot':  'pulse-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
