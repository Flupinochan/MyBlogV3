interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed', platform: string }>;
  platforms: string[];
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

export const addPwaInstallBanner = () => {
  window.addEventListener('beforeinstallprompt', (e: BeforeInstallPromptEvent) => {
    deferredPrompt = e;
  });
}

export async function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt = null;
  }
}