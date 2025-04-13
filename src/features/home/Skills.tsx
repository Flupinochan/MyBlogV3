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

const Skills = () => {

  const ref = useRef<HTMLDivElement>(null);
  useGSAP((_context, _contextSafe) => {
    gsap.effects.scrollFadeIn(ref.current, {});
    gsap.effects.scrollMoveYFadeIn(".scrollMoveYFadeIn", { scope: ref.current });
    ScrollTrigger.refresh();
  }, { scope: ref });

  return (
    <Stack className={`${styles.section} scrollFadeIn`} ref={ref}>
      <H2 text="Skills" />
      <SkillSection
        title="Frontend"
        badgesText={["React", "WinUI 3", "GSAP"]}
        description="多様なデバイスにシームレスに適応するレスポンシブデザインとシステム障害に強いレジリエンス戦略を活用したアプリケーションを作成します"
        svg={<TypeScriptSvg />}
        textColor="#006FEE"
        badgeColor="#001731" />
      <SkillSection
        title="Backend"
        badgesText={["NestJS", "GraphQL", "LangChain"]}
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