import { swap } from "@/sorting/algorithms/utils"
import { describe, expect, it } from "vitest"

describe("swap()", () => {
  it("should perform in-place", () => {
    expect(swap([0, 1, 2], 1, 2)).toBeUndefined()
  })
  it("should swap elements in given indices", () => {
    const array = [0, 1, 2]
    swap(array, 1, 2)
    expect(array).toStrictEqual([0, 2, 1])
  })
})
