import { Flex, Image } from "@mantine/core"
import loadingImage from "../../assets/loading.png";
import "./Loading.css";

const Loading = () => {
  return (
    <Flex justify={"center"} align={"center"} className="loading">
      <Image src={loadingImage} alt="loading image" h={100} />
      <p className="loading-text">Loading...</p>
    </Flex>
  )
}

export default Loading