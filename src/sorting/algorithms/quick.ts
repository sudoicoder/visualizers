import { Comparable, Indicated, swap, type Sort, type Sorter } from "./utils"

export const quickSorter: Sorter = function* (array) {
  yield* _quickSorter(array, 0, array.length - 1)
}

const _quickSorter: _Sorter = function* (array, low, high) {
  if (low == high) {
    yield { sorted: array[low] }
  } else if (low < high) {
    yield { pivot: array[high] }
    const pvalue = array[high]
    let spot = low - 1
    for (let ci = low; ci < high; ci++) {
      yield { current: array[ci], pivot: array[high] }
      if (array[ci] < pvalue) {
        ++spot
        yield { current: array[ci], pivot: array[high] }
        swap(array, spot, ci)
        yield { current: array[spot], pivot: array[high] }
      }
    }
    ++spot
    yield { pivot: array[high] }
    swap(array, spot, high)
    yield { pivot: array[spot] }
    yield { sorted: array[spot] }
    yield* _quickSorter(array, low, spot - 1)
    yield* _quickSorter(array, spot + 1, high)
  }
}

export const quickSort: Sort = array => {
  _quickSort(array, 0, array.length - 1)
  return array
}

const _quickSort: _Sort = (array, low, high) => {
  if (low >= high) {
    return
  }
  const p = array[high]
  let k = low - 1
  for (let i = low; i <= high; i++) {
    if (array[i] < p) {
      swap(array, ++k, i)
    }
  }
  swap(array, ++k, high)
  _quickSort(array, low, k - 1)
  _quickSort(array, k + 1, high)
}

type _Sorter = {
  <T extends Comparable>(array: T[], low: number, high: number): Generator<
    Indicated<T>,
    void
  >
}
type _Sort = {
  <T extends Comparable>(array: T[], low: number, high: number): void
}
