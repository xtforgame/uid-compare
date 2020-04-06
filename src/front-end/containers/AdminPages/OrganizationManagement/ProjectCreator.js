import React, { useState, useEffect, useRef } from 'react';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useConnect } from 'azrmui/hooks/redux-react-hook-ex';
import FormDialogInput from 'azrmui/core/FormInputs/FormDialogInput';
import modelMapEx from '~/containers/App/modelMapEx';
import {
  makeSelectedOrganizationIdSelector,
  makeSelectedProjectSelector,
} from '~/containers/App/selectors';

const {
  // user,
  // userSetting,
  // organization,
  project,
} = modelMapEx.querchy.promiseActionCreatorSets;

const mapStateToProps = createStructuredSelector({
  selectedOrganization: makeSelectedOrganizationIdSelector(),
  selectedProject: makeSelectedProjectSelector(),
});

const mapDispatchToProps = {};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default (props) => {
  const {
    dialogProps,
  } = props;

  const classes = useStyles();
  const {
    selectedOrganization,
  } = useConnect(mapStateToProps, mapDispatchToProps);

  const createProject = (projectName) => {
    if (typeof projectName == 'string' && projectName) {
      project.create({
        organizationId: selectedOrganization.id,
        projectName,
      })
      .then(() => project.getCollection());
    }
  };
  return (
    <FormDialogInput
      title="新增專案"
      label="DateRange"
      value={""}
      displayValue={() => 'XX'}
      renderButton={({ buttonProps }) => (
        <Button
          {...buttonProps}
          variant="contained"
          color="secondary"
          disabled={!selectedOrganization}
        >
          新增專案
        </Button>
      )}
      onChange={createProject}
      // buttonProps={{
      //   fullWidth: true,
      // }}
      dialogProps={dialogProps}
    />
  );
};
