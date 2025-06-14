import { Flex } from "@mantine/core";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerFrame}>
      <Flex className={styles.footerBorder}>
        <p>© 2019-2025 MetalMental. All rights reserved.</p>
      </Flex>
    </footer>
  )
}

export default Footer