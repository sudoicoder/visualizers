import { selectionSort } from "@/sorting/algorithms/selection"
import { describe, expect, it } from "vitest"

describe("selectionSort()", () => {
  it("should return the same array", () => {
    const original = [0, 1, 8, 29, 65]
    const actual = selectionSort(original)
    expect(actual).toBe(original)
  })
  it("should sort the array in ascending order", () => {
    const actual = selectionSort([0, 1, 8, 29, 65])
    expect(actual).toStrictEqual([0, 1, 8, 29, 65])
  })
  it("should sort the array in ascending order", () => {
    const actual = selectionSort([1, 65, 8, 29, 0])
    expect(actual).toStrictEqual([0, 1, 8, 29, 65])
  })
})
