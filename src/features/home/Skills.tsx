import { Stack } from "@mantine/core"
import H2 from "../../components/H2";
import SkillSection from "./components/SkillSection";
import TypeScriptSvg from "../../components/svg/TypeScriptSvg";
import PythonSvg from "../../components/svg/PythonSvg";
import AwsSvg from "../../components/svg/AwsSvg";
import styles from "./Skills.module.css";
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {

  const ref = useRef<HTMLDivElement>(null);

  useGSAP((_context, _contextSafe) => {
    const element = ref.current;

    // 初期位置を設定：スクロール前はy:200かつ非表示
    gsap.set(element, { y: 200, opacity: 0 });

    let mm = gsap.matchMedia();

    // PC用
    mm.add("(min-width: 769px)", () => {
      // 下方向にスクロールした場合にフェードイン＆位置移動（y:200 -> 0, opacity:0 -> 1）
      ScrollTrigger.create({
        trigger: element,
        start: "top 80%",
        end: "bottom 50%",
        scrub: false,
        markers: true,
        onEnter: () => {
          gsap.to(element, { y: 0, opacity: 1, duration: 1 });
        }
      });

      // 上方向にスクロール（戻る）場合にフェードアウト（opacity:1 -> 0）
      ScrollTrigger.create({
        trigger: element,
        start: "top 80%",
        end: "bottom 50%",
        scrub: false,
        markers: true,
        onLeaveBack: () => {
          gsap.to(element, {
            opacity: 0, duration: 1,
            onComplete: () => {
              // フェードアウト完了後は、初期位置に戻す
              gsap.set(element, { y: 200, opacity: 0 });
            }
          });
        }
      });
      return () => { };
    });

    // スマホ用
    mm.add("(max-width: 768px)", () => {
      // 下方向にスクロールした場合にフェードイン＆位置移動（y:200 -> 0, opacity:0 -> 1）
      ScrollTrigger.create({
        trigger: element,
        start: "top 95%",
        end: "bottom 50%",
        scrub: false,
        markers: true,
        onEnter: () => {
          gsap.to(element, { y: 0, opacity: 1, duration: 1 });
        }
      });

      // 上方向にスクロール（戻る）場合にフェードアウト（opacity:1 -> 0）
      ScrollTrigger.create({
        trigger: element,
        start: "top 95%",
        end: "bottom 50%",
        scrub: false,
        markers: true,
        onLeaveBack: () => {
          gsap.to(element, {
            opacity: 0, duration: 1,
            onComplete: () => {
              // フェードアウト完了後は、初期位置に戻す
              gsap.set(element, { y: 200, opacity: 0 });
            }
          });
        }
      });
      return () => { };
    });

  }, { scope: ref });

  return (
    <Stack className={styles.section} ref={ref}>
      <H2 text="Skills" />
      <SkillSection
        title="Frontend"
        badgesText={["React", "WinUI 3", "Thymeleaf"]}
        description="多様なデバイスにシームレスに適応するレスポンシブデザインとシステム障害に強いレジリエンス戦略を活用したアプリケーションを作成します"
        svg={<TypeScriptSvg />}
        textColor="#006FEE"
        badgeColor="#001731" />
      <SkillSection
        title="Backend"
        badgesText={["Spring Boot", "NestJS", "GraphQL"]}
        description="Dependency Injectionや抽象化を駆使することで、コードの柔軟性と再利用性を高め、保守性に優れた堅牢なシステムを作成します"
        svg={<PythonSvg />}
        textColor="#F5A524"
        badgeColor="#312107" />
      <SkillSection
        title="Infrastructure"
        badgesText={["AWS", "Docker", "VMWare"]}
        description="Container、Serverless、IaC、CI/CDを活用し、迅速でスケーラブルなデプロイメントと効率的な運用を実現します"
        svg={<AwsSvg />}
        textColor="#F31260"
        badgeColor="#310413" />
    </Stack>
  )
}

export default Skills