import { Image, Space, Stack } from "@mantine/core"
import H4 from "../../../components/H4"
import CustomAnchor from "../../../components/CustomAnchor";

interface ContentSectiontionProps {
  title: string;
  image: string;
  date: string;
  description: string;
  url: string
}

const ContentSection: React.FC<ContentSectiontionProps> = (props) => {
  return (
    <section className="scrollMoveYFadeIn">
      <Space h="sm" />
      <H4 text={props.title} />
      <Space h="xl" />
      <Stack gap={20}>
        <Image src={props.image} alt={props.title + " image"} />
        <p>{props.date}</p>
        <p>{props.description}</p>
        <CustomAnchor href={props.url} text={"Go " + props.title} />
      </Stack>
    </section>
  )
}

export default ContentSection