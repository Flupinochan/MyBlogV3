import { Box, Flex, Stack } from "@mantine/core"
import styles from "./SkillSection.module.css"

interface SkillSectionProps {
  svg: React.ReactNode;
  title: string;
  badgesText: string[];
  description: string;
  textColor: string;
  badgeColor: string;
}

const SkillSection: React.FC<SkillSectionProps> = (props) => {
  return (
    <Flex align={"center"} className={styles.sectionBorder} style={{ color: `${props.textColor}`, border: `0.1rem solid ${props.textColor}` }} >
      <Box className={styles.svgPadding}>
        {props.svg}
      </Box>
      <Stack className={styles.stack}>
        <h3>{props.title}</h3>
        <Flex wrap={"wrap"} className={styles.badgeGap}>
          {props.badgesText.map((text, index) => (
            <p key={index} className={styles.badge} style={{ backgroundColor: props.badgeColor }}>
              {text}
            </p>
          ))}
        </Flex>
        <p>{props.description}</p>
      </Stack>
    </Flex>
  )
}

export default SkillSection