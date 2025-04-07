import { Flex, Image, Loader } from "@mantine/core"
import loadingImage from "../../assets/loading.png";
import "./Loading.css";

const Loading = () => {
  return (
    <Flex justify={"center"} align={"center"} className="loading">
      <Image src={loadingImage} alt="loading image" h={100} />
      <p className="loading-text">Loading</p>
      <Loader type="dots" color="#D2CD39" pt={7} />
    </Flex>
  )
}

export default Loading