/**
 * Function to generate a random string
 * @param length - length of the string
 * @returns string of random characters of given length
 */
const randomString = (length: number): string =>
  Array(length)
    .fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
    .map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    })
    .join("");

export default randomString;
