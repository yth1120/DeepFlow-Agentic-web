/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        brand: {
          black: '#030712',
          dark: '#0B0F19',
          card: '#111827',
          border: '#1F2937',
          text: '#9CA3AF',
          accent: '#00E5FF', // DeepSeek Aurora Cyan
          blue: '#2563EB',   // DeepSeek Deep Blue
        },
      },
    },
  },
  plugins: [],
};
