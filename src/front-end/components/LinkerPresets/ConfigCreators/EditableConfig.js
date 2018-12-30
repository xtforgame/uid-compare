/* eslint-disable  no-underscore-dangle */
export default class EditableConfig {
  constructor(presets, getDisplayComponent, displayGetExtraConfig, getInputComponent, inputGetExtraConfig) {
    this.editingPropName = 'editing';
    this.presets = presets;
    this._getDisplayComponent = getDisplayComponent || (({ InputComponent }) => InputComponent);
    this._displayGetExtraConfig = displayGetExtraConfig || (p => p);
    this._getInputComponent = getInputComponent || (({ InputComponent }) => InputComponent);
    this._inputGetExtraConfig = inputGetExtraConfig || (p => p);
  }

  getInputComponent = (linkInfo) => {
    const { link, link: { hostProps } } = linkInfo;
    return hostProps[this.editingPropName] ? this._getInputComponent(link) : this._getDisplayComponent(link);
  };

  extraGetPropsWrapper = (props, linkInfo, options) => {
    const { link: { hostProps } } = linkInfo;
    return hostProps[this.editingPropName]
      ? this._inputGetExtraConfig(props, linkInfo, options)
      : this._displayGetExtraConfig(props, linkInfo, options);
  };

  evaluate = props => ({
    ...props,
    getInputComponent: this.getInputComponent,
    extraGetProps: this.extraGetPropsWrapper,
  });
}
