import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ScrollMoveYFadeInConfig {
  duration: number;
  durationBack: number;
  ease: string;
  start: string;
  mobileStart: string;
}

gsap.registerEffect({
  name: "scrollMoveYFadeIn",
  extendTimeline: false,
  defaults: {
    duration: 0.75,
    durationBack: 1,
    ease: "power4.out",
    start: "top 80%",
    mobileStart: "top 95%"
  } as ScrollMoveYFadeInConfig,
  effect: (elements: gsap.TweenTarget, config: ScrollMoveYFadeInConfig) => {
    const targets: HTMLDivElement[] = gsap.utils.toArray(elements);

    targets.forEach((el) => {
      let fadeOutTween: gsap.core.Tween | null = null;
      // 初期状態は、下に200px、見えない状態
      gsap.set(el, { y: 200, opacity: 0 });
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const trigger1 = ScrollTrigger.create({
          trigger: el,
          start: config.start,
          scrub: false,
          markers: false,
          invalidateOnRefresh: true,
          onEnter: () => {
            if (fadeOutTween && fadeOutTween.isActive()) {
              fadeOutTween.kill();
              fadeOutTween = null;
            }
            // 上に移動してフェードイン
            gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: config.duration,
              ease: config.ease,
            });
          }
        });

        const trigger2 = ScrollTrigger.create({
          trigger: el,
          start: config.start,
          scrub: false,
          markers: false,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            fadeOutTween = gsap.to(el, {
              opacity: 0,
              duration: config.durationBack,
              onComplete: () => {
                gsap.set(el, { y: 200, opacity: 0 });
              }
            });
          }
        });

        return () => {
          trigger1.kill();
          trigger2.kill();
        };
      });

      mm.add("(max-width: 768px)", () => {
        const trigger1 = ScrollTrigger.create({
          trigger: el,
          start: config.mobileStart,
          scrub: false,
          markers: false,
          invalidateOnRefresh: true,
          onEnter: () => {
            if (fadeOutTween && fadeOutTween.isActive()) {
              fadeOutTween.kill();
              fadeOutTween = null;
            }
            gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: config.duration,
              ease: config.ease,
              overwrite: "auto"
            });
          }
        });

        const trigger2 = ScrollTrigger.create({
          trigger: el,
          start: config.mobileStart,
          scrub: false,
          markers: false,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            fadeOutTween = gsap.to(el, {
              opacity: 0,
              duration: config.durationBack,
              onComplete: () => {
                gsap.set(el, { y: 200, opacity: 0 });
              }
            });
          }
        });

        return () => {
          trigger1.kill();
          trigger2.kill();
        };
      });
    });

    return gsap.to({}, {});
  }
});
