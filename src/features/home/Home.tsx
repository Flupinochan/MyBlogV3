import { Stack } from "@mantine/core";
import "./Home.css";
import Skills from "./Skills";
import Title from "./Title";
import Content from "./Content";

const Home = () => {
  return (
    <Stack>
      <Title />
      <div className="spacer" />
      <Stack gap={40}>
        <Skills />
        <Content />
      </Stack>
    </Stack>
  )
}

export default Home