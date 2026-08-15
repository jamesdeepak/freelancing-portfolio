/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design Token Colors
        brand: {
          light: '#2563eb', // Professional blue accent
          DEFAULT: '#1d4ed8',
          dark: '#1e40af',
        },
        charcoal: {
          light: '#374151',
          DEFAULT: '#1f2937', // Charcoal body text in light mode
          dark: '#111827',
        },
        surface: {
          light: '#ffffff',
          dark: '#1e293b', // Gray-800 equivalent for surfaces in dark mode
        },
        bg: {
          light: '#fafafa', // Warm white/off-white background
          dark: '#0b0f19', // Near black background
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(15px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
