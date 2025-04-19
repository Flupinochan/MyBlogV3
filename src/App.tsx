import { useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "./layouts/header/Header";
import Footer from "./layouts/footer/Footer";
import Menu from "./layouts/menu/Menu";
import FooterBar from "./layouts/footerBar/footerBar";
import ScrollToTop from "./layouts/scroll-to-top/ScrollToTop";
import styles from "./App.module.css";
import "./animations/fadeIn";
import "./animations/scrollFadeIn";
import "./animations/scrollMoveYFadeIn";
import "./animations/scrollMoveXFadeIn";
import "./animations/textAnimation";
import "./animations/textAnimation2";
import "./animations/headerAnimation";
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useScrollTriggerEffects } from "./useScrollTriggerEffects";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Tanstack Queryキャッシュ設定
const queryClient = new QueryClient()

// GSAPプラグイン初期化
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);
ScrollTrigger.config({
  autoRefreshEvents: "resize,visibilitychange,DOMContentLoaded,load"
});

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // スクロールトリガーリフレッシュ
  useScrollTriggerEffects(appRef);

  // header の表示/非表示アニメーション
  useGSAP(() => {
    gsap.effects.headerAnimation(headerRef.current, { scope: headerRef.current });
    ScrollTrigger.refresh();
  }, { scope: headerRef });

  return (
    <QueryClientProvider client={queryClient}>
      <div ref={appRef}>
        <ScrollToTop />
        <div className={styles.stickyHeader} ref={headerRef}>
          <Header />
          <Menu />
        </div>
        {/* Outlet にルーティングされたページが表示 */}
        <Outlet />
        <Footer />
        <FooterBar />
      </div>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
