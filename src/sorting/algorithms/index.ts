import { bubbleSorter } from "./bubble"
import { insertionSorter } from "./insertion"
import { mergeSorter } from "./merge"
import { quickSorter } from "./quick"
import { selectionSorter } from "./selection"
import { type Sorter } from "./utils"

const SORTERS = {
  SELECTION: selectionSorter,
  BUBBLE: bubbleSorter,
  INSERTION: insertionSorter,
  QUICK: quickSorter,
  MERGE: mergeSorter,
} as const satisfies Record<string, Sorter>

export const getSorter = (algorithm: Algorithm) => SORTERS[algorithm]

const ALGORITHMS = Object.keys(SORTERS) as Algorithm[]

export const getAlgorithms = () => ALGORITHMS

export const getDefaultAlgorithm = () => ALGORITHMS[0]

export type Algorithm = keyof typeof SORTERS

export { type Comparable, type Indicated, type Indicator } from "./utils"
