export type MinimumKey = string | number | bigint;

export type MinimumKeySelector<TValue, TKey extends MinimumKey> = (
  value: TValue,
  index: number,
  values: readonly TValue[],
) => TKey;

/**
 * Returns the first value with the smallest derived key.
 */
export function minBy<TValue, TKey extends MinimumKey>(
  values: readonly TValue[],
  selectKey: MinimumKeySelector<TValue, TKey>,
): TValue | undefined {
  if (values.length === 0) {
    return undefined;
  }

  let selected = values[0] as TValue;
  let selectedKey = selectKey(selected, 0, values);

  for (let index = 1; index < values.length; index += 1) {
    const value = values[index] as TValue;
    const key = selectKey(value, index, values);
    if (key < selectedKey) {
      selected = value;
      selectedKey = key;
    }
  }

  return selected;
}
