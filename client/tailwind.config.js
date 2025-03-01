import plugin from 'tailwindcss/plugin';

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], 
  theme: {
    extend: {
    },
  },
  plugins: [
    require('tailwind-scrollbar'), 
  ],
};
