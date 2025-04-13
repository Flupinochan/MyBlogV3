import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ScrollFadeIn2Config {
  duration: number;
  top: string;
}

gsap.registerEffect({
  name: "scrollFadeIn2",
  extendTimeline: false,
  defaults: {
    duration: 1,
    top: "top 90%"
  },
  effect: (elements: gsap.TweenTarget, config: ScrollFadeIn2Config) => {
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
          start: config.top,
          end: "bottom 50%",
          scrub: false,
          markers: false,
          invalidateOnRefresh: true,
          onEnter: () => {
            gsap.to(el, { opacity: 1, duration: config.duration });
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
          start: config.top,
          end: "bottom 50%",
          scrub: false,
          markers: false,
          invalidateOnRefresh: true,
          // 下方向スクロールアニメーション
          onEnter: () => {
            gsap.to(el, { opacity: 1, duration: config.duration });
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
