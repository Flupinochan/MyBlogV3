import { Grid, GridCol, Stack } from "@mantine/core";
import H2 from "../../components/H2";
import ContentSection from "../../components/ContentSection";
import blogImage from "../../assets/blog_img.jpg";
import youtubeImage from "../../assets/youtube_img.jpg";
import contentStyles from "./Content.module.css";
import skillStyles from "./Skills.module.css";

const Content = () => {
  return (
    <Stack className={skillStyles.section}>
      <H2 text="Content" />
      <Grid>
        <GridCol span={{ base: 12, sm: 6 }} className={contentStyles.gridSpace}>
          <ContentSection
            title="Blog"
            date="2024-01-28"
            description="AWS SAMを使用したCI/CDの解説"
            image={blogImage}
            url="https://zenn.dev/metalmental" />
        </GridCol>
        <GridCol span={{ base: 12, sm: 6 }} className={contentStyles.gridSpace2}>
          <ContentSection
            title="Youtube"
            date="2023-11-01"
            description="ECS Blue/Green Deploymentのゆっくり実況"
            image={youtubeImage}
            url="https://www.youtube.com/@Flupinochan" />
        </GridCol>
      </Grid>
    </Stack>
  )
}

export default Content