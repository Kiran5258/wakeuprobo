import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc"
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  server:{
    proxy:{
      '/server':{
        target:'http://localhost:3000',
        changeOrgin:true,
        secure:false,
      },
    },
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})