import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./layouts/header/Header";
import Footer from "./layouts/footer/Footer";
import Menu from "./layouts/menu/Menu";
import FooterBar from "./layouts/footerBar/footerBar";
import ScrollToTop from "./layouts/scrollToTop/ScrollToTop";
import imagesLoaded from 'imagesloaded';
import styles from "./App.module.css";
import "./animations/fadeIn";
import "./animations/scrollFadeIn";
import "./animations/scrollMoveYFadeIn";
import "./animations/scrollMoveXFadeIn";
import "./animations/textAnimation";
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

ScrollTrigger.config({
  autoRefreshEvents: "resize,visibilitychange,DOMContentLoaded,load"
});

function App() {
  // App 全体を包むコンテナの ref
  const appRef = useRef<HTMLDivElement>(null);

  // 全画像読み込み完了後に ScrollTrigger.refresh() を実行
  useEffect(() => {
    if (appRef.current) {
      const imgLoad = imagesLoaded(appRef.current);
      const doneCallback = () => {
        ScrollTrigger.refresh();
      };
      imgLoad.on('done', doneCallback);
      return () => {
        imgLoad.off('done', doneCallback);
      };
    }
  }, []);


  // window load と fonts.ready によるリフレッシュ
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  const location = useLocation();
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  // header の表示/非表示アニメーション
  const headerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const showAnim = gsap.from(headerRef.current, {
      yPercent: -100,
      paused: true,
      duration: 0.2
    }).progress(1);
    ScrollTrigger.create({
      start: "top top",
      end: "max",
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
      }
    });
  }, { scope: headerRef });

  return (
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
  );
}

export default App;
