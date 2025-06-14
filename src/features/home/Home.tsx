import { Stack } from "@mantine/core";
import styles from "./Home.module.css";
import Skills from "./skills/Skills";
import Title from "./title/Title";
import Content from "./content/Content";
import Contact from "./contact/Contact";
import AboutMe from "./aboutme/AboutMe";

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