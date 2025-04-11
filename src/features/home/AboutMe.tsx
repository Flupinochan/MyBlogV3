import skillsStyles from "./Skills.module.css";
import aboutMeStyles from "./AboutMe.module.css";
import AboutMeSection from "./components/AboutMeSection";
import H2 from "../../components/H2";

const AboutMe = () => {
  return (
    <section className={`${skillsStyles.section} ${aboutMeStyles.backgroundImage}`}>
      <H2 text="About Me" />
      <AboutMeSection
        title="Carrer"
        text1="学生のころは、Blenderで3Dモデリングをしたり、MMDでアニメーション作成をしていました"
        text2="卒業した後は、すき屋でワンオペをしていましたが、自作PCをきっかけにITに興味を持ち、エンジニアになりました" />
      <AboutMeSection
        title="Specialty"
        text1="IaCとCI/CDによるサーバレスやコンテナ環境の構築"
        text2="AWS、GitHub、Supabaseが好き" />
      <AboutMeSection
        title="Hobby"
        text1="WinUI 3 (WPF) におけるMVVMアプリケーション開発"
        text2="Google拡張機能の作成" />
    </section>
  )
}

export default AboutMe