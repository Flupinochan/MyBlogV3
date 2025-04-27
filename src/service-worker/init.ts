export const initServiceWorker = () => {
  // service workerがサポートされている場合
  if ('serviceWorker' in navigator) {
    // service workerを登録 ※scopeで対象のfolderを分けて複数のservice workerを登録することは可能
    navigator.serviceWorker.register('/serviceWorker.js', { scope: "/" })
      .then(function () {
        console.log('Service Worker Registered');
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
}
