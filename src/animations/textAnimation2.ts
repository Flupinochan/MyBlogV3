import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface TextAnimationConfig { }

// text文字汎用アニメーション
gsap.registerEffect({
  name: 'textAnimation2',
  extendTimeline: false,
  effect: (elements: gsap.TweenTarget, _config: TextAnimationConfig = {}) => {
    const targets: HTMLParagraphElement[] = gsap.utils.toArray(elements);
    const tl = gsap.timeline({
      onComplete: () => {
        ScrollTrigger.refresh();
      }
    });
    targets.forEach((el) => {
      const originalText = el.innerHTML;
      tl.set(el, {
        text: ""
      }).to(el, {
        text: {
          value: el.innerHTML,
          delimiter: '',
          speed: 3, // 1文字を表示する間隔 数字が大きいほど速い
        },
        ease: 'none',
      })
      return () => {
        tl.kill();
        // callback処理で元に戻す
        if (el) {
          el.innerHTML = originalText;
        }
      };
    });

  }
});
