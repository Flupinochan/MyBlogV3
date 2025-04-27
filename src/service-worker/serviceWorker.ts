/**
 * ■Application Cache
 * Cache API(cache) と CacheStorage API(caches)がある
 * Cache APIでキャッシュを追加
 * CacheStorage APIでキャッシュを削除
 * 
 * open キャッシュストレージを作成
 * add (fetch + put) fetch(request)して取得した結果をputでキャッシュする
 * put キー, 値でキャッシュする
 * match キャッシュを取得する
 * keys キャッシュされているキーを一覧取得する
 * 
 * install と activate
 * どちらも1度だけ実行されるが、以下のように使い分けることが多い
 * install キャッシュする
 * activate 古いキャッシュを削除する
 */
// 指定したファイルをキャッシュすることも可能だが、fetchでキャッシュすることも可能
// ※全てのファイルは、GETリクエストでサーバから取得しているため

// import { getCacheSizeMB } from "./cacheUtils";

const swSelf = globalThis as unknown as ServiceWorkerGlobalScope;
// キャッシュ名
const CACHE_DYNAMIC_NAME = 'dynamic-cache-v2';


swSelf.addEventListener('install', (event) => {
  // 指定したファイル、URLをキャッシュする ※/はルートパスへのリクエストをキャッシュする
  const preCache = async () => {
    const cache = await caches.open(CACHE_DYNAMIC_NAME);
    return cache.addAll([
      '/',
      '/index.html',
      '/robots.txt',
      // 以下のようなCDNもキャッシュ可能だが、CORSで拒否されるため、追加の設定が必要
      // 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
    ]);
  };
  event.waitUntil(preCache());
  // 1. 即座にactivateを実行
  swSelf.skipWaiting();
});


swSelf.addEventListener('activate', async (_event) => {
  // 2. 新規にactive化したservice workerに制御権を渡す
  await swSelf.clients.claim();

  // 古いキャッシュを削除
  const cacheNames = await caches.keys();
  const oldCacheNames = cacheNames.filter((cacheName) => cacheName !== CACHE_DYNAMIC_NAME);
  await Promise.all(oldCacheNames.map((cacheName) => caches.delete(cacheName)));
});


// application cache strageにキャッシュする
swSelf.addEventListener('fetch', (event) => {
  // 拡張機能からのリクエストはキャッシュしない
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  // GET 以外のリクエストはキャッシュしない
  if (event.request.method !== 'GET') {
    return event.respondWith(fetch(event.request));
  }

  const getCache = async () => {
    // キャッシュがある場合は、キャッシュを返す
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // キャッシュがない場合は、リクエストして取得し、キャッシュして返す
    const response = await fetch(event.request);
    // レスポンスが200であればキャッシュに保存
    if (response && response.status === 200) {
      const clonedResponse = response.clone();
      // CacheStorageにCache名で開く
      const cache = await caches.open(CACHE_DYNAMIC_NAME);
      // キー名: event.request, 値: response でキャッシュする
      cache.put(event.request, clonedResponse);
    }
    return response;
  };
  return event.respondWith(getCache());

  // getCacheSizeMB(CACHE_DYNAMIC_NAME);
});

