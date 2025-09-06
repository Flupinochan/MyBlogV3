import { Anchor, List, ListItem, Stack } from "@mantine/core";
import H4 from "../../../components/H4";
import toolStyles from "../Tool.module.css";

const VscodeExtention = () => {
  return (
    <Stack className="scrollMoveXFadeIn">
      <H4 text="VSCode Extention" />
      <List className={toolStyles.listMarker} withPadding>
        <ListItem>
          <Anchor
            target="_blank"
            rel="noopener noreferrer"
            href="https://marketplace.visualstudio.com/items?itemName=metalmental.review-on-save"
          >
            Review On Save
          </Anchor>
        </ListItem>
      </List>
    </Stack>
  );
};

export default VscodeExtention;
