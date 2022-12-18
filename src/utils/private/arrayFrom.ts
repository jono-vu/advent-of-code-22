function arrayFrom<TData>(length: number, mapFn?: (i: number) => TData) {
  if (mapFn) {
    return [...Array(length).map(mapFn)];
  }

  return [...Array(length).keys()];
}

export { arrayFrom };
