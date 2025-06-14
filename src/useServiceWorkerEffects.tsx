import { useEffect } from 'react'
import { addPwaInstallBanner } from './service-worker/installBanner';

const useServiceWorkerEffects = () => {
  useEffect(() => {
    // Install BannerのEventListenerを登録
    addPwaInstallBanner();
  });
}

export default useServiceWorkerEffects