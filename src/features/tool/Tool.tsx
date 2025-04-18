import { NavLink } from "react-router-dom"
import { Anchor, List, ListItem, Stack } from "@mantine/core"
import H2 from "../../components/H2";
import skillStyles from "../home/Skills.module.css";
import toolStyles from "./Tool.module.css";
import H4 from "../../components/H4";
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Tool = () => {

  const ref = useRef<HTMLDivElement>(null);
  useGSAP((_context, _contextSafe) => {
    gsap.effects.fadeIn(ref.current, {});
    gsap.effects.scrollMoveXFadeIn(".scrollMoveXFadeIn", { scope: ref.current });
    ScrollTrigger.refresh();
  }, { scope: ref });

  return (
    <section className="fadeIn" ref={ref}>
      <div className={toolStyles.space} />
      <Stack className={skillStyles.section}>
        <H2 text="Tool" />
        <Stack gap={30}>
          <Stack className="scrollMoveXFadeIn">
            <H4 text="Google Extension" />
            <List className={toolStyles.listMarker} withPadding>
              <ListItem>
                <Anchor target="_blank" rel="noopener noreferrer" href="https://chromewebstore.google.com/detail/sidepanelsyncmemo/adbfnbnnohodpfgdhcanndcbmhknlpoc?authuser=0&hl=ja" >
                  SidePanelSyncMemo
                </Anchor>
              </ListItem>
              <ListItem>
                <Anchor target="_blank" rel="noopener noreferrer" href="https://chromewebstore.google.com/detail/autoclipboardcopy/paabklfmeagoimlcpkhkpmpnmbgcdkpf?authuser=0&hl=ja" >
                  AutoClipboardCopy
                </Anchor>
              </ListItem>
            </List>
          </Stack>
          <Stack className="scrollMoveXFadeIn">
            <H4 text="API" />
            <List className={toolStyles.listMarker} withPadding>
              <ListItem>
                <Anchor component={NavLink} to="swagger-ui">MyBlogV3</Anchor>
              </ListItem>
            </List>
          </Stack>
        </Stack>
      </Stack>
    </section>
  )
}

export default Tool