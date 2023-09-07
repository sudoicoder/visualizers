import { Box, Group, Stack, Text } from "@/styles"
import { type Indicator } from "../algorithms"
import { forwardTilesHandle, useRegisteredTilesHandle } from "./hooks"
import { useTileStyles } from "./styles"

export const Tiles = forwardTilesHandle((_, handle) => {
  const [tiles, grabbing, getIndicator, clickOnTile] =
    useRegisteredTilesHandle(handle)
  return (
    <Stack
      h="100%"
      justify="center"
      spacing={5}
      py={30}
    >
      <Text
        c="dimmed"
        ta="center"
        size="sm"
        pb={20}
      >
        Click on a GREY / BLACK square to block / unblock it.
        <br />
        Click on YELLOW / GREEN square to move it
      </Text>
      {tiles.map(row => (
        <Group
          key={row.map(c => c.id).join("-")}
          spacing={5}
        >
          {row.map(tile => (
            <Tile
              key={tile.id}
              indicator={getIndicator(tile)}
              onClick={() => clickOnTile(tile)}
              grabbing={grabbing}
            />
          ))}
        </Group>
      ))}
    </Stack>
  )
})

const Tile: React.FC<{
  indicator: Indicator
  grabbing: boolean
  onClick: () => void
}> = ({ indicator, grabbing, onClick }) => {
  const styles = useTileStyles({ indicator, grabbing })
  return (
    <Box
      component="span"
      className={styles.classes.tile}
      onClick={onClick}
    />
  )
}
