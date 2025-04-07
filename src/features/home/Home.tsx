import { Flex, Grid, GridCol, Image, Stack, Title } from "@mantine/core";
import titleImage from "../../assets/home_title.png";
import "./Home.css";
import Button from "../../components/Button";

const Home = () => {
  return (
    <main className="home-main">
      <Grid gutter={0} grow className="home-grid"
        breakpoints={{ xs: '0px', sm: '0px', md: '768px', lg: '0px', xl: '0px' }}>
        <GridCol span={{ base: 12, md: 8 }} className="first-col">
          <Stack justify="space-around" style={{ height: "100%" }}>
            <Stack>
              <h1 className="title-text"><span className="purple">MetalMental</span> is a <span className="purple">Full-Stack</span> and <span className="purple">SRE</span> engineer</h1>
              <p style={{ paddingTop: "1rem" }}>フロントエンドからバックエンド、インフラまで手掛けるメタルなメンタルを持つエンジニアです</p>
            </Stack>
            <div className="button">
              <Button text="Contact me" />
            </div>
            <Flex justify={"end"} align={"center"} className="mini-text">
              <div className="square" />
              <p>Currently working on <span className="purple">generative AI</span></p>
            </Flex>
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, md: 4 }} className="second-col">
          <Image src={titleImage} alt="title image" />
        </GridCol>
      </Grid>
    </main>
  )
}

export default Home