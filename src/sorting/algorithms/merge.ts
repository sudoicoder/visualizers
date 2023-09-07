import type { Comparable, Indicated, Sort, Sorter } from "./utils"

export const mergeSorter: Sorter = function* (array) {
  yield* _mergeSorter(array, 0, array.length - 1)
  for (let k = 0; k < array.length; k++) {
    yield { sorted: array[k] }
  }
}

const _mergeSorter: _Sorter = function* (array, left, right) {
  if (left > right) {
    return
  }
  if (left == right) {
    return
  }
  let middle = left + Math.floor((right - left) / 2)
  yield* _mergeSorter(array, left, middle)
  yield* _mergeSorter(array, middle + 1, right)
  let l = left
  let r = middle + 1
  while (l <= middle && r <= right) {
    const p = array[r]
    yield { pivot: array[r], current: array[l] }
    if (array[l] > p) {
      for (let i = r; i > l; i--) {
        array[i] = array[i - 1]
      }
      array[l] = p
      ++r
      ++middle
      yield { pivot: p }
    }
    ++l
  }
}

export const mergeSort: Sort = array => {
  _sort(array, 0, array.length - 1, new Array(array.length))
  return array
}

const _sort: _Sort = (array, left, right, aux) => {
  if (left >= right) {
    return
  }
  const middle = left + Math.floor((right - left) / 2)
  _sort(array, left, middle, aux)
  _sort(array, middle + 1, right, aux)
  let k = left
  while (k <= right) {
    aux[k] = array[k++]
  }
  let l = (k = left)
  let r = middle + 1
  while (l <= middle && r <= right) {
    if (aux[l] <= aux[r]) {
      array[k++] = aux[l++]
    } else {
      array[k++] = aux[r++]
    }
  }
  while (l <= middle) {
    array[k++] = aux[l++]
  }
  while (r <= right) {
    array[k++] = aux[r++]
  }
}

type _Sorter = {
  <T extends Comparable>(array: T[], left: number, right: number): Generator<
    Indicated<T>,
    void
  >
}

type _Sort = {
  <T extends Comparable>(
    array: T[],
    left: number,
    right: number,
    aux: T[]
  ): void
}
