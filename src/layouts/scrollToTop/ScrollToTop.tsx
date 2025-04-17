import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ScrollToTop = () => {
  const location = useLocation();

  // ページ遷移時にスクロールバーをTopに戻す
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  // スクロールした際に、Topへ戻るためのButtonを表示
  const btnRef = useRef<HTMLButtonElement>(null);
  let scrollTimeout: NodeJS.Timeout | null = null;
  useGSAP(() => {
    // 初期状態
    gsap.set(btnRef.current, { autoAlpha: 0 });

    ScrollTrigger.create({
      start: 'top top',
      // スクロール位置が変わるたびに表示
      onUpdate: (self) => {
        self.scroll
        gsap.to(btnRef.current, { autoAlpha: 1, duration: 0.5 });

        // 既存のタイマーがあればクリア
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        // タイマーをセットし、3秒後に非表示
        scrollTimeout = setTimeout(() => {
          gsap.to(btnRef.current, { autoAlpha: 0, duration: 0.5 });
        }, 2000);

        return () => { }
      },
    });

  }, { scope: btnRef });

  // Buttonが押されたときにページのTopへスクロール
  const scrollToTop = () => {
    gsap.to(window, { scrollTo: 0, duration: 0.5, ease: "power1.in" });
  };

  // Topに戻るためのButton
  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        zIndex: 1000,
        cursor: 'pointer',
      }}
    >
      Top
    </button>
  );
};

export default ScrollToTop;