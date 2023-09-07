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
  getPathFinder,
  type Algorithm,
  type Indicated,
  type Indicator,
} from "../algorithms"
import {
  generateTiles,
  getDefaultFromTile,
  getDefaultToTile,
  type Dimension,
  type Tile,
} from "./utils"

export const forwardTilesHandle = forwardRef<TilesHandle>

export const useTilesHandle = () => useRef<TilesHandle>(null)

export const useRegisteredTilesHandle = (handle: React.Ref<TilesHandle>) => {
  const [tiles, setTiles] = useState(generateTiles)
  const [fromTile, setFromTile] = useState(getDefaultFromTile(tiles))
  const [toTile, setToTile] = useState(getDefaultToTile(tiles))
  const [grabbed, setGrabbed] = useState<Nullish<Tile>>(null)

  useEffect(() => {
    setFromTile(getDefaultFromTile(tiles))
    setToTile(getDefaultToTile(tiles))
  }, [tiles])

  const walls = useRef(new Set<Tile>())
  const algorithm = useRef(getDefaultAlgorithm())

  const [getIndicator, playAnimation, resetAnimation] = useAnimation(
    tiles,
    fromTile,
    toTile,
    walls,
    algorithm
  )

  const clickOnTile = useCallback(
    (tile: Tile) => {
      if (grabbed === fromTile) {
        setFromTile(tile)
        setGrabbed(null)
        return
      }
      if (grabbed === toTile) {
        setToTile(tile)
        setGrabbed(null)
        return
      }
      if (tile === fromTile || tile === toTile) {
        setGrabbed(tile)
        return
      }
      if (walls.current.has(tile)) {
        walls.current.delete(tile)
      } else {
        walls.current.add(tile)
      }
      resetAnimation()
    },
    [fromTile, toTile, resetAnimation, grabbed, setGrabbed]
  )

  const regenerateTiles: TilesHandle["regenerateTiles"] = useCallback(
    ({ columns, rows }) =>
      setTiles(t =>
        generateTiles({
          columns: columns ?? t[0].length,
          rows: rows ?? t.length,
        })
      ),
    []
  )
  const selectAlgorithm: TilesHandle["selectAlgorithm"] = useCallback(
    value => (algorithm.current = value),
    []
  )
  const clearTiles: TilesHandle["clearTiles"] = useCallback(() => {
    walls.current.clear()
    resetAnimation()
  }, [resetAnimation])

  useImperativeHandle(
    handle,
    () => ({
      regenerateTiles,
      selectAlgorithm,
      clearTiles,
      playAnimation,
      resetAnimation,
    }),
    [
      regenerateTiles,
      selectAlgorithm,
      clearTiles,
      playAnimation,
      resetAnimation,
    ]
  )

  return [tiles, grabbed !== null, getIndicator, clickOnTile] as const
}

const useAnimation = (
  tiles: Tile[][],
  from: Tile,
  to: Tile,
  walls: React.MutableRefObject<Set<Tile>>,
  algorithm: React.MutableRefObject<Algorithm>
) => {
  const [indicated, setIndicated] = useState<Indicated<Tile>>({})

  const animation = useRef<NodeJS.Timeout | null>(null)
  const visited = useRef(new Set<Tile>())
  const shortest = useRef(new Set<Tile>())

  const getIndicator = useCallback(
    (tile: Tile): Indicator =>
      walls.current.has(tile)
        ? "obstacle"
        : tile === from
        ? "initial"
        : tile === to
        ? "terminal"
        : shortest.current.has(tile)
        ? "shortest"
        : visited.current.has(tile)
        ? "visited"
        : tile === indicated.current
        ? "current"
        : "normal",
    [indicated, walls, from, to]
  )
  const resetAnimation: TilesHandle["resetAnimation"] = useCallback(() => {
    if (animation.current !== null) {
      clearInterval(animation.current)
      animation.current = null
    }
    visited.current.clear()
    shortest.current.clear()
    setIndicated({})
  }, [])
  const playAnimation: TilesHandle["playAnimation"] = useCallback(() => {
    const pathfinder = getPathFinder(algorithm.current)
    const steps = pathfinder(tiles, from, to, walls.current)
    const interval = setInterval(() => {
      const step = steps.next()
      if (step.done) {
        clearInterval(interval)
        animation.current = null
        return
      }
      setIndicated(step.value)
      if (step.value.visited !== undefined) {
        visited.current.add(step.value.visited)
        return
      }
      if (step.value.shortest !== undefined) {
        shortest.current.add(step.value.shortest)
        return
      }
    }, 100)
    animation.current = interval
  }, [tiles, walls, from, to, algorithm])

  useEffect(resetAnimation, [tiles, from, to, resetAnimation])

  return [getIndicator, playAnimation, resetAnimation] as const
}

type TilesHandle = {
  regenerateTiles: (dimension: Partial<Dimension>) => void
  selectAlgorithm: (algorithm: Algorithm) => void
  clearTiles: () => void
  playAnimation: () => void
  resetAnimation: () => void
}
