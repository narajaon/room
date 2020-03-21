/* eslint-disable no-plusplus */
function getRandomSubArray(arr, n) {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  if (n > len)
    throw new RangeError(
      'getRandomSubArray: more elements taken than available'
    );
  // eslint-disable-next-line no-param-reassign
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }

  return result;
}

export default getRandomSubArray;
