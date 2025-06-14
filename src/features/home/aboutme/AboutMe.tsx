import skillsStyles from "../skills/Skills.module.css";
import aboutMeStyles from "./AboutMe.module.css";
import AboutMeSection from "./AboutMeSection";
import H2 from "../../../components/H2";
import { Space } from "@mantine/core";
import { useRef } from "react";
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AboutMe = () => {

  const ref = useRef<HTMLDivElement>(null);
  useGSAP((_context, _contextSafe) => {
    gsap.effects.scrollFadeIn(ref.current, { scope: ref.current });
    gsap.effects.scrollMoveYFadeIn(".scrollMoveYFadeIn", { scope: ref.current });
    ScrollTrigger.refresh();
  }, { scope: ref });

  return (
    <section className={`${skillsStyles.section} ${aboutMeStyles.backgroundImage} scrollFadeIn`} ref={ref}>
      <H2 text="About Me" />
      <AboutMeSection
        title="Carrer"
        text1="学生のころは、Blenderで3Dモデリングをしたり、MMDでアニメーション作成をしていました"
        text2="卒業した後は、すき屋でワンオペをしていましたが、自作PCをきっかけにITに興味を持ち、エンジニアになりました" />
      <Space h={10} />
      <AboutMeSection
        title="Specialty"
        text1="IaCとCI/CDによるサーバレスやコンテナ環境の構築"
        text2="最近はAmplifyとFirebaseがメイン" />
      <Space h={10} />
      <AboutMeSection
        title="Hobby"
        text1="オフラインに強いアプリケーションの作成"
        text2="Clean Architectureの勉強" />
    </section>
  )
}

export default AboutMe