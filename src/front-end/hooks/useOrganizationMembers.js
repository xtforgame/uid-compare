import { useState, useEffect, useRef } from 'react';
import { createStructuredSelector } from 'reselect';
import { useConnect } from 'azrmui/hooks/redux-react-hook-ex';
import modelMapEx from '~/containers/App/modelMapEx';

const {
  user,
} = modelMapEx.querchy.promiseActionCreatorSets;

const mapStateToProps = createStructuredSelector({
  userQueryMap: modelMapEx.cacher.selectorCreatorSet.user.selectQueryMap(),
});

const mapDispatchToProps = {};

export default (selectedOrganization, options = {}) => {
  const {
    userQueryMap,
  } = useConnect(mapStateToProps, mapDispatchToProps);

  const {
    metadata,
    values,
  } = userQueryMap;

  const orgMemberQueryName = selectedOrganization && `./api/organizations/${selectedOrganization.id}/members`;
  const orgMemberMetadata = metadata[orgMemberQueryName] || {};

  const [reqTime, setReqTime] = useState(0);
  const [, forceUpdate] = useState({});
  const loaded = useRef(0);

  const reload = async () => {
    setReqTime(new Date().getTime());
    return user.getCollection({ queryId: orgMemberQueryName, actionProps: { url: orgMemberQueryName } });
  };

  useEffect(() => {
    loaded.current = false;
    if (!selectedOrganization) {
      return;
    }
    reload().then(() => {
      loaded.current = true;
      forceUpdate({});
    });
  }, [selectedOrganization]);

  const isReady = selectedOrganization
    && reqTime
    && orgMemberMetadata
    && orgMemberMetadata.requestTimestamp >= reqTime
    && loaded.current;

  const members = values[orgMemberQueryName] || [];

  return {
    reqTime,
    reload,
    userQueryMap,
    isReady,
    members,
    orgMemberQueryName,
    orgMemberMetadata,
    loaded: loaded.current,

    createUser: value => user.create(value, { queryId: orgMemberQueryName, actionProps: { url: orgMemberQueryName } }),
    updateUser: (id, value) => user.update(id, value, { queryId: orgMemberQueryName, actionProps: { url: `${orgMemberQueryName}/${id}` } }),
  };
};
