import { Anchor, List, ListItem, Stack } from "@mantine/core";
import H4 from "../../../components/H4";
import toolStyles from "../Tool.module.css";

const MobileApp = () => {
  return (
    <Stack className="scrollMoveXFadeIn">
      <H4 text="Mobile App" />
      <List className={toolStyles.listMarker} withPadding>
        <ListItem>
          <Anchor
            target="_blank"
            rel="noopener noreferrer"
            href="https://flupinochan.github.io/popcal-document/"
          >
            PopCal
          </Anchor>
        </ListItem>
      </List>
    </Stack>
  );
};

export default MobileApp;
