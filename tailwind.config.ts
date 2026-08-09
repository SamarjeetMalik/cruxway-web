import type { Config } from 'tailwindcss';

/**
 * Colours are semantic roles backed by CSS variables (see `app/globals.css`),
 * not literal values — that is what lets the same markup serve the day and
 * night themes. The underlying palette is Cruxway's own, from the LP deck:
 * navy #0A1F44, bronze #B8945F, bone #DCD6C8.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          alt: 'rgb(var(--surface-alt) / <alpha-value>)',
          deep: 'rgb(var(--surface-deep) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          soft: 'rgb(var(--ink-soft) / <alpha-value>)',
        },
        /** Text and rules that sit on `surface-deep`, in either theme. */
        parchment: {
          DEFAULT: 'rgb(var(--parchment) / <alpha-value>)',
          soft: 'rgb(var(--parchment-soft) / <alpha-value>)',
        },
        rule: {
          DEFAULT: 'rgb(var(--rule) / <alpha-value>)',
          deep: 'rgb(var(--rule-deep) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          deep: 'rgb(var(--accent-deep) / <alpha-value>)',
        },
      },

      fontFamily: {
        serif: ['var(--font-garamond)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },

      fontSize: {
        // Display sizes are fluid; the lower bound is the mobile composition,
        // not a shrunken desktop one.
        'display-xl': ['clamp(2.75rem, 7vw, 6.25rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        display: ['clamp(2.25rem, 5vw, 4.25rem)', { lineHeight: '1.06', letterSpacing: '-0.028em' }],
        title: ['clamp(1.75rem, 3.2vw, 2.875rem)', { lineHeight: '1.12', letterSpacing: '-0.022em' }],
        subtitle: ['clamp(1.3rem, 2vw, 1.75rem)', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        lead: ['clamp(1.125rem, 1.35vw, 1.4375rem)', { lineHeight: '1.55', letterSpacing: '-0.01em' }],
        body: ['1.0625rem', { lineHeight: '1.72' }],
        small: ['0.9375rem', { lineHeight: '1.65' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.2em' }],
        numeral: ['clamp(1.5rem, 2.4vw, 2.25rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },

      maxWidth: {
        measure: '34rem', // ~62 characters — the body-copy measure
        'measure-wide': '44rem',
        shell: '78rem',
      },

      spacing: {
        section: 'clamp(4.5rem, 9vw, 9rem)',
        'section-lg': 'clamp(6rem, 13vw, 13rem)',
        gutter: 'clamp(1.25rem, 5vw, 4.5rem)',
      },

      transitionTimingFunction: {
        // Cruxway's existing signature easing, carried across from the old site.
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
