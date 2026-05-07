import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'rgba(200, 169, 106, 0.15)', // Subtle gold border
        input: 'rgba(200, 169, 106, 0.1)',
        ring: '#C8A96A',
        background: '#0D0D0D', // Dark luxury base
        foreground: '#F7F5F0', // Warm white text
        primary: {
          DEFAULT: '#C8A96A', // Gold
          foreground: '#0D0D0D',
          hover: '#dfbd76',
        },
        secondary: {
          DEFAULT: '#244F3A', // Deep green
          foreground: '#F7F5F0',
        },
        destructive: {
          DEFAULT: '#7f1d1d', // Muted deep red
          foreground: '#F7F5F0',
        },
        muted: {
          DEFAULT: '#151515', // Slightly lighter than base for contrast
          foreground: 'rgba(247, 245, 240, 0.6)', // Muted warm white
        },
        accent: {
          DEFAULT: '#1C1C1C', // Dark surface
          foreground: '#C8A96A', // Gold text
        },
        card: {
          DEFAULT: '#151515',
          foreground: '#F7F5F0',
        },
        popover: {
          DEFAULT: '#0D0D0D',
          foreground: '#F7F5F0',
        },
        sidebar: {
          DEFAULT: '#0D0D0D',
          foreground: '#F7F5F0',
          accent: '#151515',
          border: 'rgba(200, 169, 106, 0.1)',
        },
      },
      borderRadius: {
        lg: '16px',
        md: '12px',
        sm: '8px',
        arch: '50% 50% 0 0', // Islamic arch shape
      },
      fontFamily: {
        sans: ['Outfit', 'Cairo', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', '"Amiri"', 'serif'],
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-up': { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'fade-down': { from: { opacity: '0', transform: 'translateY(-20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'zoom-in': { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
        'slow-pan': { '0%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' }, '100%': { backgroundPosition: '0% 50%' } },
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'fade-up': 'fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-down': 'fade-down 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'zoom-in': 'zoom-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slow-pan': 'slow-pan 20s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'vignette': 'radial-gradient(circle, transparent 50%, #0D0D0D 100%)',
        'gold-glow': 'radial-gradient(circle, rgba(200, 169, 106, 0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
