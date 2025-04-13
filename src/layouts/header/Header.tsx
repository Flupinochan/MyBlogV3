import { Box, Image } from "@mantine/core";
import headerImage from "../../assets/header.png";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <Box className={styles.header}>
        <NavLink to="/" className={({ isActive }) => (isActive ? "no-active" : "")}>
          <Image src={headerImage} alt="Header image" />
        </NavLink>
      </Box>
    </header>
  )
}

export default Header