import { Grid, GridCol } from "@mantine/core";
import "./H2.css";

interface H2Props {
  text: string;
}

const H2: React.FC<H2Props> = ({ text }) => {
  return (
    <Grid gutter={0} justify="center">
      <GridCol span="content" style={{ alignContent: "center" }}><div className="h2-left" /></GridCol>
      <GridCol span="content" className="h2-custom"><h2>{text}</h2></GridCol>
      <GridCol span="auto"><div className="h2-right" /></GridCol>
    </Grid>
  )
}

export default H2