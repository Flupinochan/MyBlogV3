import { Anchor, List, ListItem, Stack } from "@mantine/core";
import H4 from "../../../components/H4";
import toolStyles from "../Tool.module.css";

const WindowsApp = () => {
  return (
    <Stack className="scrollMoveXFadeIn">
      <H4 text="Windows App" />
      <List className={toolStyles.listMarker} withPadding>
        <ListItem>
          <Anchor
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.microsoft.com/store/apps/9NW60Q3D6FMH"
          >
            FrameResizer
          </Anchor>
        </ListItem>
      </List>
    </Stack>
  );
};

export default WindowsApp;
