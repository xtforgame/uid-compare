/* eslint-disable no-underscore-dangle, react/no-this-in-sfc, no-param-reassign */
export const toArray = value => (Array.isArray(value) ? value : [value].filter(i => i));
export const ExtraChildren = Symbol('ExtraChildren');

/*
  nonProps (static):
    name
    data
    preset
    presets
    evaluate
    handledByProps
    ignoredFromOutputs
    middlewares
    options
    onChange
    onValidateError
    mergeChildren
    converter
    validate
  nonProps (dynamic):
    component
    shouldRender
  nonProps (undecided):
    defaultValue => initValue
    childLinks
    childElements
*/

const mwDynamicNonProps = [
  'component',
  'shouldRender',
];

export const mwDynamicNonPropsFilter = (nonProps, dist = {}) => {
  mwDynamicNonProps.forEach((key) => {
    if (key in nonProps) {
      dist[key] = nonProps[key];
    }
  });
  return dist;
};
