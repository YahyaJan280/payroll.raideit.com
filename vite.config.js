import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),      // Enables React fast refresh and JSX support
    tailwindcss(), // Integrates TailwindCSS
  ],
  base: '/payroll.raideit.com/', // Required for GitHub Pages deployment
})
