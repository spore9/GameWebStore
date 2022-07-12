type AsString<T> = T extends string ? T : never;
type Mirror<T extends Record<string, null>, N extends string | undefined> = N extends undefined
  ? { [K in keyof T]: K }
  : { [K in keyof T]: `@${N}/${AsString<K>}` };

export const keyMirror = <T extends Record<string, null>, N extends string | undefined = undefined>(
  keys: T,
  namespace?: N,
) => {
  const mirror = {};

  Object.keys(keys).forEach((key) => {
    mirror[key] = namespace ? `@${namespace}/${key}` : key;
  });

  return mirror as Mirror<T, N>;
};

