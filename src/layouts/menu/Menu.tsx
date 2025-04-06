import { Grid, GridCol, rem } from "@mantine/core"
import "./Menu.css";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <Grid pt={rem(14)} gutter={rem(4)} grow>
      <GridCol span={3}>
        <a href="https://zenn.dev/metalmental" target="_blank" rel="noopener noreferrer" className="menu">
          Blog
        </a>
      </GridCol>
      <GridCol span={3}><NavLink to="tool" className="menu">Tool</NavLink></GridCol>
      <GridCol span={3}><NavLink to="history" className="menu">History</NavLink></GridCol>
      <GridCol span={3}><NavLink to="github" className="menu">GitHub</NavLink></GridCol>
    </Grid>
  )
}

export default Menu