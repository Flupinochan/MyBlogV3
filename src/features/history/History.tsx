import { useGSAP } from "@gsap/react";
import { Anchor, List, ListItem, Space, Stack } from "@mantine/core";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import H2 from "../../components/H2";
import H4 from "../../components/H4";
import skillStyles from "../home/skills/Skills.module.css";
import toolStyles from "../tool/Tool.module.css";
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
          {/* <Timeline /> */}
        </Stack>
        <Space h={10} />
        <H4 text="Other" />
        <List className={toolStyles.listMarker} withPadding>
          <ListItem>
            <Anchor
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.credly.com/users/tetsuro-kawagoe/badges#credly"
            >
              Credly
            </Anchor>
          </ListItem>
        </List>
      </Stack>
    </section>
  );
};

export default History;
