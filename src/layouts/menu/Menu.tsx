import { Anchor, Grid, GridCol, rem } from "@mantine/core"
import { NavLink } from "react-router-dom";
import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <nav>
      <Grid pt={rem(14)} gutter={rem(4)} grow>
        <GridCol span={3}>
          <Anchor unstyled href="https://zenn.dev/metalmental" target="_blank" rel="noopener noreferrer" className={styles.menu}>
            Blog
          </Anchor>
        </GridCol>
        <GridCol span={3}>
          <NavLink to="tool" className={({ isActive }) => `${styles.menu} ${isActive ? styles.active : ""}`.trim()}>
            Tool
          </NavLink>
        </GridCol>
        <GridCol span={3}>
          <NavLink to="history" className={({ isActive }) => `${styles.menu} ${isActive ? styles.active : ""}`.trim()}>
            History
          </NavLink>
        </GridCol>
        <GridCol span={3}>
          <Anchor unstyled href="https://github.com/Flupinochan/" target="_blank" rel="noopener noreferrer" className={styles.menu}>
            GitHub
          </Anchor>
        </GridCol>
      </Grid>
    </nav>
  )
}

export default Menu