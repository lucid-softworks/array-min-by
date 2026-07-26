import { describe, expect, expectTypeOf, it, vi } from "vitest";

import { minBy } from "../src/index.js";

describe("minBy", () => {
  it("returns the value with the smallest key", () => {
    const values = [
      { name: "two", rank: 2 },
      { name: "one", rank: 1 },
      { name: "three", rank: 3 },
    ];

    expect(minBy(values, (value) => value.rank)).toBe(values[1]);
  });

  it("keeps the first value when keys tie", () => {
    const values = ["first", "second"];
    expect(minBy(values, () => 1)).toBe("first");
  });

  it("supports string and bigint keys", () => {
    expect(minBy(["b", "a"], (value) => value)).toBe("a");
    expect(minBy([2n, 1n], (value) => value)).toBe(1n);
  });

  it("passes selector context", () => {
    const values = [3, 1, 2] as const;
    const selectKey = vi.fn<
      (value: 1 | 2 | 3, index: number, input: readonly (1 | 2 | 3)[]) => number
    >((value) => value);

    const result = minBy(values, selectKey);

    expect(result).toBe(1);
    expect(selectKey).toHaveBeenNthCalledWith(2, 1, 1, values);
    expectTypeOf(result).toEqualTypeOf<1 | 2 | 3 | undefined>();
  });

  it("returns undefined without invoking the selector for empty input", () => {
    const selectKey = vi.fn<(value: never) => number>();
    expect(minBy([], selectKey)).toBeUndefined();
    expect(selectKey).not.toHaveBeenCalled();
  });
});
