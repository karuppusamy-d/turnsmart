export type asyncPromiseMapType = <T, U>(
  values: T[],
  callback: (value: T) => PromiseLike<U>
) => Promise<U[]>;

export const asyncPromiseMap: asyncPromiseMapType = (values, callback) => {
  const promises = [];

  for (const value of values) {
    promises.push(callback(value));
  }

  return Promise.all(promises);
};

export default asyncPromiseMap;
