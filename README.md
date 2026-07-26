# `@lucid-softworks/array-min-by`

Return the first array value with the smallest derived key.

```ts
import { minBy } from "@lucid-softworks/array-min-by";

minBy(users, (user) => user.score);
```

Keys may be strings, numbers, or bigints. Ties keep the first value. Empty
inputs return `undefined` without evaluating the selector.
