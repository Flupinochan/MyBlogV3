import { Anchor, List, ListItem, Stack } from "@mantine/core";
import H4 from "../../../components/H4";
import toolStyles from "../Tool.module.css";

const GoogleExtension = () => {
  return (
    <Stack className="scrollMoveXFadeIn">
      <H4 text="Google Extension" />
      <List className={toolStyles.listMarker} withPadding>
        <ListItem>
          <Anchor target="_blank" rel="noopener noreferrer" href="https://chromewebstore.google.com/detail/sidepanelsyncmemo/adbfnbnnohodpfgdhcanndcbmhknlpoc?authuser=0&hl=ja" >
            SidePanelSyncMemo
          </Anchor>
        </ListItem>
        <ListItem>
          <Anchor target="_blank" rel="noopener noreferrer" href="https://chromewebstore.google.com/detail/autoclipboardcopy/paabklfmeagoimlcpkhkpmpnmbgcdkpf?authuser=0&hl=ja" >
            AutoClipboardCopy
          </Anchor>
        </ListItem>
      </List>
    </Stack>
  )
}

export default GoogleExtension