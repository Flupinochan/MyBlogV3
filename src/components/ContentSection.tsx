import { Anchor, Image, Stack } from "@mantine/core"
import "./ContentSection.css"

interface ContentSectiontionProps {
  title: string;
  image: string;
  date: string;
  description: string;
  url: string
}

const ContentSection: React.FC<ContentSectiontionProps> = (props) => {
  return (
    <Stack gap={20}>
      <h3>{props.title}</h3>
      <Image src={props.image} alt={props.title + " image"} />
      <p>{props.date}</p>
      <p>{props.description}</p>
      <Anchor unstyled className="btn" href={props.url} target="_blank" rel="noopener noreferrer">{"Go " + props.title}</Anchor>
    </Stack>
  )
}

export default ContentSection