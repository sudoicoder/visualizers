import { swap, type Sort, type Sorter } from "./utils"

export const bubbleSorter: Sorter = function* (array) {
  for (let ki = 0; ki < array.length - 1; ki++) {
    let swapped = false
    let si = array.length - ki - 1
    for (let pi = 0; pi < si; pi++) {
      const ci = pi + 1
      yield { current: array[ci], pivot: array[pi] }
      if (array[ci] < array[pi]) {
        swap(array, ci, pi)
        swapped = true
        yield { current: array[pi], pivot: array[ci] }
      }
      yield {}
    }
    yield { sorted: array[si] }
    if (swapped) {
      continue
    }
    while (--si > 0) {
      yield { sorted: array[si] }
    }
    break
  }
  yield { sorted: array[0] }
}

export const bubbleSort: Sort = array => {
  for (let ki = 0; ki < array.length - 1; ki++) {
    let swapped = false
    const si = array.length - ki - 1
    for (let pi = 0; pi < si; pi++) {
      const ci = pi + 1
      if (array[ci] < array[pi]) {
        swap(array, pi, ci)
        swapped = true
      }
    }
    if (!swapped) {
      break
    }
  }
  return array
}
