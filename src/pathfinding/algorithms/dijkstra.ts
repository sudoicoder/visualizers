import { Positionable, type PathFinder } from "./utils"

export const dijkstra: PathFinder = function* (nodes, from, to, excluded) {
  const visited = new Set<typeof from>()
  const unvisited = nodes.flat()
  const distances = createDistances(unvisited)
  const previouses = createPreviouses(unvisited)
  distances[from.id] = 0
  while (unvisited.length > 0) {
    const closest = getClosest(unvisited, distances)
    yield { current: closest }
    if (excluded.has(closest)) {
      continue
    }
    if (distances[closest.id] === Infinity) {
      break
    }
    visited.add(closest)
    yield { visited: closest }
    if (closest === to) {
      break
    }
    const neighbors = getNeighbors(closest, nodes)
    const possible = neighbors.filter(n => !visited.has(n))
    for (const node of possible) {
      distances[node.id] = distances[closest.id] + 1
      previouses[node.id] = closest
    }
  }
  const path: (typeof to)[] = []
  let node: (typeof previouses)[string] = to
  while (node !== null) {
    path.push(node)
    node = previouses[node.id]
  }
  while (path.length > 0) {
    yield { shortest: path.pop()! }
  }
}

const getNeighbors = <T extends Positionable>(node: T, nodes: T[][]) => {
  const neighbors = new Array<T>(4)
  const [row, col] = node.id.split("-").map(v => +v)
  if (row > 0) {
    neighbors.push(nodes[row - 1][col])
  }
  if (row < nodes.length - 1) {
    neighbors.push(nodes[row + 1][col])
  }
  if (col > 0) {
    neighbors.push(nodes[row][col - 1])
  }
  if (col < nodes[row].length - 1) {
    neighbors.push(nodes[row][col + 1])
  }
  return neighbors
}

const getClosest = <T extends Positionable>(
  nodes: T[],
  distances: Record<string, number>
) => {
  // let l = 0
  // for (let i = 1; i < nodes.length; i++) {
  //   if (distances[nodes[i].id] < distances[nodes[l].id]) {
  //     l = i
  //   }
  // }
  nodes.sort((a, b) => distances[a.id] - distances[b.id])
  return nodes.shift()!
}

const createPreviouses = <T extends Positionable>(unvisited: T[]) => {
  const previouses: Record<string, Nullish<T>> = {}
  for (const node of unvisited) {
    previouses[node.id] = null
  }
  return previouses
}

const createDistances = <T extends Positionable>(unvisited: T[]) => {
  const distances: Record<string, number> = {}
  for (const node of unvisited) {
    distances[node.id] = Infinity
  }
  return distances
}
