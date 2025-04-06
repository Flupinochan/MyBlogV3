import { Box, Image } from "@mantine/core";
import headerImage from "../../assets/header.png";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { to } from './../../../node_modules/@aws-amplify/graphql-schema-generator/node_modules/typescript/lib/tsc';

const Header = () => {
  return (
    <header>
      <Box className="header">
        <NavLink to="/" className={({ isActive }) => (isActive ? "no-active" : "")}>
          <Image src={headerImage} alt="Header image" />
        </NavLink>
      </Box>
    </header>
  )
}

export default Header