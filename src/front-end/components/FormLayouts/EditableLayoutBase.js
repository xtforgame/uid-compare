import LayoutBase from '~/components/FormLayouts/LayoutBase';

export default class EditableLayout extends LayoutBase {
  static getDerivedStateFromProps(props, prevState) {
    const { editing } = props;
    if (editing !== undefined && editing !== prevState.editing) {
      const nextState = {
        ...prevState,
        editing,
      };
      return prevState.resetInputLinker(props, nextState);
    }
    return null;
  }
}
