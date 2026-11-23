/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FFF9F0',
          50: '#FFFFFF',
          100: '#FFFDF9',
          200: '#FFF9F0',
          300: '#FAF2E4',
          400: '#F5EADB',
          500: '#EBDDC9',
        },
        champagne: {
          light: '#F4ECE0',
          DEFAULT: '#E9DCCB',
          dark: '#D4C3AC',
        },
        dustyRose: {
          light: '#ECC5C1',
          DEFAULT: '#D9A6A0',
          dark: '#BF857E',
        },
        lavender: {
          light: '#E1DCF3',
          DEFAULT: '#C9C0E8',
          dark: '#AB9FD4',
        },
        midnight: {
          DEFAULT: '#252641',
          light: '#35375A',
          dark: '#18192E',
          deep: '#0F1020',
        },
        sage: {
          light: '#C7D2C0',
          DEFAULT: '#A9B7A0',
          dark: '#87977D',
        },
        wax: {
          DEFAULT: '#B44335',
          gold: '#C59B27',
          bronze: '#A67C52',
        },
        graphite: {
          light: '#767676',
          DEFAULT: '#4A4A4A',
          dark: '#2B2B2B',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['"Caveat"', 'cursive'],
        script: ['"Dancing Script"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'drift': 'drift 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        drift: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, -15px)' },
          '100%': { transform: 'translate(0, 0)' },
        }
      }
    },
  },
  plugins: [],
}
