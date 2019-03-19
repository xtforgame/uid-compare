/* eslint-disable no-underscore-dangle, react/no-this-in-sfc, no-param-reassign */
import { useState } from 'react';
import InputLinker from './Linker';

const ilCreator = (
  host, options = {}, cb = () => undefined
) => () => {
  const {
    Linker = InputLinker,
    ...rest
  } = options;
  const il = new Linker(host, { ...rest, stateMode: 'hook' });
  cb(il);
  return il;
};

export default (host, options, cb) => {
  const [il, setIl] = useState(ilCreator(host, options, cb));

  return [il, (_host = host, _options = options, cb) => {
    const il = ilCreator(_host, _options, cb)();
    setIl(il);
    return il;
  }];
};
