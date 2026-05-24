/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#f0fdf9',
          100: '#ccfbef',
          200: '#99f6e0',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        surface: {
          950: '#020817',
          900: '#060b14',
          800: '#0d1526',
          700: '#141f33',
          600: '#1e2d47',
          500: '#263a5a',
        },
        orange: {
          400: '#fb923c',
          500: '#f97316',
        },
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at 20% 20%, rgba(20,184,166,0.1) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(249,115,22,0.08) 0%, transparent 55%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
      },
      animation: {
        'spin-slow':  'spin 1s linear infinite',
        'fade-up':    'fadeUp 0.4s ease both',
        'fade-up-1':  'fadeUp 0.4s 0.08s ease both',
        'fade-up-2':  'fadeUp 0.4s 0.16s ease both',
        'fade-up-3':  'fadeUp 0.4s 0.24s ease both',
        'fade-up-4':  'fadeUp 0.4s 0.32s ease both',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer':    'shimmer 2s linear infinite',
        'scale-in':   'scaleIn 0.3s ease both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.4' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% 0' },
          to:   { backgroundPosition: '200% 0' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.94)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'glow-teal':   '0 0 24px rgba(20,184,166,0.35)',
        'glow-orange': '0 0 24px rgba(249,115,22,0.35)',
        'card':        '0 8px 32px rgba(0,0,0,0.45)',
        'card-hover':  '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(20,184,166,0.15)',
        'modal':       '0 24px 80px rgba(0,0,0,0.7)',
      },
      borderRadius: {
        '2xl':  '1rem',
        '3xl':  '1.25rem',
        '4xl':  '1.5rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
