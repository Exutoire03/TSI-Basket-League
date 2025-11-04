import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        // Nouvelles couleurs
        background: 'var(--background)',
        'background-secondary': 'var(--background-secondary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        accent: 'var(--accent)',
        'accent-secondary': 'var(--accent-secondary)',
        alert: 'var(--alert)',
        success: 'var(--success)',
        border: 'var(--border)',
        hover: 'var(--hover)',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        sans: ['var(--font-body)'],
      },
    },
  },
  plugins: [],
}
export default config