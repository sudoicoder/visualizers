import { Button, Group, NumberInput, Select, Stack } from "@/styles"
import {
  getAlgorithms,
  getDefaultAlgorithm,
  type Algorithm,
} from "./algorithms"
import { Tiles, getDefaultDimension, useTilesHandle } from "./tiles"

export const PathFindingVisualizer: React.FC = () => {
  const tilesHandle = useTilesHandle()
  return (
    <Stack
      h="100%"
      align="center"
    >
      <Stack>
        <Group position="center">
          <NumberInput
            type="number"
            name="column"
            label="Columns"
            size="xs"
            min={15}
            step={1}
            max={25}
            defaultValue={getDefaultDimension()["columns"]}
            onChange={columns => {
              if (columns !== "") {
                tilesHandle.current?.regenerateTiles({ columns })
              }
            }}
          />
          <NumberInput
            type="number"
            name="column"
            label="Rows"
            size="xs"
            min={10}
            step={1}
            max={30}
            defaultValue={getDefaultDimension()["rows"]}
            onChange={rows => {
              if (rows !== "") {
                tilesHandle.current?.regenerateTiles({ rows })
              }
            }}
          />
          <Select
            name="algorithm"
            label="Algorithm"
            size="xs"
            data={getAlgorithms()}
            defaultValue={getDefaultAlgorithm()}
            onChange={algorithm => {
              if (algorithm !== null) {
                tilesHandle.current?.selectAlgorithm(algorithm as Algorithm)
              }
            }}
          />
        </Group>
        <Group position="center">
          <Button
            size="xs"
            onClick={() => tilesHandle.current?.clearTiles()}
          >
            Clear
          </Button>
          <Button
            size="xs"
            onClick={() => tilesHandle.current?.playAnimation()}
          >
            Play
          </Button>
          <Button
            size="xs"
            onClick={() => tilesHandle.current?.resetAnimation()}
          >
            Stop
          </Button>
        </Group>
      </Stack>
      <Tiles ref={tilesHandle} />
    </Stack>
  )
}
