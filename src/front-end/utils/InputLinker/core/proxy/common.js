export const proxyTypeArray = [
  {
    name: 'value',
    defaultSliceName: 'fields',
  },
  {
    name: 'error',
    defaultSliceName: 'errors',
  },
  {
    name: 'customState',
  },
];

export const proxyTypes = {};
export const proxyTypeMap = {};

proxyTypeArray.forEach((t) => {
  proxyTypes[t.name] = t.name;
  proxyTypeMap[t.name] = t;
});
