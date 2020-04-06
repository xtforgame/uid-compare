import React, { useState, useEffect, useRef } from 'react';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { useConnect } from 'azrmui/hooks/redux-react-hook-ex';
import modelMapEx from '~/containers/App/modelMapEx';
import UserPicker from '~/containers/UserCrudUi/UserPicker';
import CrudForm from '~/containers/UserCrudUi/CrudForms/Basic';
import useBasicUserCrudUi from '~/containers/UserCrudUi/hooks/useBasicUserCrudUi';
import {
  makeSelectedOrganizationIdSelector,
} from '~/containers/App/selectors';
import useOrganizationMembers from '~/hooks/useOrganizationMembers';

const {
  user,
} = modelMapEx.querchy.promiseActionCreatorSets;

const mapStateToProps = createStructuredSelector({
  selectedOrganization: makeSelectedOrganizationIdSelector(),
});

const mapDispatchToProps = {};

const useStyles = makeStyles(theme => ({
}));

export default (props) => {
  const classes = useStyles();
  const {
    selectedOrganization,
  } = useConnect(mapStateToProps, mapDispatchToProps);

  const {
    isReady,
    reload,
    // orgMemberQueryName,
    members: orgMembers,
    createUser,
    updateUser,
  } = useOrganizationMembers(selectedOrganization);
  const {
    searchText,
    dialogInputProps,
  } = useBasicUserCrudUi({});

  const [value, setValue] = useState(null);

  const onSubmit = async (value, editingParams, index, done) => {
    const { editingSource } = editingParams;
    if (!editingSource) {
      const { response: { data: newUser } } = await createUser(value);
      setValue(newUser);
      await reload();
      done(newUser);
    } else {
      await updateUser(index, value);
      await reload();
      done();
    }
  };

  return (
    <UserPicker
      users={searchText ? orgMembers.filter(item => (item.name || '').includes(searchText)) : orgMembers}
      isReady={isReady}
      onSubmit={onSubmit}
      value={value}
      onChange={setValue}
      CrudForm={CrudForm}
      {...dialogInputProps}
    />
  );
};
