import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export interface TextAnimationConfig { }

// Title.tsx専用のアニメーション
gsap.registerEffect({
  name: 'textAnimation',
  extendTimeline: false,
  effect: (_elements: gsap.TweenTarget, _config: TextAnimationConfig = {}) => {

    const renderText = "MetalMental is a Full-Stack and SRE Engineer";
    const renderText2 = `
      <span style="color: var(--bg-color);">MetalMental</span>
      is a
      <span style="color: var(--bg-color);">Full-Stack</span>
      and
      <span style="color: var(--bg-color);">SRE</span>
      Engineer
    `;
    const renderText3 = "フロントエンドからバックエンド、インフラまで手掛けるメタルなメンタルを持つエンジニアです";

    const tl = gsap.timeline();
    tl.set(".contactMeAnimation", {
      opacity: 0,
    }).set(".rightTextAnimation", {
      opacity: 0,
    }).to(".h1TextAnimation", {
      text: {
        value: renderText,
        delimiter: '',
        // speed: 0.5, // 1文字を表示する間隔 ※durationは自動で計算
      },
      ease: 'power2.out',
      duration: 1.5, // 文字全体が表示されるまでの時間 ※speedは自動で計算
    }).to(".pTextAnimation", {
      text: {
        value: renderText3,
        delimiter: '',
      },
      ease: 'power2.out',
      delay: 0.3,
      duration: 1,
    }).to(".h1TextAnimation", {
      text: {
        value: renderText2,
        delimiter: '',
      },
      duration: 0,
      delay: 1,
    }).to(".contactMeAnimation", {
      opacity: 1,
      duration: 0.5,
    });

  }
});
