import { Flex, Grid, GridCol, Image, Stack } from "@mantine/core";
import titleImage from "../../assets/home_title.png";
import Button from "../../components/Button";
import titleStyles from "./Title.module.css";
import indexStyles from "../../index.module.css";

const Title = () => {
  return (
    <Grid gutter={0} grow className={titleStyles.titleGrid}
      breakpoints={{ xs: '0px', sm: '0px', md: '768px', lg: '0px', xl: '0px' }}>
      <GridCol span={{ base: 12, md: 8 }} className={titleStyles.firstCol}>
        <Stack justify="space-around" style={{ height: "100%" }}>
          <Stack>
            <h1 className={titleStyles.titleText}><span className={indexStyles.purple}>MetalMental</span> is a <span className={indexStyles.purple}>Full-Stack</span> and <span className={indexStyles.purple}>SRE</span> engineer</h1>
            <p style={{ paddingTop: "1rem" }}>フロントエンドからバックエンド、インフラまで手掛けるメタルなメンタルを持つエンジニアです</p>
          </Stack>
          <div className={titleStyles.button}>
            <Button text="Contact me" />
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