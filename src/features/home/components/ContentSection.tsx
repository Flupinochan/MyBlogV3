import { Anchor, Image, Space, Stack } from "@mantine/core"
import styles from "../../../components/Button.module.css";
import H4 from "../../../components/H4"

interface ContentSectiontionProps {
  title: string;
  image: string;
  date: string;
  description: string;
  url: string
}

const ContentSection: React.FC<ContentSectiontionProps> = (props) => {
  return (
    <section>
      <Space h="sm" />
      <H4 text={props.title} />
      <Space h="xl" />
      <Stack gap={20}>
        <Image src={props.image} alt={props.title + " image"} />
        <p>{props.date}</p>
        <p>{props.description}</p>
        <Anchor unstyled className={styles.btn} href={props.url} target="_blank" rel="noopener noreferrer">{"Go " + props.title}</Anchor>
      </Stack>
    </section>
  )
}

export default ContentSection