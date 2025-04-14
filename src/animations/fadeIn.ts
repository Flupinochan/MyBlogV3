import { gsap } from 'gsap';

export interface FadeInConfig {
  duration: number;
  top: string;
  ease: string;
}

gsap.registerEffect({
  name: "fadeIn",
  extendTimeline: false,
  defaults: {
    duration: 1,
    top: "top 90%",
    ease: "sine.out"
  },
  effect: (elements: gsap.TweenTarget, config: FadeInConfig) => {
    const targets: HTMLDivElement[] = gsap.utils.toArray(elements);

    targets.forEach((el) => {
      gsap.set(el, { opacity: 0 });
      gsap.to(el, { opacity: 1, duration: config.duration, ease: config.ease });
    });

    return gsap.to({}, {});
  }
});
