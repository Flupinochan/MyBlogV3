// workbox-recipes を参考
// https://developer.chrome.com/docs/workbox/modules/workbox-recipes?hl=ja

import { registerRoute } from 'workbox-routing';
import { NetworkFirst, NetworkOnly } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import type { RouteMatchCallback, WorkboxPlugin } from 'workbox-core/types';
import { clientsClaim } from 'workbox-core';

// 即座にService Workerを有効化
clientsClaim();

/////////
// GET //
/////////
// キャッシュ名
const cacheName = 'metalmental-get-cache';
// キャッシュ対象はGETメソッド
const matchCallback: RouteMatchCallback = ({ request }) => request.method === 'GET';
// 3秒以内に応答しなければキャッシュ応答
const networkTimeoutSeconds = 3;
// キャッシュ対象のHttpStatusCode
const statuses = [0, 200]

registerRoute(
  matchCallback,
  // Network優先
  new NetworkFirst({
    networkTimeoutSeconds,
    cacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses
      }),
    ],
  })
);

//////////
// POST //
//////////
const bgSyncPlugin = new BackgroundSyncPlugin('MetalMentalQueue', {
  maxRetentionTime: 24 * 60, // 24時間保存
});
const statusPlugin: WorkboxPlugin = {
  // 成功時(HttpStatusCodeが400以上の場合)
  // fetchDidSucceed: async ({ response }) => {
  //   if (response.status >= 400) {
  //     throw new Error(`HTTP Error: ${response.status}`);
  //   }
  //   return response;
  // },

  // ネットワークエラーなどで例外発生時に実行
  handlerDidError: async () => {
    return new Response(
      JSON.stringify({ error: 'POSTリクエストでエラーが発生しました。後で再試行されます。' }),
      {
        status: 202,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

registerRoute(
  /.*/, // 正規表現で対象のパスを指定
  new NetworkOnly({
    networkTimeoutSeconds,
    plugins: [bgSyncPlugin, statusPlugin],
  }),
  'POST'
);
