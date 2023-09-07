import { type Comparable } from "../algorithms"

export const getDefaultSpikesCount = () => 10

export const generateSpikes = (
  count: number = getDefaultSpikesCount()
): Spike[] => {
  const spikes = new Array<Spike>(count)
  for (let id = 0; id < spikes.length; id++) {
    spikes[id] = createSpike(`SPIKE-${id}`, 1 + Math.floor(100 * Math.random()))
  }
  return spikes
}

const createSpike = (id: string, value: number): Spike => ({
  id,
  value,
  valueOf: () => value,
})

export type Spike = Comparable & {
  id: string
  value: number
}
