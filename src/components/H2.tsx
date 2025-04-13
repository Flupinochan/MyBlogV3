import { Grid, GridCol } from "@mantine/core";
import styles from "./H2.module.css";

interface H2Props {
  text: string;
}

const H2: React.FC<H2Props> = ({ text }) => {
  return (
    <Grid gutter={0} justify="center">
      <GridCol span="content" style={{ alignContent: "center" }}><div className={styles.h2Left} /></GridCol>
      <GridCol span="content" className={styles.h2Center}><h2>{text}</h2></GridCol>
      <GridCol span="auto"><div className={styles.h2Right} /></GridCol>
    </Grid>
  )
}

export default H2