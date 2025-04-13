import { Flex, Grid, GridCol, Image, Stack } from "@mantine/core";
import titleImage from "../../assets/home_title.png";
import titleStyles from "./Title.module.css";
import indexStyles from "../../index.module.css";
import CustomAnchor from "../../components/CustomAnchor";
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Title = () => {

  const ref = useRef<HTMLDivElement>(null);
  useGSAP((_context, _contextSafe) => {
    // 親要素に適用
    gsap.effects.scrollFadeIn2(ref.current, {});
    gsap.effects.scrollFadeIn(".scrollFadeIn", { scope: ref.current });
  }, { scope: ref });

  return (
    <Grid ref={ref} gutter={0} grow className={`${titleStyles.titleGrid} scrollFadeIn2`}
      breakpoints={{ xs: '0px', sm: '0px', md: '768px', lg: '0px', xl: '0px' }}>
      <GridCol span={{ base: 12, md: 8 }} className={titleStyles.firstCol}>
        <Stack justify="space-around" style={{ height: "100%" }}>
          <Stack>
            <h1 className={titleStyles.titleText}><span className={indexStyles.purple}>MetalMental</span> is a <span className={indexStyles.purple}>Full-Stack</span> and <span className={indexStyles.purple}>SRE</span> engineer</h1>
            <p style={{ paddingTop: "1rem" }}>フロントエンドからバックエンド、インフラまで手掛けるメタルなメンタルを持つエンジニアです</p>
          </Stack>
          <div className={titleStyles.button}>
            <CustomAnchor href="#contact" text="Contact Me" />
          </div>
          <Flex justify={"end"} align={"center"} className={titleStyles.miniText}>
            <div className={titleStyles.square} />
            <p>Currently working on <span className={indexStyles.purple}>generative AI</span></p>
          </Flex>
        </Stack>
      </GridCol>
      <GridCol span={{ base: 12, md: 4 }} className={titleStyles.secondCol}>
        <Image src={titleImage} alt="title image" />
      </GridCol>
    </Grid>
  )
}

export default Title