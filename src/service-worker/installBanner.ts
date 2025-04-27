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

export const addPwaInstallBanner = () => {
  window.addEventListener('beforeinstallprompt', (event: BeforeInstallPromptEvent) => {
    installPrompt = event;
  });
}

export async function installApp() {
  if (!installPrompt) {
    return;
  }
  const result = await installPrompt.prompt();
  console.log(`Install prompt was: ${result.outcome}`);
  installPrompt = null;
}