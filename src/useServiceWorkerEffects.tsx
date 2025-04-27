import { useEffect } from 'react'
import { initServiceWorker } from './service-worker/init';
import { addPwaInstallBanner } from './service-worker/installBanner';

const useServiceWorkerEffects = () => {
  useEffect(() => {
    // Service Workerを登録
    initServiceWorker();
    // Install BannerのEventListenerを登録
    addPwaInstallBanner();
  });
}

export default useServiceWorkerEffects