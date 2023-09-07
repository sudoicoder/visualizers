export type PathFinder = <T extends Positionable>(
  nodes: T[][],
  from: T,
  to: T,
  excluded: Set<T>
) => Generator<Indicated<T>, void>

export type Indicated<T extends Positionable> = Partial<{
  current: T
  visited: T
  shortest: T
}>

export type Indicator =
  | "normal"
  | "obstacle"
  | "initial"
  | "terminal"
  | keyof Indicated<never>

export type Positionable = {
  id: `${number}-${number}`
}
