/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: '#f0f7ff',
          100: '#e0f0ff',
          200: '#bae0ff',
          300: '#7cc6ff',
          400: '#36a6ff',
          500: '#0088ff',
          600: '#0066ff',
          700: '#0055d4',
          800: '#0044a8',
          900: '#003380',
        },
        // Dark mode specific colors
        dark: {
          bg: '#0f172a',
          card: '#1e293b',
          border: '#334155',
          text: {
            primary: '#f8fafc',
            secondary: '#cbd5e1',
            muted: '#64748b',
          }
        },
        // Light mode specific colors
        light: {
          bg: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
          text: {
            primary: '#0f172a',
            secondary: '#334155',
            muted: '#64748b',
          }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};