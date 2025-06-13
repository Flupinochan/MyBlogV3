import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa'

const ReactCompilerConfig = { /* ... */ };

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
    // service workerによるキャッシュ設定
    // VitePWA({
    //   // 以下自動生成するため設定しない
    //   // srcDir: './src/pwa', // 以下のmanifestで定義するため不要
    //   // outDir: "xxx" // reactをキャッシュするので、reactの出力先と同じで問題ない
    //   // filename: 'sw.ts',
    //   // manifestFilename: 'manifest.json',
    //   // strategies: 'generateSW',
    //   // injectManifest: {
    //   // },
    //   registerType: 'autoUpdate',
    //   injectRegister: 'auto', // Service Workerへの自動登録 (バージョン切り替えを手動で行いたい場合はnullにする)
    //   workbox: {
    //     clientsClaim: true,
    //     skipWaiting: true,
    //     globPatterns: ['**/*.{js,css,html,ico,jpg,png,svg,webmanifest,json,yaml}'], // キャッシュ対象のファイル ※デフォルトでは2MBまで
    //     globIgnores: [
    //       '**/*.map',
    //       '**/LICENSE*'] // キャッシュ対象外のファイル
    //   },
    //   devOptions: {
    //     enabled: true,
    //     type: 'module',
    //   },
    //   includeAssets: [
    //     'favicon.ico',
    //     'favicon.png',
    //     'apple-touch-icon.png',
    //   ],
    //   // manifest.jsonを定義
    //   manifest: {
    //     background_color: '#0d1117',
    //     categories: ['lifestyle', 'personalization'],
    //     description: 'MetalMental Blog',
    //     display: 'standalone',
    //     // file_handlers // .txt は メモ帳 で開くなど拡張子に基づいてアプリを起動させる設定
    //     icons: [
    //       {
    //         "src": "/favicon.ico",
    //         "sizes": "16x16 32x32 48x48",
    //         "type": "image/x-icon"
    //       },
    //       {
    //         "src": "/favicon.png",
    //         "sizes": "192x192",
    //         "type": "image/png"
    //       },
    //       {
    //         "src": "/apple-touch-icon.png",
    //         "sizes": "180x180",
    //         "type": "image/png"
    //       },
    //       {
    //         "src": "/favicon.png",
    //         "sizes": "192x192",
    //         "type": "image/png",
    //         "purpose": "maskable"
    //       }
    //     ],
    //     // id: 'https://www.metalmental.net',
    //     launch_handler: {
    //       client_mode: 'auto'
    //     },
    //     name: 'MetalMental Blog',
    //     orientation: 'any',
    //     short_name: 'MetalMental',
    //     shortcuts: [
    //       {
    //         "name": "MetalMental Blog",
    //         "short_name": "MetalMental",
    //         "description": "Open MetalMental Blog",
    //         "url": "/",
    //         "icons": [
    //           {
    //             "src": "favicon.png",
    //             "sizes": "192x192"
    //           }
    //         ]
    //       }
    //     ],
    //     start_url: '/',
    //     theme_color: '#7828C8'
    //   }
    // })
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
