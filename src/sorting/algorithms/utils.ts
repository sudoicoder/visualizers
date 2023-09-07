export const swap = <T>(array: T[], i: number, j: number) => {
  const temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

export type Sort = {
  <T extends Comparable>(array: T[]): T[]
}

export type Sorter = {
  <T extends Comparable>(array: T[]): Generator<Indicated<T>, void>
}

export type Indicated<T extends Comparable> = Partial<{
  pivot: T
  current: T
  sorted: T
}>

export type Indicator = "normal" | keyof Indicated<Comparable>

export type Comparable = {
  valueOf(): number
}
