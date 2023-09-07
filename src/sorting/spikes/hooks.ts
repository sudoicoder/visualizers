import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import {
  getDefaultAlgorithm,
  getSorter,
  type Algorithm,
  type Indicated,
  type Indicator,
} from "../algorithms"
import { generateSpikes, type Spike } from "./utils"

export const useSpikesHandle = () => useRef<SpikesHandle>(null)

export const useRegisterSpikesHandle = (handleRef: React.Ref<SpikesHandle>) => {
  const [spikes, setSpikes] = useState(generateSpikes)

  const algorithm = useRef(getDefaultAlgorithm())

  const [getIndicator, playAnimation, resetAnimation] = useSpikesAnimation(
    spikes,
    algorithm
  )

  const setAlgorithm: SpikesHandle["setAlgorithm"] = useCallback(
    value => (algorithm.current = value),
    []
  )

  const regenerateSpikes: SpikesHandle["regenerateSpikes"] = useCallback(
    count => setSpikes(s => generateSpikes(count ?? s.length)),
    []
  )

  useImperativeHandle(
    handleRef,
    () => ({
      regenerateSpikes,
      setAlgorithm,
      playAnimation,
      resetAnimation,
    }),
    [regenerateSpikes, setAlgorithm, playAnimation, resetAnimation]
  )

  return [spikes, getIndicator] as const
}

export const useSpikesAnimation = (
  spikes: Spike[],
  algorithm: React.MutableRefObject<Algorithm>
) => {
  const [indicated, setIndicated] = useState<Indicated<Spike>>({})

  const animation = useRef<NodeJS.Timeout | null>(null)
  const sorted = useRef(new Set<Spike>())

  const getIndicator = useCallback(
    (spike: Spike): Indicator =>
      sorted.current.has(spike)
        ? "sorted"
        : spike === indicated.pivot
        ? "pivot"
        : spike === indicated.current
        ? "current"
        : "normal",
    [indicated]
  )

  const resetAnimation = useCallback(() => {
    if (animation.current !== null) {
      clearInterval(animation.current)
    }
    animation.current = null
    sorted.current.clear()
    setIndicated({})
  }, [])

  const playAnimation = useCallback(() => {
    if (animation.current !== null) {
      return
    }
    const sorter = getSorter(algorithm.current)
    const steps = sorter(spikes)
    const interval = setInterval(() => {
      const step = steps.next()
      if (step.done) {
        clearInterval(interval)
        animation.current = null
        return
      }
      setIndicated(step.value)
      if (step.value.sorted !== undefined) {
        sorted.current.add(step.value.sorted)
      }
    }, Math.floor(300))
    animation.current = interval
  }, [algorithm, spikes])

  useEffect(resetAnimation, [spikes, algorithm, resetAnimation])

  return [getIndicator, playAnimation, resetAnimation] as const
}

export const forwardSpikesHandle = forwardRef<SpikesHandle>

type SpikesHandle = {
  setAlgorithm: (algorithm: Algorithm) => void
  regenerateSpikes: (count?: number) => void
  playAnimation: () => void
  resetAnimation: () => void
}
