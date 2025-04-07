import { Stack } from "@mantine/core"
import "./Skills.css";
import H2 from "../../components/H2";
import SkillSection from "../../components/SkillSection";
import TypeScriptSvg from "../../components/svg/TypeScriptSvg";
import PythonSvg from "../../components/svg/PythonSvg";
import AwsSvg from "../../components/svg/AwsSvg";

const Skills = () => {
  return (
    <Stack className="section">
      <H2 text="Skills" />
      <SkillSection
        title="Frontend"
        badgesText={["React", "WinUI 3", "Thymeleaf"]}
        description="Reactを使用してモダンなWebアプリケーションを作成します"
        svg={<TypeScriptSvg />}
        textColor="#006FEE"
        badgeColor="#001731" />
      <SkillSection
        title="Backend"
        badgesText={["Spring Boot", "NestJS", "GraphQL"]}
        description="テキスト生成や画像生成、RAGなどのトレンド技術を使用します"
        svg={<PythonSvg />}
        textColor="#F5A524"
        badgeColor="#312107" />
      <SkillSection
        title="Infrastructure"
        badgesText={["AWS", "Docker", "VMWare"]}
        description="コンテナやサーバレス、IaCおよびCI/CDを用いた環境構築をします"
        svg={<AwsSvg />}
        textColor="#F31260"
        badgeColor="#310413" />
    </Stack>
  )
}

export default Skills