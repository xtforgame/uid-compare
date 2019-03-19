/* eslint-disable no-underscore-dangle, react/no-this-in-sfc, no-param-reassign */
export default class StateProxy {
  constructor(type, link) {
    this.type = type;
    this.link = link;
    this.linker = this.link.linker;

    this.setter = () => {};
  }

  get host() {
    return this.linker.host;
  }

  _getUpdatedState = (prevState, fieldName, value) => ({
    [this.linker.sliceNameInState[this.type]]: {
      ...this.linker.getDataFromSlice(this.type, prevState),
      [fieldName]: value,
    },
  });

  updateSetter = setter => (this.setter = setter);

  getValue = () => this.linker.getDataFromSliceByName(this.type, this.link.name);

  setValue = (value, rawArgs) => this.setter(value);
}
