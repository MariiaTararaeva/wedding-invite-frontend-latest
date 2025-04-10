// tailwind.config.ts
import type { Config } from 'tailwindcss';
const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        aliceBlue: '#3BACEA',
        teaGreen: '#D0F0C0',
        queenRed: '#CE2E6C'
      },
      fontFamily: {
        fancy: ['"Playfair Display"', 'serif']  // example fancy font
      }
    },
  },
  plugins: [],
};

export default config;
