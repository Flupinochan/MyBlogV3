const swSelf = globalThis as unknown as ServiceWorkerGlobalScope;
// キャッシュ名 ※名前を変更すると再キャッシュされる
const CACHE_DYNAMIC_NAME = 'dynamic-cache-v2';

// 指定したファイルをキャッシュすることも可能だが、fetchでキャッシュすることも可能
// 全てのファイルは、GETリクエストでサーバから取得しているため

swSelf.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      console.log('Service worker installed', event);
    })()
  );
});

swSelf.addEventListener('activate', async (event) => {
  console.log('Service worker activated', event);
  // デフォルトでは、インストール後は次回読み込み時からアクティブになるが、
  // 以下claim()を返すことで、インストール後の既存のページでも即座にアクティベート可能
  await swSelf.clients.claim();
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
      (async () => {
        const cachedResponse = await caches.match(event.request);
        // キャッシュがある場合は、キャッシュを返す
        if (cachedResponse) {
          return cachedResponse;
        }

        // キャッシュがない場合は、リクエストして取得し、キャッシュして返す
        const response = await fetch(event.request);
        // レスポンスが200であればキャッシュに保存
        if (response && response.status === 200) {
          const clonedResponse = response.clone();
          const cache = await caches.open(CACHE_DYNAMIC_NAME);
          // event.request 名をキャッシュキー名でキャッシュする
          cache.put(event.request, clonedResponse);
        }
        return response;
      })()
    );
  } else {
    // GET 以外のリクエストにはキャッシュしない
    event.respondWith(fetch(event.request));
  }

  // getCacheSizeMB(CACHE_DYNAMIC_NAME);
});

/**
 * キャッシュサイズを確認
 * @param cacheName - キャッシュ名
 */
async function getCacheSizeMB(cacheName: string): Promise<void> {
  const cache = await caches.open(cacheName);
  const requests = await cache.keys();
  let totalSize: number = 0;

  // 各リソースのサイズを取得
  const promises: Promise<void>[] = requests.map(async (request) => {
    const response = await cache.match(request);
    if (response) {
      const blob = await response.blob();
      totalSize += blob.size; // サイズを合計
    }
  });

  // 全てのリソースのサイズを計算し、MB単位に変換してコンソールに表示
  await Promise.all(promises);
  const totalSizeMB: number = totalSize / (1024 * 1024); // バイトをMBに変換
  console.log(`Cache Size for ${cacheName}: ${totalSizeMB.toFixed(2)} MB`);
}
