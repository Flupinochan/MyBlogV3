import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// header の表示/非表示アニメーション
gsap.registerEffect({
  name: "headerAnimation",
  extendTimeline: false,
  effect: (elements: gsap.TweenTarget) => {
    const targets: HTMLDivElement[] = gsap.utils.toArray(elements);

    targets.forEach((el) => {
      const showAnim = gsap.from(el, {
        yPercent: -100,
        paused: true,
        duration: 0.2
      }).progress(1);
      ScrollTrigger.create({
        start: "top top",
        end: "max",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          self.direction === -1 ? showAnim.play() : showAnim.reverse();
        }
      });
    });

    return gsap.to({}, {});
  }
});
