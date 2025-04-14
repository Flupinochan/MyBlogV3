import { Flex, Grid, GridCol, Image, Stack } from "@mantine/core";
import titleImage from "../../assets/home_title.png";
import titleStyles from "./Title.module.css";
import indexStyles from "../../index.module.css";
import CustomAnchor from "../../components/CustomAnchor";
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Title = () => {

  const ref = useRef<HTMLDivElement>(null);
  useGSAP((_context, _contextSafe) => {
    gsap.effects.fadeIn(ref.current, { scope: ref.current });
    gsap.effects.textAnimation(".dummy", { scope: ref.current });
    ScrollTrigger.refresh();
  }, { scope: ref });

  return (
    <Grid ref={ref} gutter={0} grow className={`${titleStyles.titleGrid} fadeIn`}
      breakpoints={{ xs: '0px', sm: '0px', md: '768px', lg: '0px', xl: '0px' }}>
      <GridCol span={{ base: 12, md: 8 }} className={titleStyles.firstCol}>
        <Stack justify="space-around" style={{ height: "100%" }}>
          <Stack>
            <h1 className={`${titleStyles.titleText} h1TextAnimation`}><span className={indexStyles.purple}>MetalMental</span> is a <span className={indexStyles.purple}>Full-Stack</span> and <span className={indexStyles.purple}>SRE</span> engineer</h1>
            <p style={{ paddingTop: "1rem" }} className="pTextAnimation">フロントエンドからバックエンド、インフラまで手掛けるメタルなメンタルを持つエンジニアです</p>
          </Stack>
          <div className={`${titleStyles.button} contactMeAnimation`}>
            <CustomAnchor href="#contact" text="Contact Me" />
          </div>
          <Flex justify={"end"} align={"center"} className={`${titleStyles.miniText} contactMeAnimation`}>
            <div className={titleStyles.square} />
            <p>Currently working on <span className={indexStyles.purple}>generative AI</span></p>
          </Flex>
        </Stack>
      </GridCol>
      <GridCol span={{ base: 12, md: 4 }} className={titleStyles.secondCol}>
        <Image src={titleImage} alt="title image" />
      </GridCol>
    </Grid >
  )
}

export default Title