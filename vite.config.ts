import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // -ハイフン区切りのclassNameをキャメルケースで利用可能
  css: {
    modules: {
      localsConvention: "dashes"
    }
  },
  build: {
    cssCodeSplit: false,
  }
})
