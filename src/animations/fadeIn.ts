import { gsap } from 'gsap';

export interface FadeInConfig {
  duration: number;
  ease: string;
}

gsap.registerEffect({
  name: "fadeIn",
  extendTimeline: false,
  defaults: {
    duration: 0.75,
    ease: "power1.inOut"
  } as FadeInConfig,
  effect: (elements: gsap.TweenTarget, config: FadeInConfig) => {
    const targets: HTMLDivElement[] = gsap.utils.toArray(elements);

    targets.forEach((el) => {
      gsap.set(el, { opacity: 0 });
      gsap.to(el, { opacity: 1, duration: config.duration, ease: config.ease });
    });

    return gsap.to({}, {});
  }
});
