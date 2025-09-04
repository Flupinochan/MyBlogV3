import { Anchor, List, ListItem, Stack } from "@mantine/core";
import H4 from "../../../components/H4";
import toolStyles from "../../tool/Tool.module.css";

const Other = () => {
  return (
    <Stack className="scrollMoveXFadeIn">
      <H4 text="Other" />
      <List className={toolStyles.listMarker} withPadding>
        <ListItem>
          <Anchor
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.credly.com/users/tetsuro-kawagoe/badges#credly"
          >
            Credly
          </Anchor>
        </ListItem>
      </List>
    </Stack>
  );
};

export default Other;
