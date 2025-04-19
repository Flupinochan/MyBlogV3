import { Anchor, List, ListItem, Stack } from "@mantine/core"
import H4 from "../../../../components/H4"
import { NavLink } from "react-router-dom"
import toolStyles from "../../Tool.module.css"

const Api = () => {
  return (
    <Stack className="scrollMoveXFadeIn">
      <H4 text="API" />
      <List className={toolStyles.listMarker} withPadding>
        <ListItem>
          <Anchor component={NavLink} to="swagger-ui">MyBlogV3</Anchor>
        </ListItem>
      </List>
    </Stack>
  )
}

export default Api