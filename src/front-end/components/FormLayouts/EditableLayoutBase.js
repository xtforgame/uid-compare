import LayoutBase from '~/components/FormLayouts/LayoutBase';

export default class EditableLayout extends LayoutBase {
  static getDerivedStateFromProps(props, prevState) {
    const { isEditing } = props;
    if (!!isEditing !== !!prevState.isEditing) {
      const nextState = {
        ...prevState,
        isEditing,
      };
      return prevState.resetInputLinker(props, nextState);
    }
    return null;
  }
}
