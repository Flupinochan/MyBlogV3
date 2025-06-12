import { Workbox } from 'workbox-window';

export const initServiceWorker = async () => {
  // service workerがサポートされている場合
  if ('serviceWorker' in navigator) {
    try {
      // service workerを登録
      // await navigator.serviceWorker.register('/serviceWorker.js', {
      //   scope: "/",
      //   type: "module"
      // });
      const wb = new Workbox('/serviceWorker.js');
      wb.register();
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
}
