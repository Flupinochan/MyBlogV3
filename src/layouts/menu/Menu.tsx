import { Anchor, Grid, GridCol, rem } from "@mantine/core"
import "./Menu.css";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <nav>
      <Grid pt={rem(14)} gutter={rem(4)} grow>
        <GridCol span={3}>
          <Anchor unstyled href="https://zenn.dev/metalmental" target="_blank" rel="noopener noreferrer" className="menu">
            Blog
          </Anchor>
        </GridCol>
        <GridCol span={3}><NavLink to="tool" className="menu">Tool</NavLink></GridCol>
        <GridCol span={3}><NavLink to="history" className="menu">History</NavLink></GridCol>
        <GridCol span={3}>
          <Anchor unstyled href="https://github.com/Flupinochan/" target="_blank" rel="noopener noreferrer" className="menu">
            GitHub
          </Anchor>
        </GridCol>
      </Grid>
    </nav>
  )
}

export default Menu