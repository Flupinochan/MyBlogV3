export const initServiceWorker = async () => {
  // service workerがサポートされている場合
  if ('serviceWorker' in navigator) {
    try {
      // service workerを登録
      await navigator.serviceWorker.register('/serviceWorker.js', { scope: "/" });
      console.log('Service Worker Registered');
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
}
