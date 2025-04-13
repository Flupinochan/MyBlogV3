import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ScrollFadeInConfig {
  duration: number;
  durationBack: number;
  top: string;
}

let fadeOutTween: gsap.core.Tween | null = null;

gsap.registerEffect({
  name: "scrollFadeIn",
  extendTimeline: false,
  defaults: {
    duration: 0.5,
    durationBack: 1,
    top: "top 80%"
  },
  effect: (elements: gsap.TweenTarget, config: ScrollFadeInConfig) => {
    const targets: HTMLDivElement[] = gsap.utils.toArray(elements);

    targets.forEach((el) => {
      // 初期状態の設定：スクロール前は y:200、opacity:0
      gsap.set(el, { y: 200, opacity: 0 });
      const mm = gsap.matchMedia();

      // PC用（画面幅769px以上）
      mm.add("(min-width: 769px)", () => {
        // 下スクロール時：フェードイン
        ScrollTrigger.create({
          trigger: el,
          start: config.top,
          end: "bottom 50%",
          scrub: false,
          markers: true,
          invalidateOnRefresh: true,
          onEnter: () => {
            // フェードアウトをキャンセル (高速に上スクロール=>下スクロールした際)
            if (fadeOutTween && fadeOutTween.isActive()) {
              fadeOutTween.kill();
              fadeOutTween = null;
            }
            gsap.to(el, { y: 0, opacity: 1, duration: config.duration });
          }
        });
        // 上スクロール時：フェードアウト
        ScrollTrigger.create({
          trigger: el,
          start: config.top,
          end: "bottom 50%",
          scrub: false,
          markers: true,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            fadeOutTween = gsap.to(el, {
              opacity: 0,
              duration: config.durationBack,
              // フェードアウト完了後は初期位置に移動
              onComplete: () => {
                gsap.set(el, { y: 200, opacity: 0 });
              }
            });
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
          markers: true,
          invalidateOnRefresh: true, // 動的レンダリングに合わせてstartやendが再計算される
          onEnter: () => {
            if (fadeOutTween && fadeOutTween.isActive()) {
              fadeOutTween.kill();
              fadeOutTween = null;
            }
            gsap.to(el, { y: 0, opacity: 1, duration: config.duration });
          }
        });
        // 上スクロール時：フェードアウト
        ScrollTrigger.create({
          trigger: el,
          start: config.top,
          end: "bottom 50%",
          scrub: false,
          markers: true,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            fadeOutTween = gsap.to(el, {
              opacity: 0,
              duration: config.durationBack,
              // フェードアウト完了後は初期位置に移動
              onComplete: () => {
                gsap.set(el, { y: 200, opacity: 0 });
              }
            });
          }
        });
        return () => { };
      });

    });

    return gsap.to({}, {});
  }
});
