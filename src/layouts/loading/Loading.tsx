import { Flex, Image, Loader } from "@mantine/core"
import loadingImage from "../../assets/loading.png";
import styles from "./Loading.module.css"

const Loading = () => {
  return (
    <Flex justify={"center"} align={"center"} className={styles.loading}>
      <Image src={loadingImage} alt="loading image" h={100} />
      <p className={styles.loadingText}>Loading</p>
      <Loader type="dots" color="#D2CD39" pt={7} />
    </Flex>
  )
}

export default Loading