import { Stack } from "@mantine/core";
import Skills from "./Skills";
import Title from "./Title";
import Content from "./Content";
import Contact from "./Contact";
import styles from "./Home.module.css";
import AboutMe from "./AboutMe";

const Home = () => {
  return (
    <Stack>
      <Title />
      <div className={styles.spacer} />
      <Stack gap={40}>
        <Skills />
        <AboutMe />
        <Content />
        <Contact />
      </Stack>
    </Stack>
  )
}

export default Home