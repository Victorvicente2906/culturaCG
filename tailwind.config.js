/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#6A0DAD',
          secondary: '#FF9E0B',
          white: '#FFFFFF',
          light: '#F3F4F6',
          green: '#22C55E',
          red: '#EF4444',
          yellow: '#F59E0B',
          dark: '#111827',
          muted: '#6B7280',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(106, 13, 173, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
