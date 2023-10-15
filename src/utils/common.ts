export const serializeError = error => {
  const serialized = Object.getOwnPropertyNames(error).reduce((res, key) => {
    res[key] = error[key];
    return res;
  }, {});
  return serialized;
};
