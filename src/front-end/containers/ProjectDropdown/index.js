/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { createStructuredSelector } from 'reselect';
import { FormFieldButtonSelect } from 'azrmui/core/FormInputs';
import { useConnect } from 'azrmui/hooks/redux-react-hook-ex';
import { setSelectedProjectId } from '~/containers/App/actions';
import modelMapEx from '~/containers/App/modelMapEx';

import {
  makeDefaultProjectSelector,
  makeSelectedProjectIdSelector,
} from '~/containers/App/selectors';


const useStyles = makeStyles(theme => ({
}));

const mapStateToProps = createStructuredSelector({
  projects: modelMapEx.cacher.selectorCreatorSet.project.selectResourceMapValues(),
  defaultProject: makeDefaultProjectSelector(),
  projectId: makeSelectedProjectIdSelector(),
});

const mapDispatchToProps = {
  setSelectedProjectId,
};

export default (props) => {
  const {
    setSelectedProjectId,
    projects,
    defaultProject,
    projectId: _projectId,
  } = useConnect(mapStateToProps, mapDispatchToProps);
  const classes = useStyles();

  const [projectArray, setProjectArray] = useState([]);

  useEffect(() => {
    const projArray = (projects && Object.values(projects)) || [];
    projArray.sort((a, b) => a.organization_id - b.organization_id);
    setProjectArray(projArray);
    if (_projectId == null && projArray.length) {
      setSelectedProjectId(projArray[0].id);
    }
  }, [projects, _projectId]);

  const projectId = (defaultProject && defaultProject.id) || _projectId;

  const handleMenuItemClick = (event, project, i) => {
    setSelectedProjectId(project.id);
  };

  const getMenuItem = ({
    option,
    // selectedOption,
    // isSelected,
    handleOptionClick,
  }) => (
    <MenuItem
      key={option.id}
      selected={option.id === projectId}
      onClick={handleOptionClick}
    >
      {`${option.organization.name}-${option.name}`}
    </MenuItem>
  );

  return (
    <FormFieldButtonSelect
      id="project-selector"
      value={defaultProject}
      options={projectArray}
      getMenuItem={getMenuItem}
      onChange={handleMenuItemClick}
      toInputValue={project => (project && `${project.organization.name}-${project.name}`) || '<未選取>'}
      toButtonValue={project => `${(project && project.name) || '<未選取>'}`}

      label="專案"
      margin="dense"
      {...props}
    />
  );
};
