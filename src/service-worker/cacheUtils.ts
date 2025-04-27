/**
 * キャッシュサイズを出力する
 * @param cacheName - キャッシュ名
 */
export async function getCacheSizeMB(cacheName: string): Promise<void> {
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