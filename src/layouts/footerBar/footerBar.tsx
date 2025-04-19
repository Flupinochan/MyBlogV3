import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./footerBar.module.css";

const FooterBar: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;

    gsap.set(el, {
      scaleX: 0,
      transformOrigin: "left center",
    });

    ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(el, {
          scaleX: progress,
          overwrite: true,
          ease: "none",
          duration: 0,
        });
      },
    });

  }, { scope: ref });


  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.bar}></div>
    </div>
  );
};

export default FooterBar;
