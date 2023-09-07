import { swap, type Sort, type Sorter } from "./utils"

export const selectionSorter: Sorter = function* (array) {
  for (let ki = 0; ki < array.length - 1; ki++) {
    let pi = ki
    for (let ci = ki + 1; ci < array.length; ci++) {
      yield { current: array[ci], pivot: array[pi] }
      if (array[ci] < array[pi]) {
        yield { current: array[ci], pivot: array[pi] }
        pi = ci
      }
      yield { pivot: array[pi] }
    }
    swap(array, ki, pi)
    yield { sorted: array[ki] }
  }
  yield { sorted: array[array.length - 1] }
}

export const selectionSort: Sort = array => {
  for (let ki = 0; ki < array.length - 1; ki++) {
    let pi = ki
    for (let ci = ki + 1; ci < array.length; ci++) {
      if (array[ci] < array[pi]) {
        pi = ci
      }
    }
    swap(array, ki, pi)
  }
  return array
}
