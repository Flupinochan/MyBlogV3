import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa'

const ReactCompilerConfig = { target: '18' };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler", ReactCompilerConfig],
        ],
      },
    }),
  ],
  // -ハイフン区切りのclassNameをキャメルケースで利用可能
  css: {
    modules: {
      localsConvention: "dashes"
    }
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        react: './index.html',
        service_worker: './src/service-worker/serviceWorker.ts'
      },
      output: {
        entryFileNames: (chunkInfo) => {
          // serviceWorker.tsの場合の出力名、出力先
          if (chunkInfo.name === 'service_worker') {
            return 'serviceWorker.js';
          }
          // それ以外のファイルの出力名、出力先
          return 'assets/[name]-[hash].js';
        }
      },
    }
  }
})
