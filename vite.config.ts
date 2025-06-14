import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

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
    // https://vite-pwa-org.netlify.app/guide/inject-manifest.html
    VitePWA({
      // 開発環境で有効化
      devOptions: {
        enabled: true,
        type: 'module',
      },
      // manifest.json/静的ファイルキャッシュ設定
      strategies: 'injectManifest',
      srcDir: 'src/service-worker',
      filename: 'serviceWorker.ts',
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,woff2,json,yaml,txt,webp}'],
        globIgnores: ['**/*.gif'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
      },
      // service workerの登録設定
      registerType: 'autoUpdate',
    })
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
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return 'assets/[name]-[hash].js';
        }
      },
    }
  }
})