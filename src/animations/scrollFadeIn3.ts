import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollFadeIn3Config {
  duration: number;
  top: string;
  stagger: number;
}

gsap.registerEffect({
  name: "scrollFadeIn3",
  extendTimeline: false,
  defaults: {
    duration: 0.5,
    top: "top 95%",
    stagger: 0.2
  },
  effect: (elements: gsap.TweenTarget, config: ScrollFadeIn3Config) => {
    const targets: HTMLDivElement[] = gsap.utils.toArray(elements);

    // 初期状態の設定
    gsap.set(targets, { x: 200, opacity: 0 });
    const mm = gsap.matchMedia();

    // PC用（画面幅769px以上）
    mm.add("(min-width: 769px)", () => {
      // 下スクロール時：フェードイン
      ScrollTrigger.create({
        trigger: targets[0],
        start: config.top,
        end: "bottom 50%",
        scrub: false,
        markers: false,
        onEnter: () => {
          gsap.to(targets, {
            x: 0,
            opacity: 1,
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
        start: config.top,
        end: "bottom 50%",
        scrub: false,
        markers: false,
        onEnter: () => {
          gsap.to(targets, {
            x: 0,
            opacity: 1,
            duration: config.duration,
            stagger: config.stagger,
          });
        },
      });
      return () => { };
    });


    return gsap.to({}, {});
  }
});
