import { dijkstra } from "./dijkstra"
import { type PathFinder } from "./utils"

const PATHFINDERS = {
  DIJKSTRA: dijkstra,
} as const satisfies Record<string, PathFinder>

export const getPathFinder = (algorithm: Algorithm) => PATHFINDERS[algorithm]

const ALGORITHMS = Object.keys(PATHFINDERS) as Algorithm[]

export const getAlgorithms = () => ALGORITHMS

export const getDefaultAlgorithm = () => ALGORITHMS[0]

export type Algorithm = keyof typeof PATHFINDERS

export { type Indicated, type Indicator } from "./utils"
