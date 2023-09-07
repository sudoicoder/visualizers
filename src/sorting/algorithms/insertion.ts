import { swap, type Sort, type Sorter } from "./utils"

export const insertionSorter: Sorter = function* (array) {
  yield { sorted: array[0] }
  for (let pi = 1; pi < array.length; pi++) {
    const p = array[pi]
    yield { pivot: array[pi] }
    let ci = pi - 1
    while (ci >= 0 && array[ci] > p) {
      swap(array, ci + 1, ci--)
      yield { pivot: p }
    }
    yield { sorted: p }
  }
}

export const insertionSort: Sort = array => {
  for (let pi = 1; pi < array.length; pi++) {
    const p = array[pi]
    let ci = pi - 1
    while (ci >= 0 && array[ci] > p) {
      array[ci + 1] = array[ci--]
    }
    array[ci + 1] = p
  }
  return array
}
