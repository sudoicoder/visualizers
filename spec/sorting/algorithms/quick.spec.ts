import { quickSort } from "@/sorting/algorithms/quick"
import { describe, expect, it } from "vitest"

describe("quickSort()", () => {
  it("should return the same array", () => {
    const original = [0, 1, 8, 29, 65]
    const actual = quickSort(original)
    expect(actual).toBe(original)
  })
  it("should sort the array in ascending order", () => {
    const actual = quickSort([0, 1, 8, 29, 65])
    expect(actual).toStrictEqual([0, 1, 8, 29, 65])
  })
  it("should sort the array in ascending order", () => {
    const actual = quickSort([1, 65, 8, 29, 0])
    expect(actual).toStrictEqual([0, 1, 8, 29, 65])
  })
})
