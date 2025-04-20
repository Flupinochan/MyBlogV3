import { Box, Stack } from "@mantine/core";
import H4 from "../../../components/H4";
import styles from "./Timeline.module.css";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Timeline = () => {
  const coverRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = coverRef.current;
    if (!el) return;

    gsap.set(el, {
      height: "100%",
    });

    ScrollTrigger.create({
      markers: true,
      trigger: coverRef.current,
      start: "top 70%",
      end: "90% 85%",
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalHeight = 2000; // parentBoxの高さ + 微調整する
        const currentHeight = totalHeight * (1 - progress);
        gsap.to(el, {
          height: currentHeight,
          overwrite: true,
          ease: "none",
          duration: 0.1,
        });
      },
    });
  }, { scope: coverRef });

  return (
    <Stack className="scrollMoveXFadeIn">
      <H4 text="Timeline" />
      <Box className={styles.parentBox}>
        <div className={styles.colorBar}>
          <div className={styles.red} />
          <div className={styles.blue} />
          <div className={styles.green} />
        </div>
        <div ref={coverRef} className={styles.coverBar} />
      </Box>
    </Stack>
  );
};

export default Timeline;
