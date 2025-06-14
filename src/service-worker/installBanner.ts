interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<{ outcome: 'accepted' | 'dismissed', platform: string }>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed', platform: string }>;
  platforms: string[];
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

let installPrompt: BeforeInstallPromptEvent | null = null;

// 5分以上滞在し、複数回訪れないと発火しない?
export const addPwaInstallBanner = () => {
  window.addEventListener('beforeinstallprompt', (event: BeforeInstallPromptEvent) => {
    installPrompt = event;
  });
}

export async function installApp() {
  if (!installPrompt) {
    return;
  }
  await installPrompt.prompt();
  installPrompt = null;
}