import { Stack } from "@mantine/core";
import "./Home.css";
import Skills from "./Skills";
import Title from "./Title";

const Home = () => {
  return (
    <Stack>
      <Title />
      <Skills />
    </Stack>
  )
}

export default Home