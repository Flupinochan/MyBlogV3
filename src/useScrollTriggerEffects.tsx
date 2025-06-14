import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import imagesLoaded from "imagesloaded";

export function useScrollTriggerEffects(containerRef: React.RefObject<HTMLDivElement>) {
  const location = useLocation();

  // 全画像読み込み完了後に ScrollTrigger.refresh()
  useEffect(() => {
    if (containerRef.current) {
      const imgLoad = imagesLoaded(containerRef.current);
      const doneCallback = () => {
        ScrollTrigger.refresh();
      };
      imgLoad.on("done", doneCallback);
      return () => {
        imgLoad.off("done", doneCallback);
      };
    }
  }, [containerRef]);

  // window load および fonts.ready による ScrollTrigger.refresh()
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
    };
  }, []);

  // ページ遷移時に ScrollTrigger.refresh()
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timeout);
  }, [location.pathname]);
}
