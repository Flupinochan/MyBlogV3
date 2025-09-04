import { useGSAP } from "@gsap/react";
import { Space, Stack } from "@mantine/core";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import H2 from "../../components/H2";
import skillStyles from "../home/skills/Skills.module.css";
import toolStyles from "../tool/Tool.module.css";
import Other from "./other/Other";
import Profile from "./profile/Profile";

const History = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useGSAP(
    (_context, _contextSafe) => {
      gsap.effects.fadeIn(sectionRef.current, { scope: sectionRef.current });
      gsap.effects.scrollMoveXFadeIn(".scrollMoveXFadeIn", {
        scope: sectionRef.current,
      });
      ScrollTrigger.refresh();
    },
    { scope: sectionRef },
  );

  return (
    <section className="fadeIn" ref={sectionRef}>
      <div className={toolStyles.space} />
      <Stack className={skillStyles.section}>
        <H2 text="History" />
        <Space h={10} />
        <Stack gap={70}>
          <Profile />
          <Other />
          {/* <Timeline /> */}
        </Stack>
      </Stack>
    </section>
  );
};

export default History;
