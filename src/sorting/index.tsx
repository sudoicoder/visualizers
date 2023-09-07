import { Button, Group, NumberInput, Select, Stack } from "@/styles"
import {
  getAlgorithms,
  getDefaultAlgorithm,
  type Algorithm,
} from "./algorithms"
import { Spikes, getDefaultSpikesCount, useSpikesHandle } from "./spikes"

export const SortingVisualizer: React.FC = () => {
  const spikesHandle = useSpikesHandle()
  return (
    <Stack
      h="100%"
      align="center"
      spacing="lg"
    >
      <Stack>
        <Group position="center">
          <NumberInput
            type="number"
            name="count"
            label="Count"
            size="xs"
            min={10}
            step={1}
            max={50}
            defaultValue={getDefaultSpikesCount()}
            onChange={count => {
              if (count !== "") {
                spikesHandle.current?.regenerateSpikes(+count)
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
                spikesHandle.current?.setAlgorithm(algorithm as Algorithm)
              }
            }}
          />
        </Group>
        <Group position="center">
          <Button
            size="xs"
            onClick={() => spikesHandle.current?.regenerateSpikes()}
          >
            Regenerate
          </Button>
          <Button
            size="xs"
            onClick={() => spikesHandle.current?.playAnimation()}
          >
            Play
          </Button>
          <Button
            size="xs"
            onClick={() => spikesHandle.current?.resetAnimation()}
          >
            Stop
          </Button>
        </Group>
      </Stack>
      <Spikes ref={spikesHandle} />
    </Stack>
  )
}
