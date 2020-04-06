function promiseReduce(inArray, toPrmiseFunc = defaultToPromiseFunc, startValue) {
  return inArray.reduce(
    (prev, curr, index, array) => prev.then(
      result => toPrmiseFunc(result, curr, index, array)
    ), Promise.resolve(startValue)
  );
}

const capitalizeFirstLetter = str => (str.charAt(0).toUpperCase() + str.slice(1));

module.exports = {
  promiseReduce,
  capitalizeFirstLetter,
};
