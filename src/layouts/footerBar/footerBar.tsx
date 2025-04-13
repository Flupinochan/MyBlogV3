import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./footerBar.module.css";

const FooterBar: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { scaleX: 0 }, // 初期状態: 要素のサイズ横幅0%
      {
        scaleX: 1, // 最終状態: 要素のサイズ横幅100%
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
        transformOrigin: "left center", // 左から
      }
    );
  }, { scope: ref });

  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.bar}></div>
    </div>
  );
};

export default FooterBar;