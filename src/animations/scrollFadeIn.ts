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
      gsap.set(el, { y: 200, opacity: 0 });
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const trigger1 = ScrollTrigger.create({
          trigger: el,
          start: config.top,
          end: "bottom 50%",
          scrub: false,
          markers: true,
          invalidateOnRefresh: true,
          scroller: document.body,
          onEnter: () => {
            if (fadeOutTween && fadeOutTween.isActive()) {
              fadeOutTween.kill();
              fadeOutTween = null;
            }
            gsap.to(el, { y: 0, opacity: 1, duration: config.duration });
          }
        });

        const trigger2 = ScrollTrigger.create({
          trigger: el,
          start: config.top,
          end: "bottom 50%",
          scrub: false,
          markers: true,
          invalidateOnRefresh: true,
          scroller: document.body,
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
          start: config.top,
          end: "bottom 50%",
          scrub: false,
          markers: true,
          invalidateOnRefresh: true,
          scroller: document.body,
          onEnter: () => {
            if (fadeOutTween && fadeOutTween.isActive()) {
              fadeOutTween.kill();
              fadeOutTween = null;
            }
            gsap.to(el, { y: 0, opacity: 1, duration: config.duration });
          }
        });

        const trigger2 = ScrollTrigger.create({
          trigger: el,
          start: config.top,
          end: "bottom 50%",
          scrub: false,
          markers: true,
          invalidateOnRefresh: true,
          scroller: document.body,
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
