import { Box, Flex, Stack } from "@mantine/core"
import "./SkillSection.css";

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
    <Flex align={"center"} className="section-border" style={{ color: `${props.textColor}`, border: `0.1rem solid ${props.textColor}` }} >
      <Box className="svg-padding">
        {props.svg}
      </Box>
      <Stack className="stack">
        <h3>{props.title}</h3>
        <Flex gap={20} wrap={"wrap"}>
          {props.badgesText.map((text, index) => (
            <p key={index} className="badge" style={{ backgroundColor: props.badgeColor }}>
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