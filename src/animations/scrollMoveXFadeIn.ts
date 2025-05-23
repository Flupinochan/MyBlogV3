import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ScrollMoveXFadeInConfig {
  duration: number;
  start: string;
  ease: string;
  stagger: number;
}

gsap.registerEffect({
  name: "scrollMoveXFadeIn",
  extendTimeline: false,
  defaults: {
    duration: 0.5,
    start: "top 90%",
    ease: "power4.out",
    stagger: 0.2
  } as ScrollMoveXFadeInConfig,
  effect: (elements: gsap.TweenTarget, config: ScrollMoveXFadeInConfig) => {
    const targets: HTMLDivElement[] = gsap.utils.toArray(elements);

    // 初期状態の設定
    gsap.set(targets, { x: 200, opacity: 0 });
    const mm = gsap.matchMedia();

    // PC用（画面幅769px以上）
    mm.add("(min-width: 769px)", () => {
      // 下スクロール時：フェードイン
      ScrollTrigger.create({
        trigger: targets[0],
        start: config.start,
        scrub: false,
        markers: false,
        invalidateOnRefresh: true,
        onEnter: () => {
          gsap.to(targets, {
            x: 0,
            opacity: 1,
            ease: config.ease,
            duration: config.duration,
            stagger: config.stagger, // 順番にアニメーション実行
          });
        },
      });
      return () => { };
    });

    // スマホ用（画面幅768px以下）
    mm.add("(max-width: 768px)", () => {
      // 下スクロール時：フェードイン
      ScrollTrigger.create({
        trigger: targets[0],
        start: config.start,
        scrub: false,
        markers: false,
        invalidateOnRefresh: true,
        onEnter: () => {
          gsap.to(targets, {
            x: 0,
            opacity: 1,
            ease: config.ease,
            duration: config.duration,
            stagger: config.stagger,
            overwrite: "auto"
          });
        },
      });
      return () => { };
    });


    return gsap.to({}, {});
  }
});
