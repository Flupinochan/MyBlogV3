import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ScrollFadeInConfig {
  duration: number;
  ease: string;
  start: string;
}

gsap.registerEffect({
  name: "scrollFadeIn",
  extendTimeline: false,
  defaults: {
    duration: 0.75,
    start: "top 90%", // "要素のトリガー位置, スクロールバーの位置"
    ease: "power1.inOut"
  } as ScrollFadeInConfig,
  effect: (elements: gsap.TweenTarget, config: ScrollFadeInConfig) => {
    const targets: HTMLDivElement[] = gsap.utils.toArray(elements);

    targets.forEach((el) => {
      // 初期状態の設定
      gsap.set(el, { opacity: 0 });
      const mm = gsap.matchMedia();

      // PC用（画面幅769px以上）
      mm.add("(min-width: 769px)", () => {
        // 下スクロール時：フェードイン
        ScrollTrigger.create({
          trigger: el,
          start: config.start,
          scrub: false,
          // markers: {
          //   startColor: "blue"
          // },
          invalidateOnRefresh: true,
          onEnter: () => {
            gsap.to(el, { opacity: 1, duration: config.duration, ease: config.ease });
          },
          onLeaveBack: () => {
            gsap.to(el, { opacity: 0, duration: config.duration });
          }
        });
        return () => { };
      });

      // スマホ用（画面幅768px以下）
      mm.add("(max-width: 768px)", () => {
        // 下スクロール時：フェードイン
        ScrollTrigger.create({
          trigger: el,
          start: config.start,
          scrub: false,
          // markers: {
          //   startColor: "blue"
          // },
          invalidateOnRefresh: true,
          // 下方向スクロールアニメーション
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              duration: config.duration,
              ease: config.ease,
              overwrite: "auto"
            });
          },
          // 上方向スクロールアニメーション
          onLeaveBack: () => {
            gsap.to(el, { opacity: 0, duration: config.duration });
          }
        });
        return () => { };
      });

    });

    return gsap.to({}, {});
  }
});
