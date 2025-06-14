import { gsap } from 'gsap';

export interface TextAnimationConfig { }

// Title.tsx専用のアニメーション
gsap.registerEffect({
  name: 'textAnimation',
  extendTimeline: true,
  effect: (_elements: gsap.TweenTarget, _config: TextAnimationConfig = {}) => {
    const mm = gsap.matchMedia();

    // PCだけアニメーション
    mm.add("(min-width: 769px)", () => {
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

      const tl = gsap.timeline({
        // onComplete: () => {
        //   // 要素のサイズが変わった後には、スクロールトリガーを再計算する
        //   ScrollTrigger.refresh();
        // }
      });
      tl.set(".contactMeAnimation", {
        opacity: 0,
      }).set(".h1TextAnimation", {
        text: "",
      }).set(".pTextAnimation", {
        text: "",
      }).to(".h1TextAnimation", {
        text: {
          value: renderText,
          delimiter: '',
          // speed: 0.5, // 1文字を表示する間隔 ※durationは自動で計算
        },
        delay: 0.75,
        duration: 1.5, // 文字全体が表示されるまでの時間 ※speedは自動で計算
      }).to(".pTextAnimation", {
        text: {
          value: renderText3,
          delimiter: '',
        },
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

      return () => { };
    });

  }
});
