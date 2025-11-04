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
        background: '#FFFFFF',
        surface: '#F5F5F5',
        text: {
          primary: '#1A1A1A',
          secondary: '#555555',
        },
        primary: '#FFD700', // Jaune doré (accent)
        secondary: '#0D47A1', // Bleu foncé profond (accent secondaire)
        live: '#E63946', // Alerte / live
        success: '#2E7D32', // Succès / victoire
        border: '#E0E0E0', // Bordures / séparateurs
        hover: '#FFF7CC', // Couleur de survol
      },
      fontFamily: {
        
      },
    },
  },
  plugins: [],
}
export default config