const swSelf = globalThis as unknown as ServiceWorkerGlobalScope;
const CACHE_DYNAMIC_NAME = 'dynamic-cache-v1';

// 指定したファイルをキャッシュすることも可能だが、fetchでキャッシュすることも可能
// 全てのファイルは、GETリクエストでサーバから取得しているため

swSelf.addEventListener('install', (event) => {
  event.waitUntil(
    new Promise<void>((resolve) => {
      console.log('Service worker installed', event);
      resolve();
    })
  );
});

swSelf.addEventListener('activate', (event) => {
  console.log('Service worker activated', event);
  // デフォルトでは、インストール後は次回読み込み時からアクティブになるが、
  // 以下claim()を返すことで、インストール後の既存のページでも即座にアクティベート可能
  return swSelf.clients.claim();
});

// GETリクエストキャッシュ設定
// application cache strageにキャッシュする
swSelf.addEventListener('fetch', (event) => {
  // 拡張機能からのリクエストはキャッシュしない
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // キャッシュがある場合は、キャッシュを返す
        if (cachedResponse) {
          return cachedResponse;
        }

        // キャッシュがない場合は、リクエストして取得し、キャッシュして返す
        return fetch(event.request).then((response) => {
          // レスポンスが200であればキャッシュに保存
          if (response && response.status === 200) {
            const clonedResponse = response.clone();
            caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
              // event.request 名をキャッシュキー名でキャッシュする
              cache.put(event.request, clonedResponse);
            });
          }
          return response;
        });
      })
    );
  } else {
    // GET 以外のリクエストにはキャッシュしない
    event.respondWith(fetch(event.request));
  }

  getCacheSizeMB(CACHE_DYNAMIC_NAME);
});

/**
 * キャッシュサイズを確認
 * @param cacheName - キャッシュ名
 */
function getCacheSizeMB(cacheName: string): void {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((requests) => {
      let totalSize: number = 0;

      // 各リソースのサイズを取得
      const promises: Promise<void>[] = requests.map((request) =>
        cache.match(request).then((response) => {
          if (response) {
            return response.blob().then((blob) => {
              totalSize += blob.size; // サイズを合計
            });
          }
        })
      );

      // 全てのリソースのサイズを計算し、MB単位に変換してコンソールに表示
      Promise.all(promises).then(() => {
        const totalSizeMB: number = totalSize / (1024 * 1024); // バイトをMBに変換
        console.log(`Cache Size for ${cacheName}: ${totalSizeMB.toFixed(2)} MB`);
      });
    });
  });
}