/* eslint-disable no-underscore-dangle, react/no-this-in-sfc, no-param-reassign */
export default class StateProxy {
  constructor(type, link) {
    this.type = type;
    this.link = link;
    this.linker = this.link.linker;
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

  getValue = () => this.linker.getDataFromSliceByName(this.type, this.link.name);

  setValue = (value, rawArgs) => this.host.setState(prevState => this._getUpdatedState(prevState, this.link.name, value));
}
