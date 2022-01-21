export type asyncPromiseMapType = <T, U>(
  values: T[],
  callback: (value: T) => PromiseLike<U>
) => Promise<U[]>;

/**
 * Function to map each value to a promise and run them in parallel
 * @param values[] - array of values to run promises on
 * @param callback - function to run on each value
 * @returns Promise<U[]>
 */
export const asyncPromiseMap: asyncPromiseMapType = (values, callback) => {
  const promises = [];

  for (const value of values) {
    promises.push(callback(value));
  }

  return Promise.all(promises);
};

export default asyncPromiseMap;
