import { Box, Image } from "@mantine/core";
import headerImage from "../../assets/header.png";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <Box className="header">
        <Image src={headerImage} alt="Header image" />
      </Box>
    </header>
  )
}

export default Header