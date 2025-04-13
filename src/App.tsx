import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "./layouts/header/Header";
import Footer from "./layouts/footer/Footer";
import Menu from "./layouts/menu/Menu";
import FooterBar from "./layouts/footerBar/footerBar";
import styles from "./App.module.css";
// gsapインポート
import "./animations/scrollFadeIn";
import "./animations/scrollFadeIn2";
import "./animations/scrollFadeIn3";
import "./animations/textAnimation";
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

function App() {
  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh(); // ScrollTriggerを再計算
    };
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

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

  });

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
