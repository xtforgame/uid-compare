import { createStructuredSelector } from 'reselect';
import { useConnect } from '~/hooks/redux-react-hook-ex';
import modelMapEx from '~/containers/App/modelMapEx';

const mapStateToProps = createStructuredSelector({
  systemInfo: modelMapEx.cacher.selectorCreatorSet.systemInfo.selectSystemInfo(),
});

const mapDispatchToProps = {};

export default () => {
  const { systemInfo } = useConnect(mapStateToProps, mapDispatchToProps);

  return systemInfo;
};
