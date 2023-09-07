import { Box, Group } from "@/styles"
import { type Indicator } from "../algorithms"
import { forwardSpikesHandle, useRegisterSpikesHandle } from "./hooks"
import { useSpikeStyles } from "./styles"
import { type Spike } from "./utils"

export const Spikes = forwardSpikesHandle((_, handleRef) => {
  const [spikes, getIndicator] = useRegisterSpikesHandle(handleRef)
  return (
    <Group
      h="100%"
      spacing="xs"
      align="end"
      py={30}
    >
      {spikes.map(spike => (
        <Spike
          key={spike.id}
          value={spike.value}
          indicator={getIndicator(spike)}
        />
      ))}
    </Group>
  )
})

const Spike: React.FC<{
  value: Spike["value"]
  indicator: Indicator
}> = ({ value, indicator }) => {
  const styles = useSpikeStyles({ indicator })
  return (
    <Box
      component="span"
      className={styles.classes.spike}
      h={`${value}%`}
    />
  )
}
