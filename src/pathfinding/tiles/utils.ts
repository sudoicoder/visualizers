import { Positionable } from "../algorithms/utils"

const DEFAULT_DIMENSION: Dimension = {
  columns: 15,
  rows: 10,
}

export const getDefaultDimension = () => DEFAULT_DIMENSION

export const generateTiles = (dimension: Dimension = DEFAULT_DIMENSION) => {
  const tiles = new Array<Tile[]>(dimension.rows)
  for (let row = 0; row < tiles.length; row++) {
    tiles[row] = new Array<Tile>(dimension.columns)
    for (let col = 0; col < tiles[row].length; col++) {
      tiles[row][col] = createTile(`${row}-${col}`)
    }
  }
  return tiles
}

export const createTile = (id: Tile["id"]) => ({ id })

export const getDefaultFromTile = (tiles: Tile[][]) => tiles[0][0]

export const getDefaultToTile = (tiles: Tile[][]) => {
  const row = tiles.length - 1
  const col = tiles[row].length - 1
  return tiles[row][col]
}

export type Tile = Positionable

export type Dimension = {
  columns: number
  rows: number
}
