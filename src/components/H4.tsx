import { Flex } from "@mantine/core";
import styles from "./H4.module.css";

interface h4Props {
  text: string
}

const H4: React.FC<h4Props> = (props) => {
  return (
    <Flex>
      <div className={styles.h4Right} />
      <h4>{props.text}</h4>
      <div className={styles.h4Left} />
    </Flex>
  )
}

export default H4