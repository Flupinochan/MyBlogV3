import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./layouts/header/Header";
import Footer from "./layouts/footer/Footer";
import Menu from "./layouts/menu/Menu";
import FooterBar from "./layouts/footerBar/footerBar";
import styles from "./App.module.css";
// gsapインポート
import "./animations/scrollMoveYFadeIn";
import "./animations/scrollFadeIn";
import "./animations/scrollMoveXFadeIn";
import "./animations/textAnimation";
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

ScrollTrigger.config({
  autoRefreshEvents: "resize,visibilitychange,DOMContentLoaded,load"
});

function App() {
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

  // headerのアニメーション
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const showAnim = gsap.from(ref.current, {
      yPercent: -100, // 上に100%隠す
      paused: true,   // 最初はアニメーションを自動再生しない
      duration: 0.2
    }).progress(1);   // アニメーションを完了状態（上に隠れた状態）にしておく

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
      }
    });
  }, { scope: ref });

  return (
    <>
      <div className={styles.stickyHeader} ref={ref}>
        <Header />
        <Menu />
      </div>
      {/* Outletにルーティングされたページが表示 */}
      <Outlet />
      <Footer />
      <FooterBar />
    </>
  );
}

export default App;
